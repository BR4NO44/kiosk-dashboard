'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin, Clock, Calendar, CloudSun, Wind, Droplets,
  Tv, Bus, Cpu, HardDrive, Wifi, Bell, Shield, Activity,
  Server, Lightbulb, Settings, ChevronRight, X
} from 'lucide-react';

export default function Home() {
  const [time, setTime] = useState(null);
  const [activeCam, setActiveCam] = useState('square');
  const [isCamPaused, setIsCamPaused] = useState(false);
  const [camCacheBust, setCamCacheBust] = useState(0);
  const [showRecs, setShowRecs] = useState(false);

  // Telemetria servera
  const [cpuLoad, setCpuLoad] = useState(28);
  const [ramUsage, setRamUsage] = useState(42);
  const [notes, setNotes] = useState([
    'Vyniesť smeti v utorok ráno',
    'Servisná prehliadka kotla - Piatok'
  ]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    setTime(new Date());
    setCamCacheBust(Date.now());

    const timer = setInterval(() => setTime(new Date()), 1000);
    const telemetryTimer = setInterval(() => {
      setCpuLoad(Math.floor(20 + Math.random() * 25));
      setRamUsage(Math.floor(40 + Math.random() * 5));
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(telemetryTimer);
    };
  }, []);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([...notes, newNote.trim()]);
    setNewNote('');
  };

  const removeNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 flex flex-col justify-between select-none">
      {/* HEADER */}
      <header className="flex justify-between items-center bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">Michalovce Kiosk</h1>
            <p className="text-xs text-slate-400">Slovensko | Smart City Hub</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-2xl font-mono font-bold text-indigo-400 tracking-wider">
              {time ? time.toLocaleTimeString('sk-SK') : '--:--:--'}
            </div>
            <div className="text-xs text-slate-400">
              {time ? time.toLocaleDateString('sk-SK', { weekday: 'long', day: 'numeric', month: 'long' }) : '...'}
            </div>
          </div>
          <button 
            onClick={() => setShowRecs(true)}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700"
          >
            <Lightbulb className="w-5 h-5 text-amber-400" />
          </button>
        </div>
      </header>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        {/* WEBCAM FEED */}
        <div className="md:col-span-2 bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <Tv className="w-5 h-5 text-indigo-400" />
              <h2 className="font-semibold text-sm tracking-wide">Kamerový Náhľad</h2>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveCam('square')} 
                className={`px-3 py-1 text-xs rounded-lg transition border ${activeCam === 'square' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
              >
                Námestie
              </button>
              <button 
                onClick={() => setActiveCam('sirava')} 
                className={`px-3 py-1 text-xs rounded-lg transition border ${activeCam === 'sirava' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
              >
                Šírava
              </button>
            </div>
          </div>

          <div className="relative flex-1 min-h-[220px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80 flex items-center justify-center">
            <img 
              src={activeCam === 'square' 
                ? `https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80&bust=${camCacheBust}`
                : `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80&bust=${camCacheBust}`
              }
              alt="Public Stream"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-red-600/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>LIVE FEED</span>
            </div>
          </div>
        </div>

        {/* WEATHER & TEMP */}
        <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-sm tracking-wide">Počasie</h2>
            <CloudSun className="w-5 h-5 text-amber-400" />
          </div>

          <div className="my-2 text-center">
            <div className="text-5xl font-extrabold text-white">18°C</div>
            <p className="text-xs text-slate-400 mt-1">Polojasno | Michalovce</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-800/80 text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <Wind className="w-4 h-4 text-slate-400" />
              <span>12 km/h</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Droplets className="w-4 h-4 text-indigo-400" />
              <span>Vlhkosť: 65%</span>
            </div>
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-sm tracking-wide">Stav Servera (Ubuntu)</h2>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>CPU Záťaž</span>
                <span className="text-slate-200 font-mono">{cpuLoad}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${cpuLoad}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>RAM Využitie</span>
                <span className="text-slate-200 font-mono">{ramUsage}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${ramUsage}%` }}></div>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-800">
              <span className="flex items-center space-x-1">
                <Wifi className="w-3 h-3 text-emerald-400" />
                <span>Wi-Fi Online</span>
              </span>
              <span>Uptime: 4d 12h</span>
            </div>
          </div>
        </div>

        {/* QUICK NOTES WIDGET */}
        <div className="md:col-span-2 bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-sm tracking-wide">Rýchle Poznámky</h2>
            <Bell className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="space-y-1.5 my-2 max-h-24 overflow-y-auto pr-1">
            {notes.map((note, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-300">{note}</span>
                <button onClick={() => removeNote(idx)} className="text-slate-500 hover:text-red-400">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddNote} className="flex space-x-2 mt-2">
            <input 
              type="text" 
              placeholder="Pridať poznámku..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-500">
              Pridať
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-4 text-center text-slate-500 text-[11px] flex justify-between items-center px-2">
        <span>Wall Kiosk v1.0 | Ubuntu Linux Server</span>
        <span>Local IP: 192.168.1.X</span>
      </footer>
    </div>
  );
}