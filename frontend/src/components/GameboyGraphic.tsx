export default function GameboyGraphic() {
  return (
    // Main body
    <div className="w-full h-full bg-brand-red p-6 flex items-center justify-center">
      {/* Content wrapper */}
      <div className="w-full max-w-sm flex flex-col gap-12">
        {/* Screen Area */}
        <div className="bg-brand-dark rounded-3xl flex flex-col items-center justify-center gap-8 p-8">
          {/* Inner Screen */}
          <div className="bg-zinc-700 rounded-sm aspect-square w-9/12"></div>
          <p className="text-center font-bold text-lg">dextracker</p>
        </div>

        {/* Controls Container */}
        <div className="w-full flex flex-col items-center gap-10">
          {/* Speaker shape */}
          <div className="h-6 min-[386px]:h-10 w-1/3 min-[386px]:w-1/4 bg-black/20 rounded-full"></div>

          {/* Top row of controls */}
          <div className="w-full flex justify-between items-center">
            {/* D-pad */}
            <div className="grid place-items-center">
              <div className="w-24 h-8 min-[386px]:w-28 min-[386px]:h-10 bg-brand-dark rounded-md col-start-1 row-start-1"></div>
              <div className="w-8 h-24 min-[386px]:w-10 min-[386px]:h-28 bg-brand-dark rounded-md col-start-1 row-start-1"></div>
            </div>

            {/* A and B Buttons */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 min-[386px]:w-16 min-[386px]:h-16 bg-brand-dark rounded-full mt-16"></div>
              <div className="w-12 h-12 min-[386px]:w-16 min-[386px]:h-16 bg-brand-dark rounded-full"></div>
            </div>
          </div>

          {/* Bottom row of controls */}
          <div className="flex justify-center items-center gap-8">
            <div className="h-4 w-12 bg-brand-dark rounded-full"></div>
            <div className="h-4 w-12 bg-brand-dark rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
