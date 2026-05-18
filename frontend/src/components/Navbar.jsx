import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    FaShieldAlt, 
    FaSignOutAlt, 
    FaLock, 
    FaCheckCircle 
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenLogin, onOpenSignup }) => {
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const getUserInitials = () => {
        if (!user || !user.name) return 'S';
        const parts = user.name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return user.name.substring(0, 2).toUpperCase();
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-[#E8E8E8] fixed w-full top-0 left-0 z-50 h-[72px] flex items-center transition-all select-none">
            
            {/* Click-Outside Backdrop Overlay when popover is open */}
            {isProfileOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setIsProfileOpen(false)}
                ></div>
            )}

            <div className="container mx-auto px-6 flex justify-between items-center max-w-5xl relative">
                <Link to="/" className="flex items-center space-x-2 group">
                    <img 
                        src="/logo.png" 
                        alt="Suraksha Shield Logo" 
                        className="w-[22px] h-[22px] object-contain group-hover:scale-110 transition-transform duration-300" 
                    />
                    <span className="font-display font-medium text-xl text-[#121212] tracking-tight">
                        Suraksha
                    </span>
                </Link>
                
                <div className="flex items-center space-x-3.5">
                    {user ? (
                        /* Place Profile Avatar in place of the generic Logout button! */
                        <div className="relative z-50">
                            <button 
                                onClick={() => setIsProfileOpen(prev => !prev)} 
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold text-sm cursor-pointer hover:scale-105 active:scale-95 transition-all border-none outline-none relative shadow-[0_2px_12px_rgba(219,41,86,0.08)] ${isProfileOpen ? 'bg-[#DB2956] text-white' : 'bg-[#FFE4EC] text-[#DB2956]'}`}
                                title="Operator Profile Details"
                            >
                                {getUserInitials()}
                            </button>

                            {/* 👤 Floating Profile Dropdown Popover */}
                            {isProfileOpen && (
                                <div className="absolute right-0 top-12 mt-2 w-[calc(100vw-32px)] sm:w-80 bg-white border border-[#E8E8E8] rounded-[24px] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.12)] z-50 animate-scaleUp text-left">
                                    <div className="flex items-center space-x-3 pb-3 border-b border-[#E8E8E8] mb-4">
                                        <FaLock className="text-[#DB2956] text-xs" />
                                        <span className="font-display font-semibold text-xs text-[#121212] uppercase tracking-wider">
                                            Operator Security Credentials
                                        </span>
                                    </div>

                                    <div className="space-y-4 font-sans">
                                        {/* Name & Email Details */}
                                        <div className="flex items-center space-x-3 bg-[#FAFAFA] border border-[#E8E8E8] rounded-[16px] p-3.5">
                                            <div className="w-10 h-10 rounded-xl bg-[#FFE4EC] flex items-center justify-center text-[#DB2956] font-display font-semibold text-sm">
                                                {getUserInitials()}
                                            </div>
                                            <div>
                                                <h4 className="font-display font-semibold text-sm text-[#121212] tracking-tight leading-tight">
                                                    {user?.name || 'User'}
                                                </h4>
                                                <p className="text-[10px] text-[#6B6B6B] truncate max-w-[180px] mt-0.5">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Parameters */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-[10px] border-b border-[#E8E8E8]/50 pb-1.5">
                                                <span className="text-[#6B6B6B] uppercase font-display font-semibold">Operator ID</span>
                                                <span className="text-[#121212] font-mono tracking-tight text-[9px] truncate max-w-[120px]">{user?.user_id || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px]">
                                                <span className="text-[#6B6B6B] uppercase font-display font-semibold">Console Status</span>
                                                <span className="text-[#10B981] font-semibold flex items-center">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-1 animate-pulse"></span>
                                                    Protected
                                                </span>
                                            </div>
                                        </div>

                                        {/* Log Out Action */}
                                        <button 
                                            onClick={() => {
                                                setIsProfileOpen(false);
                                                logout();
                                            }}
                                            className="w-full bg-[#DB2956] hover:bg-[#c11f46] text-white border-none rounded-[12px] py-2.5 font-display font-medium text-[10px] uppercase tracking-wider transition-all cursor-pointer shadow-[0_2px_12px_rgba(219,41,86,0.1)] flex items-center justify-center space-x-1.5"
                                        >
                                            <FaSignOutAlt className="text-[9px]" />
                                            <span>Log Out Operator</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={onOpenLogin}
                                className="px-5 py-2.5 rounded-[10px] bg-white border-[1.5px] border-[#DB2956] text-[#DB2956] hover:bg-[#FFE4EC]/20 font-display font-medium text-xs tracking-wider uppercase transition-all cursor-pointer"
                            >
                                Login
                            </button>
                            <button
                                onClick={onOpenSignup}
                                className="px-5 py-2.5 rounded-[10px] bg-[#DB2956] hover:bg-[#c11f46] text-white font-display font-medium text-xs tracking-wider uppercase transition-all cursor-pointer border border-transparent shadow-[0_2px_16px_rgba(219,41,86,0.08)]"
                            >
                                Get Started
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
