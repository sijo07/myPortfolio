import React from "react";
import { motion } from "framer-motion";
import { AnimatedUnderline } from "./index";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("System Failure Detected:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
                    {/* Background grid effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(107,33,168,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(107,33,168,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="z-10 max-w-2xl w-full bg-white/5 backdrop-blur-md border border-red-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(220,38,38,0.2)]"
                    >
                        <div className="text-red-500 text-6xl mb-6 animate-pulse">
                            ⚠️
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wider font-mono">
                            System Failure
                            <AnimatedUnderline />
                        </h1>

                        <div className="bg-black/50 p-4 rounded-lg border border-red-900/50 mb-8 font-mono text-left">
                            <p className="text-red-400 text-sm mb-2"> &gt; ERROR_CODE: CRITICAL_Process_Terminated</p>
                            <p className="text-gray-400 text-xs break-all">
                                {this.state.error?.toString() || "Unknown error occurred"}
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={this.handleReload}
                            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all hover:shadow-[0_0_40px_rgba(220,38,38,0.7)]"
                        >
                            Reboot System
                        </motion.button>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
