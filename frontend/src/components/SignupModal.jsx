import React, { useState } from 'react';
import { FaUserPlus, FaLock } from 'react-icons/fa';
import Modal from './Modal';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { registerUser, loginUser } from '../services/api';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    // Custom password strength calculation
    const getPasswordStrength = (pass) => {
        let score = 0;
        if (!pass) return score;
        if (pass.length >= 6) score += 1;
        if (pass.length >= 10) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9!@#$%^&*]/.test(pass)) score += 1;
        return score;
    };

    const strength = getPasswordStrength(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await registerUser(name, email, password);
            if (data.success) {
                // Auto login after signup
                const loginData = await loginUser(email, password);
                if (loginData.success) {
                    login(loginData);
                    onClose();
                } else {
                    onSwitchToLogin();
                }
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            icon={FaUserPlus}
            title="Create Account"
            iconColor="text-[#DB2956]"
            iconBgColor="bg-[#FFE4EC]"
            borderClass="border-t-4 border-[#DB2956]"
        >
            <p className="text-center font-sans text-sm text-[#6B6B6B] mb-6">
                Join Safety Guardian today
            </p>

            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="text-sm text-[#DB2956] bg-[#FFE4EC] p-3 rounded-[10px] mb-4 text-center font-sans">
                        {error}
                    </div>
                )}
                
                <div className="mb-4">
                    <label className="block font-display font-medium text-xs text-[#121212] mb-1.5 uppercase tracking-wider">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-3 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-base"
                        placeholder="Your full name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-display font-medium text-xs text-[#121212] mb-1.5 uppercase tracking-wider">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-3 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-base"
                        placeholder="yourname@domain.com"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-display font-medium text-xs text-[#121212] mb-1.5 uppercase tracking-wider">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white border-[1.5px] border-[#E8E8E8] focus:border-[#DB2956] rounded-[10px] px-4 py-3 text-[#121212] placeholder-[#9CA3AF] focus:outline-none transition-colors font-sans text-base"
                        placeholder="••••••••"
                        required
                    />
                    
                    {/* 4-Step Password Strength Telemetry Bar */}
                    <div className="mt-2.5 space-y-1.5">
                        <div className="flex gap-1.5 h-1">
                            {[1, 2, 3, 4].map((step) => (
                                <div
                                    key={step}
                                    className={`flex-1 transition-all duration-300 ${
                                        step <= strength ? 'bg-[#DB2956]' : 'bg-[#E8E8E8]'
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-[#6B6B6B] font-sans">
                            <span>Password Security telemetry</span>
                            <span className="uppercase font-medium">
                                {strength === 0 ? 'NOT SET' : strength === 1 ? 'WEAK' : strength === 2 ? 'FAIR' : strength === 3 ? 'STRONG' : 'VERY SAFE'}
                            </span>
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
            </form>
            
            <div className="text-center mt-6 flex flex-col items-center space-y-4">
                <p className="text-sm font-sans text-[#6B6B6B]">
                    Already have an account?{' '}
                    <button onClick={onSwitchToLogin} className="text-[#DB2956] hover:underline font-display font-medium cursor-pointer">
                        Login
                    </button>
                </p>

                <div className="flex items-center space-x-1.5 text-xs text-[#6B6B6B] font-sans pt-2 border-t border-[#E8E8E8] w-full justify-center">
                    <FaLock className="text-[#DB2956] text-[10px]" />
                    <span>Your data is encrypted</span>
                </div>
            </div>
        </Modal>
    );
};

export default SignupModal;
