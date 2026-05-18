import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaSignOutAlt, FaColumns } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenLogin, onOpenSignup }) => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-[#E8E8E8] fixed w-full top-0 left-0 z-50 h-[72px] flex items-center transition-all">
            <div className="container mx-auto px-6 flex justify-between items-center max-w-5xl">
                <Link to="/" className="flex items-center space-x-2 group">
                    <FaShieldAlt className="text-[#DB2956] text-xl group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-display font-medium text-xl text-[#121212] tracking-tight">
                        Suraksha
                    </span>
                </Link>
                
                <div className="flex items-center space-x-3.5">
                    {user ? (
                        <>
                            <button 
                                onClick={logout}
                                className="bg-transparent border-none text-[#6B6B6B] hover:text-[#DB2956] px-3 py-2.5 rounded-[10px] text-xs font-display font-medium uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer"
                            >
                                <FaSignOutAlt className="text-xs" />
                                <span>LOGOUT</span>
                            </button>
                        </>
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
