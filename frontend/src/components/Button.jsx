import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', className = '', variant = 'primary', ...props }) => {

    const variants = {
        primary: 'bg-[#DB2956] text-white hover:bg-[#c11f46] border border-transparent',
        secondary: 'bg-[#121212] text-white hover:bg-[#252525] border border-transparent',
        ghost: 'bg-white border-[1.5px] border-[#DB2956] text-[#DB2956] hover:bg-[#FFE4EC]/30',
        outline: 'bg-white border border-[#E8E8E8] text-[#121212] hover:bg-[#FAFAFA]',
        danger: 'bg-[#DB2956] text-white hover:bg-[#c11f46] border border-transparent',
        success: 'bg-[#10B981] text-white hover:bg-[#0e9f6e] border border-transparent'
    };

    const baseClass = "rounded-[10px] font-display font-medium text-base py-3 px-6 shadow-[0_2px_16px_rgba(219,41,86,0.04)] flex items-center justify-center transition-all cursor-pointer";

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            className={`${baseClass} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
