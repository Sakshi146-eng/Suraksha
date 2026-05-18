import React, { useState } from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import Modal from './Modal';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await loginUser(email, password);
            if (data.success) {
                login(data);
                onClose();
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            icon={FaShieldAlt}
            title="Welcome back"
            iconColor="text-[#DB2956]"
            iconBgColor="bg-[#FFE4EC]"
            borderClass="border-t-4 border-[#DB2956]"
        >
            <p className="text-center font-sans text-sm text-[#6B6B6B] mb-6">
                Sign in to access your Safety Guardian
            </p>

            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="text-sm text-[#DB2956] bg-[#FFE4EC] p-3 rounded-[10px] mb-4 text-center font-sans">
                        {error}
                    </div>
                )}
                
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
                
                <div className="mb-6">
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
                </div>
                
                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
            
            <div className="text-center mt-6">
                <p className="text-sm font-sans text-[#6B6B6B]">
                    Don't have an account?{' '}
                    <button onClick={onSwitchToSignup} className="text-[#DB2956] hover:underline font-display font-medium cursor-pointer">
                        Sign up
                    </button>
                </p>
            </div>
        </Modal>
    );
};

export default LoginModal;
