import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, children, title, icon: Icon, iconColor = 'text-[#DB2956]', iconBgColor = 'bg-[#FFE4EC]', borderClass = 'border-t-4 border-[#DB2956]' }) => {

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#121212]/50 backdrop-blur-xs"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        className={`bg-white rounded-[20px] w-full max-w-md p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto z-10 shadow-[0_4px_32px_rgba(18,18,18,0.08)] ${borderClass}`}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-[#6B6B6B] hover:text-[#121212] transition-colors cursor-pointer"
                        >
                            <FaTimes className="text-lg" />
                        </button>

                        {(title || Icon) && (
                            <div className="text-center mb-6 flex flex-col items-center">
                                {Icon && (
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${iconBgColor} ${iconColor} mb-3.5`}>
                                        <Icon className="text-xl" />
                                    </div>
                                )}
                                {title && (
                                    <h3 className="text-2xl font-display font-medium text-[#121212] tracking-tight">{title}</h3>
                                )}
                            </div>
                        )}

                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
