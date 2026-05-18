import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#121212] text-white py-12 border-t border-white/5 mt-auto">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                    <h3 className="font-display font-medium text-xl text-white tracking-tight mb-1">Suraksha</h3>
                    <p className="text-[#6B6B6B] font-sans text-sm">Empowering personal safety and protection through real-time telemetry.</p>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-xs text-[#6B6B6B] font-sans">&copy; {new Date().getFullYear()} Suraksha. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
