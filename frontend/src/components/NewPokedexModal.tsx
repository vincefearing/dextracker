"use client";
import { useState } from "react";
export default function NewPokedexModal({ onClose }: { onClose: () => void }) {
  const [pokedexName, setPokedexName] = useState("Pokédex");
  const [selectedVersion, setSelectedVersion] = useState("Red");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
        name: pokedexName,
        version: selectedVersion,
    });
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-6"
    >
      {/* Content wrapper */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-brand-black-hl rounded-md p-4 border border-brand-grey w-full max-w-lg flex flex-col gap-6 items-center p-10"
      >
        <h2 className="text-2xl font-bold text-center text-brand-blue">
          New Pokédex
        </h2>
        {/* Form */}
        <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="pokedex-name"
              className="text-sm font-semibold text-brand-light"
            >
              NAME
            </label>
            <input
              id="pokedex-name"
              type="text"
              className="bg-brand-dark border border-brand-grey-hl p-2 text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-blue py-2 appearance-none"
              value={pokedexName}
              onChange={(e) => setPokedexName(e.target.value)}
            />
          </div>
          {/* Version selection */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="pokedex-version"
              className="text-sm font-semibold text-brand-light"
            >
              VERSION
            </label>
            <div className="relative w-full">
              <select
                id="pokedex-version"
                className="w-full bg-brand-dark border border-brand-grey-hl p-2 text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-blue py-2 appearance-none cursor-pointer"
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
              >
                <option>Red</option>
                <option>Blue</option>
                <option>Yellow</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-grey">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex flex-col items-center gap-8 mt-4">
            <button
              type="submit"
              className="w-56 bg-brand-red text-brand-light font-bold rounded-md py-3 cursor-pointer hover:brightness-110 transition-transform active:scale-95"
            >
              Create Pokédex
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-brand-blue hover:text-brand-light transition-colors cursor-pointer underline"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
