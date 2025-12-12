"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  preferencesSchema,
  PreferencesType,
} from "./schemas/preferences.schema";
import { FormDataType } from "@/app/types/form.types";
import SearchableSelect from "./dropDown/SearchableSelect";

type Props = {
  data: PreferencesType;
  updateFields: (fields: Partial<FormDataType>) => void;
  onValid: () => void;
};

export default function Preferences({ data, updateFields, onValid }: Props) {
  const {
    // register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<PreferencesType>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: data,
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((values) => {
      updateFields(values as Partial<FormDataType>);
    });

    return () => subscription.unsubscribe();
  }, [watch, updateFields]);

  const categories = [
    { value: "technology", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "marketing", label: "Marketing" },
    { value: "art", label: "Art" },
    { value: "music", label: "Music" },
    { value: "sports", label: "Sports" },
    { value: "travel", label: "Travel" },
    { value: "food", label: "Food" },
    { value: "science", label: "Science" },
  ];

  const Interests = [
    { value: "technology", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "marketing", label: "Marketing" },
    { value: "art", label: "Art" },
    { value: "music", label: "Music" },
    { value: "sports", label: "Sports" },
    { value: "travel", label: "Travel" },
    { value: "food", label: "Food" },
    { value: "science", label: "Science" },
  ];

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-6">
      <h3 className="text-2xl font-bold mb-6">Preferences</h3>

      <div className="space-y-1">
        <Controller
          name="category"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <SearchableSelect
              name={name}
              required={true}
              value={value || ""}
              onChange={onChange}
              label="Category "
              options={categories}
              placeholder="Select category"
              error={errors.category?.message}
              aria-labelledby={name}
              aria-required={true}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
            />
          )}
        />
      </div>

      <div className="space-y-1">
        <Controller
          name="interests"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <SearchableSelect
              name={name}
              required={true}
              value={value || ""}
              onChange={onChange}
              label="Interests "
              hint="Select up to 5 interests"
              options={Interests}
              placeholder="Select country"
              error={errors.interests?.message}
              isMulti={true}
              aria-labelledby={name}
              aria-required={true}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
            />
          )}
        />
        <p className="text-sm text-slate-500 mt-2">Selected: 0 of 10(Max: 5)</p>
      </div>

      {/* Avatar Upload */}
      <div className="space-y-1">
        <label className="block text-sm font-medium mb-2">
          Avatar Upload (Optional)
        </label>

        <div
          className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) updateFields({ avatar: file });
          }}
        >
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12 text-slate-400 mx-auto mb-4"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <path d="m17 8-5-5-5 5" />
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          </svg>

          <p className="text-slate-600">Drag & drop your avatar here or</p>

          <label className="cursor-pointer">
            <p className="bg-green-700 text-white mt-4 px-4 py-2 hover:bg-green-800 rounded-xl transition-colors">
              Browse Files
            </p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                updateFields({ avatar: e.target.files?.[0] ?? null })
              }
            />
          </label>

          <p className="text-sm text-slate-500 mt-2">PNG, JPG up to 5MB</p>

          {/* Show selected file */}
          {data.avatar && typeof data.avatar !== "string" && (
            <p className="text-sm text-green-600 mt-3 font-medium">
              Selected: {data.avatar.name}
            </p>
          )}
        </div>
      </div>

      <button type="submit" className="hidden" />
    </form>
  );
}
