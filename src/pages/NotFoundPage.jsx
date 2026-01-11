import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Cursor, AnimatedBackground } from "../components";
import { useState, useEffect } from "react";

const NotFoundPage = () => {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const cornerData = [
        { label: "COORDINATES", value: "ERR_REF_0x404" },
        { label: "SECTOR", value: "UNKNOWN_VOID" },
        { label: "SIGNAL", value: "0.00% LOSS" },
        { label: "SYSTEM", value: "CRITICAL_FAILURE" }
    ];

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono selection:bg-purple-500/30">
            <Cursor />
            <AnimatedBackground className="absolute inset-0 opacity-40" />

            {/* Background HUD Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #a855f7 1px, transparent 0)", backgroundSize: "40px 40px" }} />

            {/* Scanning Line */}
            <motion.div
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent z-10 shadow-[0_0_15px_rgba(168,85,247,0.8)] opacity-50"
            />

            {/* HUD Corner Data - Desktop */}
            <div className="hidden md:block absolute inset-0 pointer-events-none z-20 p-10">
                <div className="flex justify-between h-full">
                    <div className="flex flex-col justify-between">
                        {/* Top Left */}
                        <div className="border-l border-t border-purple-500/30 p-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                <span className="text-[10px] text-purple-400">TRACKING_STATUS: OFFLINE</span>
                            </div>
                            <div className="text-[10px] text-gray-500">REF: {Math.random().toString(36).substring(7).toUpperCase()}</div>
                        </div>
                        {/* Bottom Left */}
                        <div className="border-l border-b border-purple-500/30 p-4">
                            <div className="text-[10px] text-purple-600 mb-1 font-bold">TELEMETRY</div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                {cornerData.slice(0, 2).map(d => (
                                    <div key={d.label}>
                                        <div className="text-[8px] text-gray-600">{d.label}</div>
                                        <div className="text-[10px] text-gray-400">{d.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        {/* Top Right */}
                        <div className="border-r border-t border-purple-500/30 p-4 text-right">
                            <div className="text-[10px] text-purple-400 mb-2 uppercase tracking-widest">Signal Search</div>
                            <div className="flex gap-1">
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [4, Math.random() * 15 + 5, 4] }}
                                        transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }}
                                        className="w-1 bg-purple-500/40"
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Bottom Right */}
                        <div className="border-r border-b border-purple-500/30 p-4 text-right">
                            <div className="text-[10px] text-gray-500 uppercase">Archive Version</div>
                            <div className="text-[10px] text-purple-400 font-bold">X-99.SYNC.8004</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="z-10 relative flex flex-col items-center px-6"
            >
                {/* Glitched 404 */}
                <div className="relative group cursor-default">
                    <h1 className={`text-[120px] md:text-[220px] font-black leading-none select-none transition-all duration-75 ${glitch ? 'text-pink-500 translate-x-1 skew-x-12' : 'text-white'}`}>
                        404
                    </h1>
                    <h1 className={`absolute inset-0 text-[120px] md:text-[220px] font-black leading-none select-none opacity-50 mix-blend-screen transition-all duration-75 text-cyan-400 ${glitch ? '-translate-x-1 -skew-x-12' : 'translate-x-0'}`}>
                        404
                    </h1>
                    <h1 className="absolute inset-0 text-[120px] md:text-[220px] font-black leading-none select-none text-white blur-sm opacity-20">
                        404
                    </h1>
                </div>

                <div className="mt-8 text-center max-w-lg">
                    <motion.h2
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-2xl md:text-4xl font-bold text-white mb-4 uppercase tracking-[0.4em] drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    >
                        LOST IN VOID
                    </motion.h2>

                    <div className="bg-purple-500/10 border-y border-purple-500/20 py-4 mb-10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-purple-500/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest leading-relaxed px-4">
                            The coordinates you are looking for do not exist in this sector. Verify deployment path or return to base uplink.
                        </p>
                    </div>

                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(168, 85, 247, 0.2)" }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative px-10 py-4 overflow-hidden border border-purple-500/50 rounded-sm"
                        >
                            <div className="absolute inset-0 bg-purple-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            <span className="relative text-white font-bold tracking-[0.3em] uppercase text-xs z-10 flex items-center gap-3">
                                <span className="w-2 h-2 bg-purple-500 group-hover:animate-ping" />
                                Initiate Return Protocol
                            </span>
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

            {/* Terminal Overlay Small Screen */}
            <div className="md:hidden absolute bottom-6 w-full px-6 flex justify-between text-[8px] text-gray-600 uppercase tracking-tighter">
                <span>LAT: 0.0000000</span>
                <span className="text-purple-500/50 animate-pulse">Scanning Archive...</span>
                <span>LNG: 0.0000000</span>
            </div>
        </div>
    );
};

export default NotFoundPage;
