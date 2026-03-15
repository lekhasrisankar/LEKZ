import { motion } from "motion/react";
import { Avatar } from "./Avatar";
import { Crown, Medal, RefreshCw, Trophy } from "lucide-react";
import { FrameOverlay } from "./FrameOverlay";

export type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
  total: number;
  photoUrl: string;
  frameName: string;
  isCurrentUser?: boolean;
};

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Alex Johnson",
    score: 10,
    total: 10,
    photoUrl: "https://picsum.photos/seed/alex/200/200",
    frameName: "Blast Topper",
  },
  {
    id: "2",
    name: "Sam Smith",
    score: 9,
    total: 10,
    photoUrl: "https://picsum.photos/seed/sam/200/200",
    frameName: "Cooler Player",
  },
  {
    id: "3",
    name: "Jordan Lee",
    score: 8,
    total: 10,
    photoUrl: "https://picsum.photos/seed/jordan/200/200",
    frameName: "Cooler Player",
  },
  {
    id: "4",
    name: "Casey Davis",
    score: 6,
    total: 10,
    photoUrl: "https://picsum.photos/seed/casey/200/200",
    frameName: "Rising Star",
  },
];

export function LeaderboardScreen({
  currentUserEntry,
  onRestart,
}: {
  currentUserEntry: LeaderboardEntry;
  onRestart: () => void;
}) {
  // Combine mock data with current user and sort
  const allEntries = [...MOCK_LEADERBOARD, currentUserEntry].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center">
              <Trophy className="w-8 h-8 text-amber-500 mr-3" />
              Leaderboard
            </h1>
            <p className="text-slate-500 mt-1">Top performers in this topic</p>
          </div>
          <button
            onClick={onRestart}
            className="flex items-center space-x-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Top 3 Podium */}
          {allEntries.slice(0, 3).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col items-center bg-white p-6 rounded-3xl shadow-sm border ${
                entry.isCurrentUser ? "border-indigo-400 shadow-indigo-100" : "border-slate-100"
              } ${index === 0 ? "md:-mt-8 md:scale-110 z-10" : ""}`}
            >
              <div className="relative mb-4">
                <div
                  className={`w-32 h-32 rounded-lg overflow-hidden relative ${entry.photoUrl === "avatar" ? "bg-indigo-50 flex items-center justify-center" : ""}`}
                >
                  {entry.photoUrl === "avatar" ? (
                    <Avatar state="idle" className="w-24 h-24" />
                  ) : (
                    <img src={entry.photoUrl} alt={entry.name} className="w-full h-full object-cover" />
                  )}
                  <FrameOverlay frameName={entry.frameName} />
                </div>
                <div
                  className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md z-10 ${
                    index === 0 ? "bg-amber-400" : index === 1 ? "bg-slate-400" : "bg-amber-700"
                  }`}
                >
                  {index === 0 ? <Crown className="w-4 h-4" /> : index + 1}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 text-center mt-2">{entry.name}</h3>
              <div className="bg-slate-100 px-4 py-1 mt-2 rounded-full text-slate-700 font-semibold">
                {entry.score} / {entry.total}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rest of the list */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {allEntries.slice(3).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`flex items-center p-4 border-b border-slate-100 last:border-0 ${
                entry.isCurrentUser ? "bg-indigo-50" : "hover:bg-slate-50"
              } transition-colors`}
            >
              <div className="w-8 text-center font-bold text-slate-400 mr-4">{index + 4}</div>
              <div className={`w-16 h-16 rounded-lg overflow-hidden relative mr-4 ${entry.photoUrl === "avatar" ? "bg-indigo-50 flex items-center justify-center" : ""}`}>
                {entry.photoUrl === "avatar" ? (
                  <Avatar state="idle" className="w-12 h-12" />
                ) : (
                  <img src={entry.photoUrl} alt={entry.name} className="w-full h-full object-cover" />
                )}
                <FrameOverlay frameName={entry.frameName} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 flex items-center">
                  {entry.name}
                  {entry.isCurrentUser && (
                    <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">You</span>
                  )}
                </h4>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-800 text-lg">{entry.score}</div>
                <div className="text-xs text-slate-400">pts</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
