import { motion } from "motion/react";
import { Avatar } from "./Avatar";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

const SUBJECTS_BY_DEPT: Record<string, { id: string; name: string; code: string; color: string }[]> = {
  "ECE": [
    { id: "ece1", name: "Signals and Systems", code: "EC3354", color: "bg-emerald-100 text-emerald-700" },
    { id: "ece2", name: "Electronic Devices and Circuits", code: "EC3353", color: "bg-blue-100 text-blue-700" },
    { id: "ece3", name: "Digital System Design", code: "EC3352", color: "bg-purple-100 text-purple-700" },
    { id: "ece4", name: "Control Systems Engineering", code: "EC3351", color: "bg-orange-100 text-orange-700" },
  ],
  "CSE": [
    { id: "cse1", name: "Data Structures", code: "CS3301", color: "bg-emerald-100 text-emerald-700" },
    { id: "cse2", name: "Object Oriented Programming", code: "CS3391", color: "bg-blue-100 text-blue-700" },
    { id: "cse3", name: "Software Engineering", code: "CS3392", color: "bg-purple-100 text-purple-700" },
    { id: "cse4", name: "Database Management Systems", code: "CS3492", color: "bg-orange-100 text-orange-700" },
  ],
  "EEE": [
    { id: "eee1", name: "Electromagnetic Theory", code: "EE3301", color: "bg-emerald-100 text-emerald-700" },
    { id: "eee2", name: "Electrical Machines - I", code: "EE3302", color: "bg-blue-100 text-blue-700" },
    { id: "eee3", name: "Analog Electronics", code: "EE3303", color: "bg-purple-100 text-purple-700" },
    { id: "eee4", name: "Power System Analysis", code: "EE3401", color: "bg-orange-100 text-orange-700" },
  ],
  "IT": [
    { id: "it1", name: "Information Technology Essentials", code: "IT3301", color: "bg-emerald-100 text-emerald-700" },
    { id: "it2", name: "Web Technologies", code: "IT3302", color: "bg-blue-100 text-blue-700" },
    { id: "it3", name: "Computer Networks", code: "IT3303", color: "bg-purple-100 text-purple-700" },
    { id: "it4", name: "Cloud Computing", code: "IT3401", color: "bg-orange-100 text-orange-700" },
  ],
  "MECH": [
    { id: "mech1", name: "Engineering Mechanics", code: "ME3301", color: "bg-emerald-100 text-emerald-700" },
    { id: "mech2", name: "Fluid Mechanics", code: "ME3302", color: "bg-blue-100 text-blue-700" },
    { id: "mech3", name: "Thermodynamics", code: "ME3303", color: "bg-purple-100 text-purple-700" },
    { id: "mech4", name: "Manufacturing Technology", code: "ME3401", color: "bg-orange-100 text-orange-700" },
  ],
  "CIVIL": [
    { id: "civil1", name: "Mechanics of Solids", code: "CE3301", color: "bg-emerald-100 text-emerald-700" },
    { id: "civil2", name: "Fluid Mechanics", code: "CE3302", color: "bg-blue-100 text-blue-700" },
    { id: "civil3", name: "Surveying", code: "CE3303", color: "bg-purple-100 text-purple-700" },
    { id: "civil4", name: "Structural Analysis", code: "CE3401", color: "bg-orange-100 text-orange-700" },
  ],
  "VLSI": [
    { id: "vlsi1", name: "VLSI Design Methodologies", code: "VL3301", color: "bg-emerald-100 text-emerald-700" },
    { id: "vlsi2", name: "Digital CMOS VLSI Design", code: "VL3302", color: "bg-blue-100 text-blue-700" },
    { id: "vlsi3", name: "Analog IC Design", code: "VL3303", color: "bg-purple-100 text-purple-700" },
    { id: "vlsi4", name: "Testing of VLSI Circuits", code: "VL3401", color: "bg-orange-100 text-orange-700" },
  ],
  "ECE-C": [
    { id: "ecec1", name: "Computer Architecture", code: "EC3301", color: "bg-emerald-100 text-emerald-700" },
    { id: "ecec2", name: "Microprocessors and Microcontrollers", code: "EC3302", color: "bg-blue-100 text-blue-700" },
    { id: "ecec3", name: "Embedded Systems", code: "EC3303", color: "bg-purple-100 text-purple-700" },
    { id: "ecec4", name: "Internet of Things", code: "EC3401", color: "bg-orange-100 text-orange-700" },
  ],
  "BME": [
    { id: "bme1", name: "Human Anatomy and Physiology", code: "BM3301", color: "bg-emerald-100 text-emerald-700" },
    { id: "bme2", name: "Biomedical Sensors", code: "BM3302", color: "bg-blue-100 text-blue-700" },
    { id: "bme3", name: "Medical Imaging Systems", code: "BM3303", color: "bg-purple-100 text-purple-700" },
    { id: "bme4", name: "Biomechanics", code: "BM3401", color: "bg-orange-100 text-orange-700" },
  ],
};

export function SubjectScreen({
  department,
  onBack,
  onSelectSubject,
}: {
  department: string;
  onBack: () => void;
  onSelectSubject: (subject: string) => void;
}) {
  const subjects = SUBJECTS_BY_DEPT[department] || SUBJECTS_BY_DEPT["CSE"];

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
              <h1 className="text-3xl font-bold text-slate-900">{department} Subjects</h1>
              <p className="text-slate-500 mt-1">Select a subject to view units</p>
            </div>
          </div>
          <Avatar state="thinking" className="w-20 h-20" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject, index) => (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectSubject(subject.name)}
              className="flex items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 text-left group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-6 ${subject.color}`}>
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-400 mb-1">{subject.code}</p>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {subject.name}
                </h3>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
