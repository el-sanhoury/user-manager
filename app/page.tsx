"use client";

import { useState } from "react";
import Stepper from "./components/ui/Stepper";
import PersonalInformation from "./components/form/PersonalInformation";
import Preferences from "./components/form/Preferences";
import ReviewSubmit from "./components/form/ReviewSubmit";
import { FormDataType } from "./types/form.types";
import FormButton from "./components/ui/FormButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Page() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    gender: "",
    age: "",
    country: "",

    category: "",
    interests: [],
    avatar: null,
  });

  const updateFields = (fields: Partial<FormDataType>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-3">
        <h4 className="text-amber-400 font-black uppercase">Challenge</h4>
        <h2 className="text-3xl font-bold mb-8">Live Multi-Step Form</h2>
      </div>

      <div className="max-w-4xl mx-auto px-3 ">
        <Stepper step={step} onChange={setStep} />

        <div className="bg-white p-8 rounded-xl shadow-lg">
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
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
            {step > 1 ? (
              <FormButton
                variant="secondary"
                onClick={prevStep}
                icon={<ChevronLeft size={24} />}
                iconPosition="left"
              >
                Back
              </FormButton>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <FormButton
                variant="success"
                onClick={() => {
                  (
                    document.querySelector(
                      "form button[type=submit]"
                    ) as HTMLButtonElement
                  )?.click();
                }}
                icon={<ChevronRight size={24} />}
                iconPosition="right"
              >
                Next Step
              </FormButton>
            ) : (
              <FormButton
                variant="success"
                onClick={() => {
                  console.log("Submitting final data:", formData);
                  alert("Form submitted!");
                }}
                icon={<ChevronRight size={24} />}
                iconPosition="right"
              >
                Submit
              </FormButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
