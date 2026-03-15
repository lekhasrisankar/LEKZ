import React, { useState } from "react";
import { motion } from "motion/react";
import { Avatar } from "./Avatar";
import { useTheme } from "@/lib/ThemeContext";
import { Edit2 } from "lucide-react";

export interface ProfileData {
  academicYear: string;
  studyYear: string;
  department: string;
  section: string;
  semester: string;
}

export function ProfileScreen({ onComplete }: { onComplete: (data: ProfileData) => void }) {
  const { setIsCustomizePanelOpen } = useTheme();
  const [data, setData] = useState<ProfileData>({
    academicYear: "2023-2024",
    studyYear: "3rd Year",
    department: "Computer Science",
    section: "A",
    semester: "Semester 5",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full"
      >
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="relative">
            <Avatar state="thinking" className="w-24 h-24" />
            <button
              type="button"
              onClick={() => setIsCustomizePanelOpen(true)}
              className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors"
              title="Edit Avatar"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-indigo-900">Setup Profile</h2>
            <p className="text-sm text-slate-500">Let's get your details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Academic Year</label>
            <input 
              type="text" 
              name="academicYear" 
              value={data.academicYear} 
              onChange={handleChange} 
              placeholder="e.g. 2023-2024"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Study Year</label>
            <select name="studyYear" value={data.studyYear} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Department</label>
            <select name="department" value={data.department} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Electronics</option>
              <option>Mechanical</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Section</label>
              <select name="section" value={data.section} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Semester</label>
              <select name="semester" value={data.semester} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
                <option>Semester 1</option>
                <option>Semester 2</option>
                <option>Semester 3</option>
                <option>Semester 4</option>
                <option>Semester 5</option>
                <option>Semester 6</option>
                <option>Semester 7</option>
                <option>Semester 8</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all active:scale-95"
          >
            Continue
          </button>
        </form>
      </motion.div>
    </div>
  );
}
