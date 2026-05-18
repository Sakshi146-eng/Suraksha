import React, { useState, useEffect } from 'react';
import { FaAddressBook, FaSave, FaCheckCircle } from 'react-icons/fa';
import Modal from './Modal';
import { useAuth } from '../context/AuthContext';
import { saveContacts, getUserContacts } from '../services/api';

const ContactsModal = ({ isOpen, onClose }) => {
    const { user } = useAuth();
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
                setMessage({ text: 'Contacts saved successfully.', type: 'success' });
                setTimeout(() => {
                    onClose();
                    setMessage({ text: '', type: '' });
                }, 2000);
            } else {
                setMessage({ text: data.message || 'Failed to save contacts', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: err.message || 'Failed to save contacts', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            icon={FaAddressBook}
            title="Emergency Contacts"
            iconColor="text-[#DB2956]"
            iconBgColor="bg-[#FFE4EC]"
            borderClass="border-t-4 border-[#DB2956]"
        >
            <p className="text-center font-sans text-sm text-[#6B6B6B] mb-6">
                Establish primary recipient links for emergency broadcasts
            </p>

            <form onSubmit={handleSubmit}>
                {message.text && (
                    <div className={`p-4 rounded-[10px] mb-6 flex items-center justify-center space-x-2 border ${
                        message.type === 'error' 
                            ? 'text-[#DB2956] bg-[#FFE4EC] border-[#DB2956]/20' 
                            : 'text-[#DB2956] bg-[#FFE4EC] border-[#DB2956]/20'
                    }`}>
                        {message.type === 'success' && <FaCheckCircle className="text-[#DB2956] text-base" />}
                        <span className="font-sans text-sm font-regular">{message.text}</span>
                    </div>
                )}

                {/* Section 1: Primary Contact */}
                <div className="border-b border-[#E8E8E8] pb-6 mb-6">
                    <div className="flex items-center mb-4">
                        <span className="font-display font-medium text-xs text-[#DB2956] tracking-wider uppercase">
                            Primary Contact <span className="text-[#DB2956]">*</span>
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block font-display font-medium text-[11px] text-[#121212] mb-1.5 uppercase tracking-wider">
                                Name
                            </label>
                            <input
                                type="text"
                                value={primaryName}
                                onChange={(e) => setPrimaryName(e.target.value)}
                                className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-2.5 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-base"
                                placeholder="Contact full name"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-display font-medium text-[11px] text-[#121212] mb-1.5 uppercase tracking-wider">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={primaryPhone}
                                    onChange={(e) => setPrimaryPhone(e.target.value)}
                                    className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-2.5 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-base"
                                    placeholder="+1234567890"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-display font-medium text-[11px] text-[#121212] mb-1.5 uppercase tracking-wider">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={primaryEmail}
                                    onChange={(e) => setPrimaryEmail(e.target.value)}
                                    className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-2.5 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-base"
                                    placeholder="contact@domain.com"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Secondary Contact */}
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="font-display font-medium text-xs text-[#6B6B6B] tracking-wider uppercase">
                            Secondary Contact
                        </span>
                        <span className="bg-[#FAFAFA] border border-[#E8E8E8] text-[#6B6B6B] px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-sans">
                            Optional
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block font-display font-medium text-[11px] text-[#121212] mb-1.5 uppercase tracking-wider">
                                Name
                            </label>
                            <input
                                type="text"
                                value={secondaryName}
                                onChange={(e) => setSecondaryName(e.target.value)}
                                className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-2.5 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-base"
                                placeholder="Contact full name"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-display font-medium text-[11px] text-[#121212] mb-1.5 uppercase tracking-wider">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={secondaryPhone}
                                    onChange={(e) => setSecondaryPhone(e.target.value)}
                                    className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-2.5 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-base"
                                    placeholder="+1234567890"
                                />
                            </div>
                            <div>
                                <label className="block font-display font-medium text-[11px] text-[#121212] mb-1.5 uppercase tracking-wider">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={secondaryEmail}
                                    onChange={(e) => setSecondaryEmail(e.target.value)}
                                    className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-2.5 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-base"
                                    placeholder="contact@domain.com"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3.5 bg-[#DB2956] hover:bg-[#c11f46] text-white font-display font-medium uppercase tracking-widest text-xs rounded-[10px] transition-all cursor-pointer flex items-center justify-center border-none shadow-[0_2px_16px_rgba(219,41,86,0.08)]"
                    disabled={loading}
                >
                    <FaSave className="mr-2 text-xs" />
                    {loading ? 'STORING TELEMETRY...' : 'STORE RECIPIENT DATA'}
                </button>
            </form>
        </Modal>
    );
};

export default ContactsModal;
