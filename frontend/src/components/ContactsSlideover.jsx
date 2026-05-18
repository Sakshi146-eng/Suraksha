import React, { useState, useEffect } from 'react';
import { 
    FaAddressBook, 
    FaSave, 
    FaCheckCircle, 
    FaTimes, 
    FaPhoneAlt, 
    FaEnvelope, 
    FaEdit, 
    FaUsers,
    FaArrowLeft
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { saveContacts, getUserContacts } from '../services/api';

const ContactsSlideover = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [primaryName, setPrimaryName] = useState('');
    const [primaryPhone, setPrimaryPhone] = useState('');
    const [primaryEmail, setPrimaryEmail] = useState('');
    const [secondaryName, setSecondaryName] = useState('');
    const [secondaryPhone, setSecondaryPhone] = useState('');
    const [secondaryEmail, setSecondaryEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (isOpen && user) {
            loadContacts();
            setIsEditing(false); // Reset to view mode on open
            setMessage({ text: '', type: '' });
        }
    }, [isOpen, user]);

    const loadContacts = async () => {
        try {
            const data = await getUserContacts(user.user_id);
            if (data.success && data.contacts) {
                setPrimaryName(data.contacts.primaryName || '');
                setPrimaryPhone(data.contacts.primaryPhone || '');
                setPrimaryEmail(data.contacts.primaryEmail || '');
                setSecondaryName(data.contacts.secondaryName || '');
                setSecondaryPhone(data.contacts.secondaryPhone || '');
                setSecondaryEmail(data.contacts.secondaryEmail || '');
            }
        } catch (error) {
            console.error('Error loading contacts', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const data = await saveContacts({
                user_id: user.user_id,
                primaryName,
                primaryPhone,
                primaryEmail,
                secondaryName,
                secondaryPhone,
                secondaryEmail
            });

            if (data.success) {
                setMessage({ text: 'Emergency contacts stored successfully.', type: 'success' });
                setTimeout(() => {
                    setIsEditing(false);
                    setMessage({ text: '', type: '' });
                    loadContacts();
                }, 1500);
            } else {
                setMessage({ text: data.message || 'Failed to save contacts', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: err.message || 'Failed to save contacts', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden font-sans select-none">
            {/* Backdrop Overlay with slow fade */}
            <div 
                className="absolute inset-0 bg-[#121212]/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Slideover Container panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-slideOver">
                    
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-[#E8E8E8] flex justify-between items-center bg-[#FAFAFA]">
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={isEditing ? () => setIsEditing(false) : onClose}
                                className="text-[#6B6B6B] hover:text-[#121212] transition-colors p-1.5 rounded-full hover:bg-[#E8E8E8]/50 bg-transparent border-none cursor-pointer flex items-center justify-center"
                            >
                                <FaArrowLeft className="text-sm" />
                            </button>
                            <span className="font-display font-semibold text-lg text-[#121212] tracking-tight">
                                {isEditing ? 'Configure Contacts' : 'Emergency Registry'}
                            </span>
                        </div>
                        
                        {/* Toggle Edit Button in header when in View mode */}
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-[#FFE4EC] hover:bg-[#FFE4EC]/70 text-[#DB2956] px-3.5 py-1.5 rounded-[10px] text-[10px] font-display font-semibold uppercase tracking-wider transition-all cursor-pointer border-none flex items-center space-x-1"
                            >
                                <FaEdit />
                                <span>Configure</span>
                            </button>
                        )}
                    </div>

                    {/* Content Scroll Area */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                        
                        {/* Success/Error Toast Inside Slideover */}
                        {message.text && (
                            <div className="p-4 rounded-[12px] flex items-center justify-center space-x-2 border text-[#DB2956] bg-[#FFE4EC] border-[#DB2956]/20 animate-fadeIn">
                                {message.type === 'success' && <FaCheckCircle className="text-[#DB2956] text-base" />}
                                <span className="font-sans text-xs font-medium">{message.text}</span>
                            </div>
                        )}

                        {/* View Mode: ALWAYS show BOTH slots as requested! */}
                        {!isEditing ? (
                            <div className="space-y-5 animate-fadeIn">
                                
                                {/* 1. Primary Contact Slot */}
                                <div className="border border-[#E8E8E8] rounded-[20px] p-5 bg-[#FAFAFA] relative hover:border-[#FFE4EC] transition-all">
                                    <div className="absolute top-4 right-4 bg-[#FFE4EC] text-[#DB2956] text-[9px] font-display font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                        Primary
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-[#FFE4EC] flex items-center justify-center text-[#DB2956] font-display font-semibold text-sm mb-4">
                                        {primaryName ? primaryName.substring(0, 2).toUpperCase() : 'P'}
                                    </div>
                                    {primaryName ? (
                                        <>
                                            <h4 className="font-display font-semibold text-base text-[#121212] mb-3">{primaryName}</h4>
                                            <div className="space-y-2 text-xs text-[#6B6B6B] font-sans">
                                                {primaryPhone && (
                                                    <p className="flex items-center">
                                                        <FaPhoneAlt className="mr-2.5 text-[#DB2956]/70" />
                                                        {primaryPhone}
                                                    </p>
                                                )}
                                                {primaryEmail && (
                                                    <p className="flex items-center">
                                                        <FaEnvelope className="mr-2.5 text-[#DB2956]/70" />
                                                        {primaryEmail}
                                                    </p>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="py-2">
                                            <h4 className="font-display font-semibold text-sm text-[#6B6B6B] mb-1">No Primary Contact</h4>
                                            <p className="text-[11px] text-[#A0A0A0] font-sans leading-relaxed">
                                                Click the Configure button above to link your primary emergency alert responder.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* 2. Secondary Contact Slot */}
                                <div className="border border-[#E8E8E8] rounded-[20px] p-5 bg-[#FAFAFA] relative hover:border-[#FFE4EC] transition-all">
                                    <div className="absolute top-4 right-4 bg-[#E8E8E8] text-[#6B6B6B] text-[9px] font-display font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                        Secondary
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-[#E8E8E8]/60 flex items-center justify-center text-[#6B6B6B] font-display font-semibold text-sm mb-4">
                                        {secondaryName ? secondaryName.substring(0, 2).toUpperCase() : 'S'}
                                    </div>
                                    {secondaryName ? (
                                        <>
                                            <h4 className="font-display font-semibold text-base text-[#121212] mb-3">{secondaryName}</h4>
                                            <div className="space-y-2 text-xs text-[#6B6B6B] font-sans">
                                                {secondaryPhone && (
                                                    <p className="flex items-center">
                                                        <FaPhoneAlt className="mr-2.5 text-[#DB2956]/70" />
                                                        {secondaryPhone}
                                                    </p>
                                                )}
                                                {secondaryEmail && (
                                                    <p className="flex items-center">
                                                        <FaEnvelope className="mr-2.5 text-[#DB2956]/70" />
                                                        {secondaryEmail}
                                                    </p>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="py-2">
                                            <h4 className="font-display font-semibold text-sm text-[#6B6B6B] mb-1">No Secondary Contact</h4>
                                            <p className="text-[11px] text-[#A0A0A0] font-sans leading-relaxed">
                                                Optional secondary responder. Click the Configure button above to establish contacts.
                                            </p>
                                        </div>
                                    )}
                                </div>

                            </div>
                        ) : (
                            /* Edit Form Mode */
                            <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
                                
                                {/* Section 1: Primary Contact */}
                                <div className="border-b border-[#E8E8E8] pb-6">
                                    <h5 className="font-display font-semibold text-xs text-[#DB2956] tracking-wider uppercase mb-4">
                                        Primary Contact <span className="text-[#DB2956]">*</span>
                                    </h5>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block font-display font-medium text-[10px] text-[#121212] mb-1.5 uppercase tracking-wider">Name</label>
                                            <input
                                                type="text"
                                                value={primaryName}
                                                onChange={(e) => setPrimaryName(e.target.value)}
                                                className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-2.5 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-xs"
                                                placeholder="Contact full name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-display font-medium text-[10px] text-[#121212] mb-1.5 uppercase tracking-wider">Phone</label>
                                            <input
                                                type="tel"
                                                value={primaryPhone}
                                                onChange={(e) => setPrimaryPhone(e.target.value)}
                                                className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-2.5 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-xs"
                                                placeholder="+1234567890"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-display font-medium text-[10px] text-[#121212] mb-1.5 uppercase tracking-wider">Email</label>
                                            <input
                                                type="email"
                                                value={primaryEmail}
                                                onChange={(e) => setPrimaryEmail(e.target.value)}
                                                className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-2.5 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-xs"
                                                placeholder="contact@domain.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Secondary Contact */}
                                <div className="pb-4">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <h5 className="font-display font-semibold text-xs text-[#6B6B6B] tracking-wider uppercase">Secondary Contact</h5>
                                        <span className="bg-[#FAFAFA] border border-[#E8E8E8] text-[#6B6B6B] px-2 py-0.5 rounded-full text-[8px] uppercase tracking-wider font-sans">Optional</span>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block font-display font-medium text-[10px] text-[#121212] mb-1.5 uppercase tracking-wider">Name</label>
                                            <input
                                                type="text"
                                                value={secondaryName}
                                                onChange={(e) => setSecondaryName(e.target.value)}
                                                className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-2.5 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-xs"
                                                placeholder="Contact full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-display font-medium text-[10px] text-[#121212] mb-1.5 uppercase tracking-wider">Phone</label>
                                            <input
                                                type="tel"
                                                value={secondaryPhone}
                                                onChange={(e) => setSecondaryPhone(e.target.value)}
                                                className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-2.5 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-xs"
                                                placeholder="+1234567890"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-display font-medium text-[10px] text-[#121212] mb-1.5 uppercase tracking-wider">Email</label>
                                            <input
                                                type="email"
                                                value={secondaryEmail}
                                                onChange={(e) => setSecondaryEmail(e.target.value)}
                                                className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-2.5 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-xs"
                                                placeholder="contact@domain.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 py-3 bg-[#FAFAFA] border border-[#E8E8E8] hover:border-[#121212] text-[#121212] font-display font-medium uppercase tracking-widest text-[10px] rounded-[10px] cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 py-3 bg-[#DB2956] hover:bg-[#c11f46] text-white border-none font-display font-medium uppercase tracking-widest text-[10px] rounded-[10px] cursor-pointer flex items-center justify-center shadow-[0_2px_12px_rgba(219,41,86,0.1)]"
                                    >
                                        <FaSave className="mr-1.5 text-xs" />
                                        {loading ? 'Saving...' : 'Save Recipient'}
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>

                    {/* Footer Close Tab */}
                    {!isEditing && (
                        <div className="p-6 border-t border-[#E8E8E8] bg-[#FAFAFA] flex gap-3">
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-[#121212] text-white hover:bg-black font-display font-semibold text-[10px] uppercase tracking-wider rounded-[12px] border-none cursor-pointer transition-all"
                            >
                                Done
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ContactsSlideover;
