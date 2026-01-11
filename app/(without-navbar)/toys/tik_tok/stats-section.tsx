"use client"
import { useEffect, useRef, useState } from "react";

interface TimeRemaining {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    remaining: number;
    percentageLived: number;
}
export function StatsSection({ birthdate, timeRemaining }: { birthdate: Date | null, timeRemaining: TimeRemaining }) {
    if (!birthdate || !timeRemaining) {
        return null;
    }
    const [isDebug, setIsDebug] = useState(false);

const audioContextRef = useRef<AudioContext | null>(null);
const audioBufferRef = useRef<AudioBuffer | null>(null);
const gainNodeRef = useRef<GainNode | null>(null);
const isPlayingRef = useRef(false);
const schedulerIdRef = useRef<number | null>(null);

// Setup: load audio buffer and keydown listener
useEffect(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0;

    audioContextRef.current = audioContext;
    gainNodeRef.current = gainNode;

    fetch("/audio/tik-tok-2.mp3")
        .then(res => res.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(buffer => {
            audioBufferRef.current = buffer;
        })
        .catch(e => console.error("Failed to load audio:", e));

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === " ") {
            e.preventDefault();
            setIsDebug(prev => !prev);
        }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
        window.removeEventListener("keydown", handleKeyDown);
        gainNode.disconnect();
        audioContext.close();
    };
}, []);

    // Playback control based on isDebug
    useEffect(() => {
    const audioContext = audioContextRef.current;
    const gainNode = gainNodeRef.current;

    if (!audioContext || !gainNode) return;

    if (isDebug && birthdate) {
        isPlayingRef.current = true;

        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        const CLIP_DURATION = 2; // seconds
        const SCHEDULE_AHEAD = 0.1; // schedule 100ms ahead to avoid gaps

        const scheduler = () => {
            if (!isPlayingRef.current || !audioBufferRef.current) return;

            const now = Date.now();
            const msUntilNextSecond = 1000 - (now % 1000);
            
            // Schedule if we're within SCHEDULE_AHEAD of the next second boundary
            // or if this is the first call (schedule immediately for next boundary)
            const startTime = audioContext.currentTime + (msUntilNextSecond / 1000);

            const bufferSource = audioContext.createBufferSource();
            bufferSource.buffer = audioBufferRef.current;
            bufferSource.connect(gainNode);
            bufferSource.start(startTime);

            // Schedule the next tick to run shortly before this clip ends
            // Clip is 2 seconds, so schedule next one in ~2 seconds
            const nextScheduleDelay = (msUntilNextSecond + (CLIP_DURATION * 1000) - (SCHEDULE_AHEAD * 1000));
            
            schedulerIdRef.current = window.setTimeout(() => {
                if (isPlayingRef.current) {
                    scheduler();
                }
            }, nextScheduleDelay);
        };

        // Wait for buffer to load if not ready yet
        const startPlayback = () => {
            if (audioBufferRef.current) {
                scheduler();
                fadeGain(gainNode, true);
            } else {
                const checkBuffer = setInterval(() => {
                    if (audioBufferRef.current) {
                        clearInterval(checkBuffer);
                        scheduler();
                        fadeGain(gainNode, true);
                    }
                }, 50);
                return () => clearInterval(checkBuffer);
            }
        };

        startPlayback();

    } else {
        isPlayingRef.current = false;
        
        if (schedulerIdRef.current) {
            clearTimeout(schedulerIdRef.current);
            schedulerIdRef.current = null;
        }
        
        fadeGain(gainNode, false);
    }

    return () => {
        if (schedulerIdRef.current) {
            clearTimeout(schedulerIdRef.current);
            schedulerIdRef.current = null;
        }
    };
}, [isDebug, birthdate]);

const fadeGain = (
    gainNode: GainNode,
    fadeIn: boolean,
    targetVolume: number = 0.3,
    fadeDuration: number = 2000
) => {
    const startVolume = gainNode.gain.value;
    const endVolume = fadeIn ? targetVolume : 0;
    const startTime = Date.now();

    const tick = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed < fadeDuration) {
            const progress = elapsed / fadeDuration;
            gainNode.gain.value = startVolume + (endVolume - startVolume) * progress;
            requestAnimationFrame(tick);
        } else {
            gainNode.gain.value = endVolume;
        }
    };
    tick();
};

    const statsItems = [
        { label: "years", value: timeRemaining.years, colSpan: '' },
        { label: "months", value: timeRemaining.months, colSpan: '' },
        { label: "weeks", value: timeRemaining.weeks, colSpan: '' },
        { label: "days", value: timeRemaining.days, colSpan: '' },
        { label: "hours", value: timeRemaining.hours, colSpan: 'md:col-span-2' },
        { label: "min", value: timeRemaining.minutes, colSpan: 'md:col-span-2' },
        { label: "sec", value: timeRemaining.seconds, colSpan: 'md:col-span-2' },
        { label: "ms", value: timeRemaining.milliseconds, colSpan: 'md:col-span-2' },
        { label: "life", value: timeRemaining.percentageLived.toFixed(7), colSpan: 'md:col-span-2' },
    ]
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {birthdate && timeRemaining && (
                <div className="w-full max-w-4xl mx-auto space-y-24 font-mono">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-16">
                        {statsItems.map((item, index) => {
                            return (
                                <div
                                    key={item.label}
                                    className={`flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards ${item.colSpan}`}
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        animationDuration: "700ms"
                                    }}
                                >
                                    <span className="text-xs text-muted-foreground/40 lowercase tracking-widest">
                                        {item.label}{item.label === 'life' ? '_lived' : '_rem'}
                                    </span>
                                    <span className="text-4xl md:text-5xl font-light tracking-tighter text-foreground">
                                        {item.value.toLocaleString()}
                                        {item.label === 'life' ? '%' : ''}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
            <div className="text-muted-foreground font-mono text-sm w-full flex items-center justify-center pt-12 animate-in fade-in duration-500 slide-in-from-bottom-4 fill-mode-backwards"
                style={{animationDuration:"700ms", animationDelay:"800ms"}}>press space to toggle audio</div>
        </div>
    )
}