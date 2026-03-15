import React, { useState } from "react";
import { motion } from "motion/react";
import { Avatar } from "./Avatar";

export function LoginScreen({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (email.includes("@") && email.endsWith(".edu")) {
      onLogin(email);
    } else {
      setError("Please use your official college email ID (.edu)");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center"
      >
        <Avatar state="idle" className="mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-indigo-900 mb-2">LEKZ</h1>
        <p className="text-slate-600 mb-8">Gamified Semester Revision</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              required
              placeholder="College Email ID (e.g., student@college.edu)"
              className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-indigo-500'} focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
            />
            {error && (
              <p className="text-rose-500 text-sm mt-2 text-left">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all active:scale-95"
          >
            Start Playing
          </button>
        </form>
      </motion.div>
    </div>
  );
}
