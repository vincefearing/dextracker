'use client';
import { useState } from 'react'
import NewPokedexModal from "@/components/NewPokedexModal";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    // Main container: Using flex-grow makes it fill the vertical space correctly.
    <div className="w-full flex-grow flex items-center justify-center p-8">
      
      {/* Content Wrapper: Constrains the width and lays out the items vertically. */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-8">
        
        {/* Placeholder Pokédex Card */}
        <div className="w-full bg-brand-dark rounded-lg p-4 border border-brand-border">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-brand-blue">My regional living dex</h2>
            <span className="text-sm text-zinc-400">0/900 Caught</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-zinc-700 rounded-full h-6">
            <div 
              className="bg-brand-yellow h-6 rounded-full flex items-center justify-center text-xs font-bold text-zinc-900" 
              style={{ width: '20%' }}
            >
              20%
            </div>
          </div>
        </div>

        {/* New Pokédex Button */}
        <button onClick={() => setIsModalOpen(true)} className="w-56 bg-brand-red text-brand-light font-bold rounded-md py-3 cursor-pointer hover:brightness-110 transition-transform active:scale-95">
          NEW POKEDEX
        </button>

      </div>
      {isModalOpen && <NewPokedexModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
