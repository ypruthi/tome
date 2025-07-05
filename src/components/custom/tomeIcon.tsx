import { BookOpen, Sparkles } from "lucide-react";

export function TomeIcon() {
  return (
    <div className="relative w-10 h-10 group transition-transform duration-200 hover:scale-105">
      {/* Glowing background on hover */}
      <div className="absolute inset-0 rounded-full bg-purple-300 opacity-20 blur-sm transition-all duration-300 group-hover:opacity-50 group-hover:blur-md" />

      {/* BookOpen Icon */}
      <BookOpen className="relative z-10 w-10 h-10 text-indigo-600 drop-shadow-md group-hover:brightness-125 group-hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.6)]" />

      {/* Sparkles
      <Sparkles className="absolute z-20 -top-1 -right-1 w-3 h-3 text-yellow-400" />
      <Sparkles className="absolute z-20 -top-1 left-1 w-2.5 h-2.5 text-yellow-400 rotate-12" />
      <Sparkles className="absolute z-20 -bottom-1 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 text-yellow-400 rotate-45" />
    */}
    </div>
  );
}
