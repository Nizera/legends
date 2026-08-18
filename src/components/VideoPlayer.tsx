"use client";

import { useRef, useState, useEffect } from "react";
import Portal from "./Portal";

export default function VideoPlayer() {
  const thumbVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [modalOpen, setModalOpen] = useState(false);
  const [watched, setWatched] = useState(false);
  const [savedTime, setSavedTime] = useState(0);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const tick = () => {
    const v = modalVideoRef.current;
    if (v && v.duration) {
      setProgress((v.currentTime / v.duration) * 100);
      setCurrentTime(formatTime(v.currentTime));
      setSavedTime(v.currentTime);
      if (v.currentTime / v.duration >= 0.95) setWatched(true);
    }
    animFrameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (modalOpen) {
      animFrameRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [modalOpen, tick]);

  useEffect(() => {
    const v = modalVideoRef.current;
    if (!v || !modalOpen) return;

    let lastAllowedTime = 0;

    const onLoaded = () => setDuration(formatTime(v.duration));
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setWatched(true);
      setTimeout(() => setModalOpen(false), 800);
    };
    const onTimeUpdate = () => {
      if (v.currentTime > lastAllowedTime + 0.5) {
        v.currentTime = lastAllowedTime;
      }
      lastAllowedTime = v.currentTime;
    };

    const blockKeys = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowLeft", " ", "k", "j"].includes(e.key)) {
        e.preventDefault();
        if (e.key === " ") togglePlay();
      }
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    v.addEventListener("timeupdate", onTimeUpdate);
    window.addEventListener("keydown", blockKeys);

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("timeupdate", onTimeUpdate);
      window.removeEventListener("keydown", blockKeys);
    };
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [modalOpen]);

  const openModal = () => {
    setModalOpen(true);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
    setDuration("0:00");
    setTimeout(() => {
      const v = modalVideoRef.current;
      if (v) {
        v.currentTime = savedTime;
        v.play();
      }
    }, 300);
  };

  const closeModal = () => {
    const v = modalVideoRef.current;
    if (v) v.pause();
    setModalOpen(false);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    const v = modalVideoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const restart = () => {
    const v = modalVideoRef.current;
    if (!v) return;
    v.currentTime = 0;
    setSavedTime(0);
    v.play();
  };

  const toggleMute = () => {
    const v = modalVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <>
      {/* Thumbnail card */}
      <div
        className="relative w-full max-w-[400px] mx-auto rounded-2xl overflow-hidden bg-black border border-gold-500/30 shadow-[0_0_60px_rgba(0,0,0,0.5)] cursor-pointer group"
        onClick={openModal}
      >
        <video
          ref={thumbVideoRef}
          src="/vsl.mp4"
          className="w-full aspect-[9/16] max-h-[440px] object-cover blur-md scale-110 pointer-events-none"
          playsInline
          muted
          preload="metadata"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
          <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-gold-300 to-gold-700 flex items-center justify-center animate-glow group-hover:scale-110 transition-transform shadow-lg mb-3">
            {watched ? (
              <svg className="w-7 h-7 text-ink" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" /></svg>
            ) : (
              <div className="w-0 h-0 border-t-[11px] border-t-transparent border-b-[11px] border-b-transparent border-l-[19px] border-l-ink ml-2" />
            )}
          </div>
          <p className="text-[13px] text-gold-300 font-bold">
            {watched && savedTime > 0 ? "▸ Continuar assistindo" : "▸ Assista antes de entrar"}
          </p>
          <p className="text-[11px] text-[#7d9c88] mt-1">1:08 de duração</p>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <Portal>
          <div
            className="modal-overlay"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <div className="relative w-full max-w-[500px] bg-black rounded-2xl overflow-hidden border border-gold-500/20 shadow-[0_0_80px_rgba(228,185,78,0.15)]">
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-cream hover:text-gold-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video */}
              <video
                ref={modalVideoRef}
                src="/vsl.mp4"
                className="w-full aspect-[9/16] max-h-[80vh] object-contain bg-black cursor-pointer"
                playsInline
                muted={isMuted}
                onClick={togglePlay}
              />

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pt-8 pb-4">
                {/* Progress - no click, no seek */}
                <div className="w-full h-1.5 bg-white/20 rounded-full mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-gold-300 to-gold-700 rounded-full relative"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause */}
                    <button onClick={togglePlay} className="text-cream hover:text-gold-300 transition-colors">
                      {isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      )}
                    </button>
                    {/* Restart */}
                    <button onClick={restart} className="text-cream hover:text-gold-300 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" /></svg>
                    </button>
                    {/* Mute */}
                    <button onClick={toggleMute} className="text-cream hover:text-gold-300 transition-colors">
                      {isMuted ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                      )}
                    </button>
                  </div>
                  <span className="text-xs text-cream/70 font-mono">{currentTime} / {duration}</span>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
