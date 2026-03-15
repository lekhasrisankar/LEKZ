import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/ThemeContext";
import ReactNiceAvatar from "react-nice-avatar";

export type AvatarState = "idle" | "walking" | "thinking" | "jumping" | "celebrating";

export function Avatar({ state, className }: { state: AvatarState; className?: string }) {
  const { avatarConfig } = useTheme();

  const animations = {
    idle: {
      y: [0, -5, 0],
      rotate: [0, 2, -2, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
    walking: {
      x: [-10, 10, -10],
      y: [0, -10, 0, -10, 0],
      rotate: [-5, 5, -5],
      transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
    },
    thinking: {
      rotate: [0, -10, 0, 10, 0],
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
    jumping: {
      y: [0, -60, 0, -30, 0],
      scaleY: [1, 1.3, 0.7, 1.1, 1],
      scaleX: [1, 0.7, 1.3, 0.9, 1],
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
    },
    celebrating: {
      y: [0, -35, 0, -15, 0],
      rotate: [0, 15, -15, 10, -10, 0],
      scale: [1, 1.2, 1.1, 1.2, 1],
      transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className={cn("relative flex items-center justify-center w-32 h-32", className)}>
      <motion.div
        animate={animations[state]}
        className="w-full h-full drop-shadow-xl z-10"
        style={{ originY: 1 }}
      >
        <ReactNiceAvatar className="w-full h-full" {...avatarConfig} />
      </motion.div>
      {state === "thinking" && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="absolute -top-4 -right-4 text-3xl z-20"
        >
          ❓
        </motion.div>
      )}
      {state === "celebrating" && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: [0, (Math.random() - 0.5) * 120],
                y: [0, (Math.random() - 0.5) * 120 - 40],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
              className="absolute text-2xl z-0"
            >
              {["✨", "🎉", "🌟", "🎊", "⭐", "🎈"][i]}
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
}
