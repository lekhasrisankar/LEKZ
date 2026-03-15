import React from "react";
import { Star, Zap, Flame } from "lucide-react";

export type FrameType = "Blast Topper" | "Cooler Player" | "Rising Star" | "Good Effort" | string;

export function FrameOverlay({ frameName, score, total }: { frameName: FrameType; score?: number; total?: number }) {
  if (frameName === "Blast Topper") {
    return (
      <div className="absolute inset-0 pointer-events-none border-[8px] border-amber-400 shadow-[inset_0_0_20px_rgba(251,191,36,0.8)]">
        <div className="absolute -top-3 -left-3 text-amber-500 bg-white rounded-full p-1 shadow-md">
          <Flame className="w-6 h-6 fill-amber-500" />
        </div>
        <div className="absolute -bottom-3 -right-3 text-amber-500 bg-white rounded-full p-1 shadow-md">
          <Flame className="w-6 h-6 fill-amber-500" />
        </div>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
          {frameName}
        </div>
        {score !== undefined && total !== undefined && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-amber-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
            Score: {score}/{total}
          </div>
        )}
      </div>
    );
  }

  if (frameName === "Cooler Player") {
    return (
      <div className="absolute inset-0 pointer-events-none border-[8px] border-blue-400 shadow-[inset_0_0_20px_rgba(96,165,250,0.8)]">
        <div className="absolute -top-3 -right-3 text-blue-500 bg-white rounded-full p-1 shadow-md">
          <Zap className="w-6 h-6 fill-blue-500" />
        </div>
        <div className="absolute -bottom-3 -left-3 text-blue-500 bg-white rounded-full p-1 shadow-md">
          <Zap className="w-6 h-6 fill-blue-500" />
        </div>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
          {frameName}
        </div>
        {score !== undefined && total !== undefined && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
            Score: {score}/{total}
          </div>
        )}
      </div>
    );
  }

  if (frameName === "Rising Star") {
    return (
      <div className="absolute inset-0 pointer-events-none border-[8px] border-emerald-400 shadow-[inset_0_0_20px_rgba(52,211,153,0.5)]">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-emerald-500 bg-white rounded-full p-1 shadow-md">
          <Star className="w-6 h-6 fill-emerald-500" />
        </div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
          {frameName}
        </div>
        {score !== undefined && total !== undefined && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
            Score: {score}/{total}
          </div>
        )}
      </div>
    );
  }

  // Default
  return (
    <div className="absolute inset-0 pointer-events-none border-[8px] border-slate-300">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
        {frameName}
      </div>
      {score !== undefined && total !== undefined && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-slate-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
          Score: {score}/{total}
        </div>
      )}
    </div>
  );
}
