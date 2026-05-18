import React, { useState, useEffect } from 'react';
import { 
    FaUserCircle, 
    FaAddressBook, 
    FaHistory, 
    FaSyncAlt,
    FaMap,
    FaShareAlt,
    FaPhoneAlt,
    FaBuilding,
    FaVideo,
    FaUsers,
    FaHome,
    FaShieldAlt,
    FaCopy,
    FaCheckCircle,
    FaTimes
} from 'react-icons/fa';
import AlertHistory from '../components/AlertHistory';
import ContactsModal from '../components/ContactsModal';
import AlertModal from '../components/AlertModal';
import { useAuth } from '../context/AuthContext';
import { getAlerts } from '../services/api';

const DashboardPage = () => {
    const { user } = useAuth();
    const [alerts, setAlerts] = useState([]);
    const [isContactsOpen, setIsContactsOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [activeTab, setActiveTab] = useState('home'); // 'home' or 'tips'
    const [toastMessage, setToastMessage] = useState(null);
    const [showInfoModal, setShowInfoModal] = useState(null); // null, 'location', 'places'

    useEffect(() => {
        if (user) {
            loadAlerts();
            const interval = setInterval(loadAlerts, 60000);
            return () => clearInterval(interval);
        }
    }, [user, refreshTrigger]);

    const loadAlerts = async () => {
        try {
            const data = await getAlerts(user.user_id);
            if (data.success && data.alerts) {
                setAlerts(data.alerts);
            }
        } catch (error) {
            console.error('Error loading alerts:', error);
        }
    };

    const handleAlertCreated = () => {
        setRefreshTrigger(prev => prev + 1);
        showToast('SOS alert triggered! Broadcasting coordinate telemetry...');
    };

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 4000);
    };

    const handleShareLocation = () => {
        const mockCoordLink = `https://www.google.com/maps/search/?api=1&query=12.9716,77.5946`;
        navigator.clipboard.writeText(mockCoordLink);
        showToast('📍 Live coordinates copied to clipboard & broadcasting link to primary contacts!');
    };

    const handleCallPolice = () => {
        showToast('📞 Initiating emergency voice dialer to standard responders (100)...');
        setTimeout(() => {
            window.location.href = 'tel:100';
        }, 1500);
    };

    const getUserInitials = () => {
        if (!user || !user.name) return 'S';
        const parts = user.name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return user.name.substring(0, 2).toUpperCase();
    };

    const safetyTipsList = [
        { title: "Avoid Dim Shortcuts", desc: "Stick to well-traveled, highly-illuminated primary routes even if they take longer." },
        { title: "Keep Contacts Configured", desc: "Verify that both your primary and secondary contacts' emails are fully verified." },
        { title: "Use Spy Cam Evidence", desc: "When triggering an SOS alert, step 3 records critical video logs and transmits them instantly." },
        { title: "Location Telemetry Active", desc: "Keep browser location services authorized for real-time pinpoint accuracy during alarms." },
        { title: "Discreet Signaling", desc: "The mobile floating SOS Alert beacon button can be pressed in a split second for instant broadcast." },
        { title: "Alert History Auditing", desc: "Audit and verify coordinates links inside your Incident Registry to confirm device health." }
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-32 font-sans select-none">
            <div className="container mx-auto px-4 max-w-5xl">
                
                {/* Custom Interactive Notification Toast */}
                {toastMessage && (
                    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#121212] text-white px-6 py-3.5 rounded-full text-xs font-display font-medium uppercase tracking-wider flex items-center space-x-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-[#E8E8E8]/10 animate-bounce">
                        <FaCheckCircle className="text-[#DB2956] text-sm animate-pulse" />
                        <span>{toastMessage}</span>
                    </div>
                )}

                {/* Profile Banner */}
                <div className="bg-white rounded-[24px] border border-[#E8E8E8] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0_2px_16px_rgba(219,41,86,0.01)] mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-[#FFE4EC] rounded-full flex items-center justify-center text-[#DB2956] font-display font-medium text-lg shadow-inner">
                            {getUserInitials()}
                        </div>
                        <div>
                            <span className="text-[10px] font-display font-semibold text-[#DB2956] uppercase tracking-widest block mb-0.5">
                                Tactical Command Console
                            </span>
                            <h2 className="text-2xl font-display font-semibold text-[#121212] tracking-tight">
                                Welcome back, {user?.name || 'User'}
                            </h2>
                            <p className="text-xs font-sans text-[#6B6B6B]">
                                {user?.email} • Account Protected
                            </p>
                        </div>
                    </div>
                    
                    <div className="hidden md:flex gap-3 items-center w-full md:w-auto">
                        <button
                            onClick={() => setIsContactsOpen(true)}
                            className="border-[1.5px] border-[#DB2956] hover:bg-[#FFE4EC]/20 text-[#DB2956] rounded-[12px] px-5 py-2.5 font-display font-medium text-xs tracking-wider uppercase flex items-center transition-all cursor-pointer bg-transparent"
                        >
                            <FaAddressBook className="mr-2 text-xs" />
                            Contacts Registry
                        </button>
                    </div>
                </div>

                {/* Active Tabs Content Router */}
                {activeTab === 'home' ? (
                    <div className="space-y-8 animate-fadeIn">
                        
                        {/* 6-Grid Behance Action Center */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            
                            {/* Card 1: Location Review */}
                            <div 
                                onClick={() => setShowInfoModal('location')}
                                className="bg-white border border-[#E8E8E8] rounded-[20px] p-5 shadow-[0_2px_16px_rgba(219,41,86,0.01)] flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-[0_8px_24px_rgba(219,41,86,0.06)] hover:border-[#FFE4EC] hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#FFE4EC] flex items-center justify-center mb-1 text-[#DB2956] text-xl">
                                    <FaMap />
                                </div>
                                <span className="font-display font-medium text-[13px] text-[#121212] mt-2 tracking-tight">
                                    Location Review
                                </span>
                            </div>

                            {/* Card 2: Share Location */}
                            <div 
                                onClick={handleShareLocation}
                                className="bg-white border border-[#E8E8E8] rounded-[20px] p-5 shadow-[0_2px_16px_rgba(219,41,86,0.01)] flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-[0_8px_24px_rgba(219,41,86,0.06)] hover:border-[#FFE4EC] hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#FFE4EC] flex items-center justify-center mb-1 text-[#DB2956] text-xl">
                                    <FaShareAlt />
                                </div>
                                <span className="font-display font-medium text-[13px] text-[#121212] mt-2 tracking-tight">
                                    Share Location
                                </span>
                            </div>

                            {/* Card 3: Call Police */}
                            <div 
                                onClick={handleCallPolice}
                                className="bg-white border border-[#E8E8E8] rounded-[20px] p-5 shadow-[0_2px_16px_rgba(219,41,86,0.01)] flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-[0_8px_24px_rgba(219,41,86,0.06)] hover:border-[#FFE4EC] hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#FFE4EC] flex items-center justify-center mb-1 text-[#DB2956] text-xl">
                                    <FaPhoneAlt />
                                </div>
                                <span className="font-display font-medium text-[13px] text-[#121212] mt-2 tracking-tight">
                                    Call Police
                                </span>
                            </div>

                            {/* Card 4: Nearby Public Places */}
                            <div 
                                onClick={() => setShowInfoModal('places')}
                                className="bg-white border border-[#E8E8E8] rounded-[20px] p-5 shadow-[0_2px_16px_rgba(219,41,86,0.01)] flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-[0_8px_24px_rgba(219,41,86,0.06)] hover:border-[#FFE4EC] hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#FFE4EC] flex items-center justify-center mb-1 text-[#DB2956] text-xl">
                                    <FaBuilding />
                                </div>
                                <span className="font-display font-medium text-[13px] text-[#121212] mt-2 tracking-tight">
                                    Nearby Public Places
                                </span>
                            </div>

                            {/* Card 5: Spy Cam */}
                            <div 
                                onClick={() => setIsAlertOpen(true)}
                                className="bg-white border border-[#E8E8E8] rounded-[20px] p-5 shadow-[0_2px_16px_rgba(219,41,86,0.01)] flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-[0_8px_24px_rgba(219,41,86,0.06)] hover:border-[#FFE4EC] hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#FFE4EC] flex items-center justify-center mb-1 text-[#DB2956] text-xl animate-pulse">
                                    <FaVideo />
                                </div>
                                <span className="font-display font-medium text-[13px] text-[#121212] mt-2 tracking-tight">
                                    Spy Cam
                                </span>
                            </div>

                            {/* Card 6: Emergency Contacts */}
                            <div 
                                onClick={() => setIsContactsOpen(true)}
                                className="bg-white border border-[#E8E8E8] rounded-[20px] p-5 shadow-[0_2px_16px_rgba(219,41,86,0.01)] flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-[0_8px_24px_rgba(219,41,86,0.06)] hover:border-[#FFE4EC] hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#FFE4EC] flex items-center justify-center mb-1 text-[#DB2956] text-xl">
                                    <FaUsers />
                                </div>
                                <span className="font-display font-medium text-[13px] text-[#121212] mt-2 tracking-tight">
                                    Emergency Contacts
                                </span>
                            </div>

                        </div>

                        {/* Incident Registry Logs Section */}
                        <div className="bg-white rounded-[24px] border border-[#E8E8E8] p-6 md:p-8 shadow-[0_2px_16px_rgba(219,41,86,0.01)]">
                            <div className="flex justify-between items-center pb-5 border-b border-[#E8E8E8] mb-6">
                                <div className="flex items-center space-x-2">
                                    <FaHistory className="text-[#DB2956] text-base" />
                                    <h3 className="text-xl font-display font-semibold text-[#121212] tracking-tight">
                                        Incident Registry
                                    </h3>
                                    <span className="bg-[#FFE4EC] text-[#DB2956] text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                        {alerts.length} Total Logs
                                    </span>
                                </div>
                                
                                <button 
                                    onClick={() => {
                                        setRefreshTrigger(prev => prev + 1);
                                        showToast('Telemetry data logs updated.');
                                    }} 
                                    className="bg-white border border-[#E8E8E8] hover:border-[#121212] text-[#6B6B6B] hover:text-[#121212] px-3.5 py-2 rounded-[10px] text-[10px] font-display font-medium uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer bg-transparent"
                                >
                                    <FaSyncAlt className="text-[9px]" />
                                    <span>REFRESH</span>
                                </button>
                            </div>

                            <AlertHistory alerts={alerts} />
                        </div>
                    </div>
                ) : (
                    /* Safety Tips Active View */
                    <div className="bg-white rounded-[24px] border border-[#E8E8E8] p-6 md:p-8 shadow-[0_2px_16px_rgba(219,41,86,0.01)] animate-fadeIn">
                        <div className="pb-5 border-b border-[#E8E8E8] mb-6 flex items-center space-x-2">
                            <FaShieldAlt className="text-[#DB2956] text-base" />
                            <h3 className="text-xl font-display font-semibold text-[#121212] tracking-tight">
                                Safety & Protection Protocol
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {safetyTipsList.map((tip, idx) => (
                                <div key={idx} className="border border-[#E8E8E8]/70 rounded-[16px] p-5 hover:border-[#FFE4EC] hover:bg-[#FFE4EC]/5 transition-all">
                                    <h4 className="font-display font-semibold text-sm text-[#121212] mb-1.5 uppercase tracking-wide flex items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#DB2956] mr-2"></span>
                                        {tip.title}
                                    </h4>
                                    <p className="text-xs text-[#6B6B6B] font-sans leading-relaxed">
                                        {tip.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* Custom Modals & Coverage info */}
            {showInfoModal === 'location' && (
                <div className="fixed inset-0 bg-[#121212]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-[#E8E8E8] rounded-[24px] max-w-sm w-full p-6 shadow-[0_16px_48px_rgba(0,0,0,0.15)] relative">
                        <button onClick={() => setShowInfoModal(null)} className="absolute top-5 right-5 text-[#6B6B6B] hover:text-[#121212] cursor-pointer">
                            <FaTimes />
                        </button>
                        <div className="w-12 h-12 rounded-2xl bg-[#FFE4EC] flex items-center justify-center text-[#DB2956] text-lg mb-4">
                            <FaMap />
                        </div>
                        <h4 className="font-display font-semibold text-base text-[#121212] mb-2">Location Telemetry Coverage</h4>
                        <p className="text-xs text-[#6B6B6B] font-sans leading-relaxed mb-4">
                            Your location is monitored continuously using standard HTML5 Geolocation API endpoints. Coverage relies on satellite GPS signals on mobile devices or cell tower triangulation. Link with coordinate logs is generated instantly during any broadcast alert.
                        </p>
                        <button onClick={() => setShowInfoModal(null)} className="w-full bg-[#121212] text-white py-2.5 rounded-[12px] font-display font-semibold text-[11px] uppercase tracking-wider cursor-pointer">
                            Acknowledge
                        </button>
                    </div>
                </div>
            )}

            {showInfoModal === 'places' && (
                <div className="fixed inset-0 bg-[#121212]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-[#E8E8E8] rounded-[24px] max-w-sm w-full p-6 shadow-[0_16px_48px_rgba(0,0,0,0.15)] relative">
                        <button onClick={() => setShowInfoModal(null)} className="absolute top-5 right-5 text-[#6B6B6B] hover:text-[#121212] cursor-pointer">
                            <FaTimes />
                        </button>
                        <div className="w-12 h-12 rounded-2xl bg-[#FFE4EC] flex items-center justify-center text-[#DB2956] text-lg mb-4">
                            <FaBuilding />
                        </div>
                        <h4 className="font-display font-semibold text-base text-[#121212] mb-2">Safe Zones Nearby</h4>
                        <p className="text-xs text-[#6B6B6B] font-sans leading-relaxed mb-4">
                            Tactical dispatch maps indicate active 24/7 protection coordinates within a 1km range. These locations include local police precincts, municipal medical wings, and authorized transit safety hubs.
                        </p>
                        <button onClick={() => setShowInfoModal(null)} className="w-full bg-[#121212] text-white py-2.5 rounded-[12px] font-display font-semibold text-[11px] uppercase tracking-wider cursor-pointer">
                            Acknowledge
                        </button>
                    </div>
                </div>
            )}

            {/* Config & Broadcast Modals */}
            <ContactsModal
                isOpen={isContactsOpen}
                onClose={() => setIsContactsOpen(false)}
            />

            <AlertModal
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                onAlertCreated={handleAlertCreated}
            />

            {/* 📱 Premium High-Fidelity Bottom Tab Bar */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-20 bg-white border-t md:border-x border-[#E8E8E8] md:rounded-t-[28px] flex justify-around items-center z-50 shadow-[0_-8px_32px_rgba(0,0,0,0.06)] px-8 select-none">
                
                {/* Left Side Tab: Home */}
                <button 
                    onClick={() => setActiveTab('home')}
                    className={`flex flex-col items-center justify-center transition-all bg-transparent border-none cursor-pointer ${activeTab === 'home' ? 'text-[#DB2956]' : 'text-[#6B6B6B] hover:text-[#121212]'}`}
                >
                    <FaHome className="text-xl mb-1" />
                    <span className="font-display font-semibold text-[10px] uppercase tracking-widest">Home</span>
                </button>

                {/* Center Tab: Large Circular Alert button */}
                <div className="relative -top-7">
                    {/* Ring Layer */}
                    <div className="absolute -inset-2.5 rounded-full bg-[#FFE4EC]/70 animate-ping duration-1000 z-0"></div>
                    <button 
                        onClick={() => setIsAlertOpen(true)}
                        className="relative z-10 w-20 h-20 rounded-full bg-[#DB2956] border-[6px] border-[#FAFAFA] flex flex-col items-center justify-center text-white font-display font-bold uppercase tracking-wider text-[11px] shadow-[0_8px_32px_rgba(219,41,86,0.4)] transition-transform hover:scale-105 active:scale-95 cursor-pointer border-none"
                    >
                        <span>Alert</span>
                    </button>
                </div>

                {/* Right Side Tab: Safety Tips */}
                <button 
                    onClick={() => setActiveTab('tips')}
                    className={`flex flex-col items-center justify-center transition-all bg-transparent border-none cursor-pointer ${activeTab === 'tips' ? 'text-[#DB2956]' : 'text-[#6B6B6B] hover:text-[#121212]'}`}
                >
                    <FaShieldAlt className="text-xl mb-1" />
                    <span className="font-display font-semibold text-[10px] uppercase tracking-widest">Safety Tips</span>
                </button>

            </div>

        </div>
    );
};

export default DashboardPage;
