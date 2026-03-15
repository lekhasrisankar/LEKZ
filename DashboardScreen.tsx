import { useState } from "react";
import { motion } from "motion/react";
import { Avatar } from "./Avatar";
import { Building2, ChevronRight, Edit2, Search } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

const DEPARTMENTS = [
  { id: "ECE", name: "Electronics & Communication", code: "ECE", color: "bg-emerald-100 text-emerald-700" },
  { id: "CSE", name: "Computer Science", code: "CSE", color: "bg-blue-100 text-blue-700" },
  { id: "EEE", name: "Electrical & Electronics", code: "EEE", color: "bg-amber-100 text-amber-700" },
  { id: "IT", name: "Information Technology", code: "IT", color: "bg-purple-100 text-purple-700" },
  { id: "MECH", name: "Mechanical Engineering", code: "MECH", color: "bg-orange-100 text-orange-700" },
  { id: "CIVIL", name: "Civil Engineering", code: "CIVIL", color: "bg-stone-100 text-stone-700" },
  { id: "VLSI", name: "ECE (VLSI Design)", code: "VLSI", color: "bg-rose-100 text-rose-700" },
  { id: "ECE-C", name: "Electronics & Computer Eng.", code: "ECE-C", color: "bg-cyan-100 text-cyan-700" },
  { id: "BME", name: "Biomedical Engineering", code: "BME", color: "bg-pink-100 text-pink-700" },
];

export function DashboardScreen({ onSelectSubject }: { onSelectSubject: (subject: string) => void }) {
  const { setIsCustomizePanelOpen } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDepartments = DEPARTMENTS.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Choose Department</h1>
            <p className="text-slate-500 mt-1">Select your department to view subjects</p>
          </div>
          <div className="relative group cursor-pointer" onClick={() => setIsCustomizePanelOpen(true)}>
            <Avatar state="walking" className="w-20 h-20" />
            <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Edit2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </header>

        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search departments by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDepartments.map((dept, index) => (
            <motion.button
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectSubject(dept.id)}
              className="flex items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 text-left group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-6 ${dept.color}`}>
                <Building2 className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-400 mb-1">{dept.code}</p>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {dept.name}
                </h3>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </motion.button>
          ))}
          {filteredDepartments.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-12 bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-500 text-lg">No departments found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
