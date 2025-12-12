"use client";

import { motion, AnimatePresence } from "framer-motion";

interface StepperProps {
  step: number;
  onChange: (step: number) => void;
}

export default function Stepper({ step, onChange }: StepperProps) {
  const steps = [
    { id: 1, label: "Personal" },
    { id: 2, label: "Preferences" },
    { id: 3, label: "Review" },
  ];

  const total = steps.length - 1;
  const percent = total > 0 ? ((step - 1) / total) * 100 : 0;

  return (
    <div className="relative w-full flex flex-col items-center bg-gray-50 rounded-xl mb-8">
      <div className="absolute top-1/2 -translate-y-1/2 left-[70px] right-[70px] h-1 bg-gray-200 z-0 rounded-full" />

      <motion.div
        className="absolute top-1/2 left-0 h-1 bg-green-600 -translate-y-1/2 z-0 rounded-full"
        initial={false}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.28 }}
      />

      <div className="flex justify-between items-center w-full relative z-10" role="list">
        {steps.map((s) => {
          const isDone = s.id < step;
          const isActive = s.id === step;

          return (
            <div key={s.id} className="flex flex-col items-center bg-gray-50" role="listitem">
              <button
                onClick={() => onChange(s.id)}
                aria-current={isActive ? "step" : undefined}
                className="flex flex-col items-center gap-2 focus:outline-none"
                aria-label={`Go to step ${s.label}`}
                aria-describedby={`step-${s.id}-label`}
              >
                <AnimatePresence mode="wait">
                  {isDone ? (
                    <motion.div
                      key={`done-${s.id}`}
                      className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </motion.div>
                  ) : isActive ? (
                    <motion.div
                      key={`active-${s.id}`}
                      className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-bold"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      {s.id}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`idle-${s.id}`}
                      className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      {s.id}
                    </motion.div>
                  )}
                </AnimatePresence>

                <span
                  id={`step-${s.id}-label`}
                  className={`text-sm font-medium text-slate-600 ${
                    isActive
                      ? "text-green-700 font-semibold"
                      : isDone
                      ? "text-gray-700"
                      : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
