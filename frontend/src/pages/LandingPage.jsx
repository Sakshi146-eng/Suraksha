import React from 'react';
import { FaShieldAlt, FaMapMarkerAlt, FaBell, FaVideo, FaAddressBook, FaHistory, FaCheckCircle, FaLock } from 'react-icons/fa';
import Button from '../components/Button';

const LandingPage = ({ onGetStarted }) => {
    return (
        <div className="pt-[64px] min-h-screen bg-[#FAFAFA]">
            {/* Hero Section */}
            <section className="py-20 md:py-28 px-6 bg-[#FAFAFA]">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Column */}
                    <div className="flex flex-col items-start space-y-6">
                        <div className="inline-block bg-[#FFE4EC] text-[#DB2956] px-3.5 py-1.5 rounded-full font-display font-medium text-xs tracking-wider uppercase">
                            Personal Safety Platform
                        </div>
                        
                        <h1 className="font-display font-regular text-[38px] md:text-[54px] text-[#121212] leading-[1.1] tracking-tight">
                            Your <span className="text-[#DB2956] font-medium">safety</span> is <br />
                            one tap away.
                        </h1>
                        
                        <p className="font-sans font-regular text-lg text-[#6B6B6B] max-w-md leading-relaxed">
                            Real-time GPS, SOS alerts, and video evidence — all in one place.
                        </p>
                        
                        <div className="flex flex-row space-x-4 w-full sm:w-auto pt-2">
                            <Button variant="primary" onClick={onGetStarted} className="w-full sm:w-auto">
                                Get Protected
                            </Button>
                            <a href="#how-it-works" className="w-full sm:w-auto">
                                <Button variant="ghost" className="w-full">
                                    See How It Works
                                </Button>
                            </a>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#E8E8E8] w-full mt-4">
                            <div className="flex items-center space-x-2 text-[#6B6B6B] font-sans text-xs">
                                <FaMapMarkerAlt className="text-[#DB2956] text-sm" />
                                <span>GPS Tracking</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[#6B6B6B] font-sans text-xs">
                                <FaBell className="text-[#DB2956] text-sm" />
                                <span>Instant SOS</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[#6B6B6B] font-sans text-xs">
                                <FaVideo className="text-[#DB2956] text-sm" />
                                <span>Evidence Capture</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column: Premium Mockup Panel */}
                    <div className="flex justify-center items-center w-full relative">
                        {/* Soft decorative background shape */}
                        <div className="absolute w-[80%] h-[80%] bg-[#FFE4EC] rounded-[40px] -z-10 blur-xl opacity-60"></div>
                        
                        <div className="bg-white border border-[#E8E8E8] rounded-[24px] p-6 w-full max-w-[340px] shadow-[0_4px_32px_rgba(219,41,86,0.06)] relative overflow-hidden">
                            {/* Top Mockup Header */}
                            <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#E8E8E8]">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#6B6B6B]">SURAKSHA SECURE</span>
                                </div>
                                <span className="font-sans text-[10px] text-[#6B6B6B]">ACTIVE</span>
                            </div>
                            
                            {/* Mockup Map Panel */}
                            <div className="w-full h-28 bg-[#FFE4EC]/40 rounded-[12px] border border-[#FFE4EC] relative overflow-hidden flex items-center justify-center mb-4">
                                {/* SVG Simulated Path / Map Grid */}
                                <svg className="absolute inset-0 w-full h-full text-[#DB2956]/15" fill="none">
                                    <path d="M0,40 Q100,20 180,80 T340,30" stroke="currentColor" strokeWidth="2.5" />
                                    <circle cx="180" cy="80" r="6" fill="#DB2956" className="animate-ping" />
                                    <circle cx="180" cy="80" r="4" fill="#DB2956" />
                                </svg>
                                <span className="bg-white border border-[#E8E8E8] text-[#121212] font-sans text-[10px] px-2 py-1 rounded-md shadow-xs z-10 flex items-center">
                                    <FaMapMarkerAlt className="text-[#DB2956] mr-1" /> Tracking Live GPS
                                </span>
                            </div>
                            
                            {/* Mockup SOS Switch */}
                            <div className="bg-[#FFE4EC]/20 rounded-[16px] p-4 text-center border border-[#FFE4EC] flex flex-col items-center">
                                <div className="w-14 h-14 bg-[#DB2956] text-white rounded-full flex items-center justify-center mb-2 shadow-[0_4px_16px_rgba(219,41,86,0.3)]">
                                    <FaShieldAlt className="text-xl" />
                                </div>
                                <h4 className="font-display font-medium text-sm text-[#121212] mb-0.5">Emergency SOS</h4>
                                <p className="font-sans text-[11px] text-[#6B6B6B]">Tap and hold to broadcast instant dispatch</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white border-t border-[#E8E8E8]">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16">
                        <span className="font-display font-medium text-xs text-[#DB2956] uppercase tracking-widest block mb-2">Core Features</span>
                        <h2 className="font-display font-medium text-3xl text-[#121212] tracking-tight">Everything built for your safety</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-8 hover:shadow-[0_4px_24px_rgba(219,41,86,0.06)] transition-all">
                            <div className="w-12 h-12 bg-[#FFE4EC] rounded-full flex items-center justify-center text-[#DB2956] mb-6">
                                <FaMapMarkerAlt className="text-xl" />
                            </div>
                            <h3 className="font-display font-regular text-xl text-[#121212] mb-3">Real-Time GPS</h3>
                            <p className="font-sans text-[#6B6B6B] text-sm leading-relaxed">
                                Continuous satellite coordinate streaming shared with emergency contacts in real-time.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-8 hover:shadow-[0_4px_24px_rgba(219,41,86,0.06)] transition-all">
                            <div className="w-12 h-12 bg-[#FFE4EC] rounded-full flex items-center justify-center text-[#DB2956] mb-6">
                                <FaBell className="text-xl" />
                            </div>
                            <h3 className="font-display font-regular text-xl text-[#121212] mb-3">SOS Alerts</h3>
                            <p className="font-sans text-[#6B6B6B] text-sm leading-relaxed">
                                Instantly broadcast push-button notification alarms to active dispatch circles with one click.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-8 hover:shadow-[0_4px_24px_rgba(219,41,86,0.06)] transition-all">
                            <div className="w-12 h-12 bg-[#FFE4EC] rounded-full flex items-center justify-center text-[#DB2956] mb-6">
                                <FaVideo className="text-xl" />
                            </div>
                            <h3 className="font-display font-regular text-xl text-[#121212] mb-3">Evidence Capture</h3>
                            <p className="font-sans text-[#6B6B6B] text-sm leading-relaxed">
                                Dispatches auto-recorded 5-second video evidence logs directly to secure remote backend servers.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-8 hover:shadow-[0_4px_24px_rgba(219,41,86,0.06)] transition-all">
                            <div className="w-12 h-12 bg-[#FFE4EC] rounded-full flex items-center justify-center text-[#DB2956] mb-6">
                                <FaAddressBook className="text-xl" />
                            </div>
                            <h3 className="font-display font-regular text-xl text-[#121212] mb-3">Emergency Contacts</h3>
                            <p className="font-sans text-[#6B6B6B] text-sm leading-relaxed">
                                Establish dynamic contact profiles to target and sync critical alarm signals immediately.
                            </p>
                        </div>

                        {/* Card 5 */}
                        <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-8 hover:shadow-[0_4px_24px_rgba(219,41,86,0.06)] transition-all">
                            <div className="w-12 h-12 bg-[#FFE4EC] rounded-full flex items-center justify-center text-[#DB2956] mb-6">
                                <FaLock className="text-xl" />
                            </div>
                            <h3 className="font-display font-regular text-xl text-[#121212] mb-3">AI Risk Detection</h3>
                            <p className="font-sans text-[#6B6B6B] text-sm leading-relaxed">
                                Advanced security telemetry scans and identifies deviations, pre-triggering standby configurations.
                            </p>
                        </div>

                        {/* Card 6 */}
                        <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-8 hover:shadow-[0_4px_24px_rgba(219,41,86,0.06)] transition-all">
                            <div className="w-12 h-12 bg-[#FFE4EC] rounded-full flex items-center justify-center text-[#DB2956] mb-6">
                                <FaHistory className="text-xl" />
                            </div>
                            <h3 className="font-display font-regular text-xl text-[#121212] mb-3">Alert History</h3>
                            <p className="font-sans text-[#6B6B6B] text-sm leading-relaxed">
                                Visualizes past threat events with coordinates log mappings and email dispatch details.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-[#121212] text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16">
                        <span className="font-display font-medium text-xs text-[#DB2956] uppercase tracking-widest block mb-2">How It Works</span>
                        <h2 className="font-display font-medium text-3xl text-white tracking-tight">Three steps to full protection</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-10 h-10 bg-[#DB2956] text-white rounded-full flex items-center justify-center font-display font-medium text-base">
                                1
                            </div>
                            <h3 className="font-display font-regular text-lg text-white">Establish Target Setup</h3>
                            <p className="font-sans text-sm text-[#9CA3AF] max-w-xs leading-relaxed">
                                Input primary and secondary contact telemetry numbers to link custom alarm targets.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-10 h-10 bg-[#DB2956] text-white rounded-full flex items-center justify-center font-display font-medium text-base">
                                2
                            </div>
                            <h3 className="font-display font-regular text-lg text-white">Deploy Status Beacons</h3>
                            <p className="font-sans text-sm text-[#9CA3AF] max-w-xs leading-relaxed">
                                Run standby dashboard monitors. When risk is detected, initiate live telemetry beacons.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-10 h-10 bg-[#DB2956] text-white rounded-full flex items-center justify-center font-display font-medium text-base">
                                3
                            </div>
                            <h3 className="font-display font-regular text-lg text-white">Broadcast Alarm Uplink</h3>
                            <p className="font-sans text-sm text-[#9CA3AF] max-w-xs leading-relaxed">
                                Dispatches auto-recorded evidence and GPS pins to secure database feeds and SMS/Email contacts.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Banner */}
            <section className="bg-[#DB2956] py-16 text-white text-center">
                <div className="container mx-auto px-6 space-y-3">
                    <h2 className="font-display font-medium text-2xl md:text-3xl text-white tracking-tight">
                        Trusted by thousands. Always online.
                    </h2>
                    <p className="font-sans text-[#FFE4EC] text-base font-regular max-w-md mx-auto">
                        Delivering continuous security coverage with instant coordinate syncing.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
