import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaBell, FaShieldAlt, FaMapMarkerAlt, FaVideo } from 'react-icons/fa';
import Modal from './Modal';
import { useAuth } from '../context/AuthContext';
import { createAlert } from '../services/api';

const AlertModal = ({ isOpen, onClose, onAlertCreated }) => {
    const { user } = useAuth();
    const [riskLevel, setRiskLevel] = useState('risk'); // 'risk' (low), 'risky' (medium), 'high risk' (high)
    const [includeLocation, setIncludeLocation] = useState(true);
    const [recordEvidence, setRecordEvidence] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const [coords, setCoords] = useState({ lat: 0, lng: 0 });
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (isOpen && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                },
                (err) => console.log('GPS error', err),
                { timeout: 5000 }
            );
        }
    }, [isOpen]);

    // Animate progress bar during 5 seconds countdown if recording evidence
    useEffect(() => {
        let interval;
        if (isRecording) {
            setProgress(0);
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 2; // ~5 seconds (50 steps of 100ms)
                });
            }, 100);
        } else {
            setProgress(0);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        const submitToBackend = async (location = { latitude: 0, longitude: 0 }, blob = null) => {
            try {
                const data = await createAlert({
                    user_id: user.user_id,
                    risk_level: riskLevel,
                    location,
                    videoBlob: blob,
                    audioBlob: blob
                });

                if (data.success) {
                    setMessage({ text: 'Alert sent successfully!', type: 'success' });
                    if (onAlertCreated) onAlertCreated();
                    setTimeout(() => {
                        onClose();
                        setRiskLevel('risk');
                        setIncludeLocation(true);
                        setRecordEvidence(false);
                        setMessage({ text: '', type: '' });
                    }, 2000);
                } else {
                    setMessage({ text: data.message || 'Failed to send alert', type: 'error' });
                }
            } catch (err) {
                setMessage({ text: err.message || 'Failed to send alert. Please try again.', type: 'error' });
            } finally {
                setLoading(false);
            }
        };

        const processSubmission = (location) => {
            if (recordEvidence && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                setIsRecording(true);
                setMessage({ text: 'Evidence capture active...', type: 'info' });
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                    .then(stream => {
                        const mediaRecorder = new MediaRecorder(stream);
                        const chunks = [];

                        mediaRecorder.ondataavailable = (e) => {
                            if (e.data.size > 0) chunks.push(e.data);
                        };

                        mediaRecorder.onstop = () => {
                            const blob = new Blob(chunks, { type: 'video/webm' });
                            stream.getTracks().forEach(track => track.stop());
                            setIsRecording(false);
                            setMessage({ text: 'Transmitting secure uplink...', type: 'info' });
                            submitToBackend(location, blob);
                        };

                        mediaRecorder.start();
                        setTimeout(() => {
                            mediaRecorder.stop();
                        }, 5000);
                    })
                    .catch(err => {
                        console.error('Camera/Mic access denied or failed', err);
                        setIsRecording(false);
                        setMessage({ text: 'Camera access denied. Sending alert without evidence.', type: 'error' });
                        submitToBackend(location, null);
                    });
            } else {
                submitToBackend(location, null);
            }
        };

        if (includeLocation && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    processSubmission({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    processSubmission({ latitude: 0, longitude: 0 }); 
                },
                { timeout: 5000 }
            );
        } else {
            processSubmission({ latitude: 0, longitude: 0 });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            icon={FaExclamationTriangle}
            title="Send Emergency Alert"
            iconColor="text-[#DB2956]"
            iconBgColor="bg-[#FFE4EC]"
            borderClass="border-t-[6px] border-[#DB2956]"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {message.text && (
                    <div className={`p-3.5 rounded-[10px] text-center font-sans text-sm border ${
                        message.type === 'error' 
                            ? 'text-[#DB2956] bg-[#FFE4EC] border-[#DB2956]/20' 
                            : message.type === 'info'
                            ? 'text-blue-600 bg-blue-50 border-blue-100'
                            : 'text-[#DB2956] bg-[#FFE4EC] border-[#DB2956]/20'
                    }`}>
                        {message.text}
                    </div>
                )}

                {/* Step 1: Select Risk Level */}
                <div className="space-y-2.5">
                    <label className="block font-display font-medium text-xs text-[#6B6B6B] uppercase tracking-wider">
                        Step 1: Select Risk Level
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                        <button
                            type="button"
                            onClick={() => setRiskLevel('risk')}
                            className={`py-3 rounded-[10px] font-display font-medium text-sm transition-all cursor-pointer border-none ${
                                riskLevel === 'risk'
                                    ? 'bg-[#FEF3C7] text-[#92400E] shadow-sm'
                                    : 'bg-[#FAFAFA] text-[#6B6B6B] hover:bg-[#F5F5F5] border border-[#E8E8E8]'
                            }`}
                        >
                            Low
                        </button>
                        <button
                            type="button"
                            onClick={() => setRiskLevel('risky')}
                            className={`py-3 rounded-[10px] font-display font-medium text-sm transition-all cursor-pointer border-none ${
                                riskLevel === 'risky'
                                    ? 'bg-[#FEE2E2] text-[#991B1B] shadow-sm'
                                    : 'bg-[#FAFAFA] text-[#6B6B6B] hover:bg-[#F5F5F5] border border-[#E8E8E8]'
                            }`}
                        >
                            Medium
                        </button>
                        <button
                            type="button"
                            onClick={() => setRiskLevel('high risk')}
                            className={`py-3 rounded-[10px] font-display font-medium text-sm transition-all cursor-pointer border-none ${
                                riskLevel === 'high risk'
                                    ? 'bg-[#DB2956] text-white shadow-sm'
                                    : 'bg-[#FAFAFA] text-[#6B6B6B] hover:bg-[#F5F5F5] border border-[#E8E8E8]'
                            }`}
                        >
                            High
                        </button>
                    </div>
                </div>

                {/* Step 2: Your Location */}
                <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                        <label className="block font-display font-medium text-xs text-[#6B6B6B] uppercase tracking-wider">
                            Step 2: Your Location
                        </label>
                        <label className="flex items-center cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={includeLocation}
                                onChange={(e) => setIncludeLocation(e.target.checked)}
                                className="form-checkbox h-4 w-4 text-[#DB2956] rounded-sm focus:ring-0 border-[#E8E8E8]"
                            />
                            <span className="ml-1.5 text-[11px] font-sans text-[#6B6B6B]">Broadcast GPS</span>
                        </label>
                    </div>

                    {includeLocation && (
                        <div className="bg-[#121212] rounded-[12px] p-4 text-white relative overflow-hidden">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center space-x-1.5">
                                    <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                                    <span className="font-display font-medium text-[10px] tracking-wider uppercase text-[#10B981]">Live</span>
                                </div>
                                <FaMapMarkerAlt className="text-[#DB2956] text-sm" />
                            </div>
                            <p className="font-mono text-xs text-white/95 leading-relaxed tracking-wider">
                                LAT: {coords.lat ? coords.lat.toFixed(6) : 'SEARCHING...'} <br />
                                LNG: {coords.lng ? coords.lng.toFixed(6) : 'SEARCHING...'}
                            </p>
                            <p className="font-sans text-[11px] text-[#9CA3AF] mt-2 border-t border-white/10 pt-2">
                                GPS satellite signals acquired successfully.
                            </p>
                        </div>
                    )}
                </div>

                {/* Step 3: Evidence Capture */}
                <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                        <label className="block font-display font-medium text-xs text-[#6B6B6B] uppercase tracking-wider">
                            Step 3: Evidence Capture
                        </label>
                        <label className="flex items-center cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={recordEvidence}
                                onChange={(e) => setRecordEvidence(e.target.checked)}
                                className="form-checkbox h-4 w-4 text-[#DB2956] rounded-sm focus:ring-0 border-[#E8E8E8]"
                            />
                            <span className="ml-1.5 text-[11px] font-sans text-[#6B6B6B]">Record Video</span>
                        </label>
                    </div>

                    {recordEvidence && (
                        <div className="bg-[#121212] rounded-[12px] p-4 text-white relative overflow-hidden">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-sans text-[10px] text-[#9CA3AF]">DEPLOY CAMERA Telemetry</span>
                                <div className="flex items-center space-x-1 bg-[#DB2956]/20 border border-[#DB2956]/30 px-2 py-0.5 rounded-[4px]">
                                    <span className="w-1.5 h-1.5 bg-[#DB2956] rounded-full animate-ping"></span>
                                    <span className="font-display font-medium text-[9px] uppercase tracking-wider text-[#DB2956]">REC</span>
                                </div>
                            </div>
                            <div className="w-full h-16 bg-[#1a1a1a] rounded-[8px] flex items-center justify-center border border-white/5 mb-3">
                                <FaVideo className="text-[#6B6B6B] text-lg animate-pulse" />
                            </div>
                            
                            {/* Thin countdown progress bar */}
                            <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
                                <div 
                                    className="bg-[#DB2956] h-full transition-all duration-100 ease-linear"
                                    style={{ width: `${isRecording ? progress : 0}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-[#DB2956] hover:bg-[#c11f46] text-white font-display font-medium uppercase tracking-widest text-base rounded-[10px] transition-all cursor-pointer flex items-center justify-center border-none shadow-[0_2px_16px_rgba(219,41,86,0.15)]"
                    disabled={loading || isRecording}
                >
                    <FaShieldAlt className="mr-2 text-base" />
                    {loading ? 'TRANSMITTING BEACON...' : 'Send Alert Now'}
                </button>
                
                <div className="text-center">
                    <button
                        type="button"
                        onClick={onClose}
                        className="font-sans text-sm text-[#6B6B6B] hover:text-[#121212] hover:underline cursor-pointer"
                    >
                        Cancel Broadcast
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AlertModal;
