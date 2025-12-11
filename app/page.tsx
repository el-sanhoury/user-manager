"use client";

import { useState } from "react";
import Stepper from "./components/ui/Stepper";
import PersonalInformation from "./components/form/PersonalInformation";
import Preferences from "./components/form/Preferences";
import ReviewSubmit from "./components/form/ReviewSubmit";
import { FormDataType } from "./types/form.types";

export default function Page() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    gender: "",
    age: "",
    country: "",

    category: "",
    interests: "",
    avatar: null,
  });

  const updateFields = (fields: Partial<FormDataType>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h4 className="text-amber-400 font-black uppercase">Challenge</h4>
      <h2 className="text-3xl font-bold mb-8">Live Multi-Step Form</h2>
      <Stepper step={step} onChange={setStep} />

      {step === 1 && (
        <PersonalInformation
          defaultValues={{
            name: formData.name,
            email: formData.email,
            gender: formData.gender,
            age: formData.age,
            country: formData.country,
          }}
          updateFields={updateFields}
          onValid={nextStep}
        />
      )}

      {step === 2 && (
        <Preferences
          data={{
            category: formData.category,
            interests: formData.interests,
            avatar: formData.avatar,
          }}
          updateFields={updateFields}
          onValid={nextStep}
        />
      )}

      {step === 3 && <ReviewSubmit data={formData} />}

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        {step > 1 ? (
          <button className="px-4 py-2 border rounded" onClick={prevStep}>
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              (
                document.querySelector(
                  "form button[type=submit]"
                ) as HTMLButtonElement
              )?.click();
            }}
          >
            Next Step
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => {
              console.log("Submitting final data:", formData);
              alert("Form submitted! Check console for data.");
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
