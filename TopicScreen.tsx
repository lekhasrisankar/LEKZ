import { useState } from "react";
import { motion } from "motion/react";
import { Avatar } from "./Avatar";
import { ChevronLeft, List, Play } from "lucide-react";

const UNITS = [
  {
    id: "u1",
    name: "Unit 1",
    topics: ["Topic 1", "Topic 2", "Topic 3"],
  },
  {
    id: "u2",
    name: "Unit 2",
    topics: ["Topic 1", "Topic 2", "Topic 3"],
  },
  {
    id: "u3",
    name: "Unit 3",
    topics: ["Topic 1", "Topic 2", "Topic 3"],
  },
  {
    id: "u4",
    name: "Unit 4",
    topics: ["Topic 1", "Topic 2", "Topic 3"],
  },
  {
    id: "u5",
    name: "Unit 5",
    topics: ["Topic 1", "Topic 2", "Topic 3"],
  },
];

export function TopicScreen({
  subject,
  onBack,
  onStartQuiz,
}: {
  subject: string;
  onBack: () => void;
  onStartQuiz: (topic: string) => void;
}) {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-3 bg-white rounded-full shadow-sm hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{subject}</h1>
              <p className="text-slate-500 mt-1">Select a unit and topic</p>
            </div>
          </div>
          <Avatar state="thinking" className="w-20 h-20" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Units</h2>
            {UNITS.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnit(unit.id)}
                className={`w-full text-left p-5 rounded-2xl transition-all border ${
                  selectedUnit === unit.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <List className={`w-5 h-5 ${selectedUnit === unit.id ? "text-indigo-200" : "text-slate-400"}`} />
                  <span className="font-semibold">{unit.name}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="md:col-span-2">
            {selectedUnit ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={selectedUnit}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
              >
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Topics</h2>
                <div className="space-y-4">
                  {UNITS.find((u) => u.id === selectedUnit)?.topics.map((topic, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={topic}
                      className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors group border border-transparent hover:border-indigo-100"
                    >
                      <span className="text-lg font-medium text-slate-700 group-hover:text-indigo-900">
                        {topic}
                      </span>
                      <button
                        onClick={() => onStartQuiz(`${UNITS.find((u) => u.id === selectedUnit)?.name} - ${topic}`)}
                        className="flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:text-white"
                      >
                        <span>Start Quiz</span>
                        <Play className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 p-12 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                <Avatar state="idle" className="w-24 h-24 opacity-50 mb-4" />
                <p className="text-lg">Select a unit from the left to view topics.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
