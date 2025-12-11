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

  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <div className="flex items-center justify-between">
        {steps.map((s, i) => {
          const isDone = s.id < step;
          const isActive = s.id === step;
          const isFirst = s.id === 1;

          return (
            <div key={s.id} className="flex-1 min-w-0">
              <div className="flex items-center">

                {/* Left Connector */}
                {i > 0 && (
                  <div className="flex-1">
                    <div className="relative h-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="h-1 w-full rounded-full bg-gray-200" />
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          width:
                            step > i + 1
                              ? "100%"
                              : step === i + 1
                              ? "50%"
                              : "0%",
                        }}
                        transition={{ duration: 0.35 }}
                        className="absolute left-0 top-0 h-1 rounded-full bg-green-600"
                      />
                    </div>
                  </div>
                )}

                {/* Circle + Label (stacked) */}
                <button
                  type="button"
                  onClick={() => onChange(s.id)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isDone ? (
                        <motion.div
                          key={`done-${s.id}`}
                          className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                      ) : isActive ? (
                        <motion.div
                          key={`active-${s.id}`}
                          className="w-10 h-10 rounded-full bg-white border-2 border-green-600 flex items-center justify-center text-green-700"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          <span className="font-semibold">{s.id}</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`idle-${s.id}`}
                          className={`w-10 h-10 rounded-full flex items-center justify-center 
                           ${
                             isFirst
                               ? "bg-green-700 text-white"
                               : "bg-gray-100 text-gray-600"
                           }`}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          <span className="font-semibold">{s.id}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Label */}
                  <span
                    className={`text-sm ${
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
