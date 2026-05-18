import React from 'react';
import { FaExclamationTriangle, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';

const AlertHistory = ({ alerts }) => {
    if (!alerts || alerts.length === 0) {
        return (
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-12 text-center shadow-[0_2px_16px_rgba(219,41,86,0.02)]">
                <p className="text-[#6B6B6B] font-sans text-sm">No telemetry logs found. All systems nominal.</p>
            </div>
        );
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="space-y-4">
            {alerts.map((alert, index) => {
                let borderClass = 'border-l-[4px] border-l-[#10B981]';
                let badgeClass = 'bg-[#D1FAE5] text-[#065F46]';
                let label = 'Low Risk';

                if (alert.risk_level === 'high risk') {
                    borderClass = 'border-l-[4px] border-l-[#DB2956]';
                    badgeClass = 'bg-[#FFE4EC] text-[#DB2956]';
                    label = 'High Risk';
                } else if (alert.risk_level === 'risky') {
                    borderClass = 'border-l-[4px] border-l-[#F59E0B]';
                    badgeClass = 'bg-[#FEF3C7] text-[#B45309]';
                    label = 'Medium Risk';
                }

                // Construct Google Maps coordinates link if lat/lng are set
                const lat = alert.latitude !== undefined ? alert.latitude : (alert.location?.latitude ?? 0);
                const lng = alert.longitude !== undefined ? alert.longitude : (alert.location?.longitude ?? 0);
                const hasCoordinates = lat !== 0 || lng !== 0;
                const mapsUrl = hasCoordinates 
                    ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
                    : null;

                return (
                    <div 
                        key={alert._id || index} 
                        className={`bg-white border border-[#E8E8E8] rounded-[16px] p-5 shadow-[0_2px_16px_rgba(219,41,86,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-[0_4px_24px_rgba(219,41,86,0.05)] ${borderClass}`}
                    >
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                                <span className={`font-display font-medium text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badgeClass}`}>
                                    {label}
                                </span>
                                <span className="font-sans text-[11px] text-[#6B6B6B] flex items-center">
                                    <FaCalendarAlt className="mr-1 text-[10px]" />
                                    {new Date(alert.timestamp).toLocaleString()}
                                </span>
                            </div>
                            
                            {hasCoordinates ? (
                                <a 
                                    href={mapsUrl} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="font-sans text-xs text-[#DB2956] hover:underline flex items-center space-x-1"
                                >
                                    <FaMapMarkerAlt className="text-xs" />
                                    <span>GPS: {lat.toFixed(5)}, {lng.toFixed(5)} — View on Map</span>
                                </a>
                            ) : (
                                <span className="font-sans text-xs text-[#6B6B6B] flex items-center space-x-1">
                                    <FaMapMarkerAlt className="text-xs text-[#E8E8E8]" />
                                    <span>GPS: Signals Unavailable</span>
                                </span>
                            )}
                        </div>

                        {/* Action Chips */}
                        <div className="flex flex-wrap gap-1.5 items-center">
                            {alert.actions_taken && alert.actions_taken.length > 0 ? (
                                alert.actions_taken.map((action, aIdx) => (
                                    <div 
                                        key={aIdx} 
                                        className="bg-[#F5F5F5] border border-[#E8E8E8]/40 rounded-full text-[10px] font-sans font-medium text-[#6B6B6B] px-2.5 py-1 flex items-center uppercase tracking-wide"
                                    >
                                        <FaEnvelope className="mr-1 text-[9px] text-[#DB2956]" />
                                        {action}
                                    </div>
                                ))
                            ) : (
                                <div className="bg-[#F5F5F5] rounded-full text-[10px] font-sans text-[#6B6B6B] px-2.5 py-1 uppercase tracking-wide">
                                    Broadcast Confirmed
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AlertHistory;
