import { useCallback, useRef, useState, useEffect } from 'react';

// Generate a subtle click sound using Web Audio API
const generateClickSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800; // High frequency for a "tick"
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Very quiet
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);

    return audioContext;
};

const useSound = () => {
    const [isMuted, setIsMuted] = useState(() => {
        // Check localStorage for user preference
        const saved = localStorage.getItem('soundEnabled');
        return saved === 'false'; // Default to unmuted
    });

    const audioContextRef = useRef(null);

    useEffect(() => {
        // Save preference to localStorage
        localStorage.setItem('soundEnabled', !isMuted);
    }, [isMuted]);

    const playClick = useCallback(() => {
        if (isMuted) return;

        try {
            // Clean up previous context if exists
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }

            audioContextRef.current = generateClickSound();
        } catch (error) {
            console.warn('Audio playback failed:', error);
        }
    }, [isMuted]);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev);
    }, []);

    return {
        playClick,
        isMuted,
        toggleMute
    };
};

export default useSound;
