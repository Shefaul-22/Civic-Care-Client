import React, {  useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
import { IoSearchOutline, IoLocationSharp, IoArrowForwardOutline } from 'react-icons/io5';
import L from 'leaflet';
import ContactUs from './ContactUs';

// Custom Marker Icon (Pink Branding)
const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

const ServiceCenters = () => {
    const serviceCenterData = useLoaderData();
    const [searchText, setSearchText] = useState('');
    const mapRef = useRef(null);

    const defaultCenter = [23.6850, 90.3563];
    const getInitialZoom = () => (window.innerWidth >= 640 ? 8 : 7);

    // Dynamic Fly to Location
    const handleFlyTo = (lat, lng, districtName) => {
        setSearchText(districtName);
        if (mapRef.current) {
            mapRef.current.flyTo([lat, lng], 14, {
                duration: 2,
                easeLinearity: 0.25
            });
        }
    };

    const filteredDistricts = serviceCenterData.filter(c =>
        c.district.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="bg-base-100 min-h-screen transition-colors duration-300">
            {/* Header Section */}

            <div>
                <ContactUs></ContactUs>
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 text-center space-y-4">
                <span className="text-[#fa0bd2] font-black tracking-[0.3em] uppercase text-xs">Coverage Network</span>
                <h2 className="text-3xl md:text-5xl font-black text-base-content leading-tight">
                    Service Centers in <span className="text-[#fa0bd2]">64 Districts</span>
                </h2>
                <p className="text-base-content/60 max-w-2xl mx-auto font-medium">
                    Locate your nearest CivicCare hub. We are committed to reaching every corner of the country to ensure your community stays safe and functional.
                </p>
            </div>

            {/* Search & Map Layout */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-base-200/30 p-4 rounded-[2.5rem] border border-base-300 shadow-inner">

                    {/* Sidebar: Search & List */}
                    <div className="lg:col-span-1 space-y-4 h-[600px] flex flex-col">
                        <div className="relative group">
                            <label className="input input-bordered flex items-center gap-3 bg-base-100 rounded-2xl border-base-300 focus-within:border-[#fa0bd2] transition-all shadow-sm">
                                <IoSearchOutline className="text-xl text-base-content/40 group-focus-within:text-[#fa0bd2]" />
                                <input
                                    type="search"
                                    className="grow font-bold text-sm"
                                    placeholder="Find your district..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </label>
                        </div>

                        {/* District List Card */}
                        <div className="flex-grow overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                            {filteredDistricts.length > 0 ? (
                                filteredDistricts.map((d, i) => (
                                    <div
                                        key={i}
                                        onClick={() => handleFlyTo(d.latitude, d.longitude, d.district)}
                                        className="p-4 bg-base-100 rounded-2xl border border-base-300 hover:border-[#fa0bd2] cursor-pointer transition-all hover:shadow-md group flex justify-between items-center"
                                    >
                                        <div>
                                            <h4 className="font-black text-base-content group-hover:text-[#fa0bd2]">{d.district}</h4>
                                            <p className="text-[10px] uppercase font-bold text-base-content/40 italic">View on Map</p>
                                        </div>
                                        <IoArrowForwardOutline className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-[#fa0bd2]" />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 opacity-40 font-bold">No district found</div>
                            )}
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="lg:col-span-3 relative h-[600px] rounded-[2rem] overflow-hidden border-4 border-base-100 shadow-2xl z-10">
                        <MapContainer
                            center={defaultCenter}
                            zoom={getInitialZoom()}
                            scrollWheelZoom={true}
                            className="h-full w-full"
                            ref={mapRef}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {serviceCenterData.map((center, index) => (
                                <Marker
                                    key={index}
                                    position={[center.latitude, center.longitude]}
                                    icon={customIcon}
                                >
                                    <Popup className="custom-popup">
                                        <div className="p-2">
                                            <h3 className="font-black text-[#fa0bd2] text-lg mb-1 flex items-center gap-1">
                                                <IoLocationSharp /> {center.district}
                                            </h3>
                                            <div className="h-[1px] bg-base-300 w-full my-2"></div>
                                            <p className="text-xs font-bold text-base-content/70 mb-1 uppercase tracking-tighter">Covered Areas:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {center.covered_area.map((area, idx) => (
                                                    <span key={idx} className="badge badge-sm badge-outline text-[9px] font-bold">
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #fa0bd233;
                    border-radius: 10px;
                }
                .leaflet-container {
                    filter: grayscale(0.2) contrast(1.1);
                }
                .custom-popup .leaflet-popup-content-wrapper {
                    border-radius: 1.5rem;
                    padding: 5px;
                    border: 2px solid #fa0bd222;
                }
                .leaflet-popup-tip {
                    background: white;
                }
            `}</style>
        </div>
    );
};

export default ServiceCenters;