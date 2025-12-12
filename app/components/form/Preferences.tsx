"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  preferencesSchema,
  PreferencesType,
} from "./schemas/preferences.schema";
import { FormDataType } from "@/app/types/form.types"; 

type Props = {
  data: PreferencesType;
  updateFields: (fields: Partial<FormDataType>) => void;
  onValid: () => void;
};

export default function Preferences({ data, updateFields, onValid }: Props) {
  const {
    register,
    handleSubmit,
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

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-6">
      <h3 className="text-2xl font-bold mb-6">Preferences</h3>

      {/* Category */}
      <div className="space-y-1">
        <label className="block text-sm font-medium mb-2">
          Category
          <span className="text-red-500"> * </span>
        </label>
        <select
          {...register("category")}
          className={` w-full px-4 py-3 rounded-xl outline-none border border-gray-300 transition-all ${
            errors.category
              ? "border-red-500"
              : "focus:border-green-700 focus:ring-1 focus:ring-green-700"
          }`}
        >
          <option value="">Select Category</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="marketing">Marketing</option>
        </select>

        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Interests as checkbox group */}
      <div className="space-y-1">
        <label className="block text-sm font-medium mb-2">
          Interests
          <span className="text-red-500"> * </span>
        </label>

        <div className="grid grid-cols-2 gap-2">
          <label className="inline-flex items-center gap-2 p-2 border rounded-lg">
            <input
              type="checkbox"
              value="uiux"
              {...register("interests")}
              className="accent-green-600"
            />
            <span>UI/UX</span>
          </label>

          <label className="inline-flex items-center gap-2 p-2 border rounded-lg">
            <input
              type="checkbox"
              value="frontend"
              {...register("interests")}
              className="accent-green-600"
            />
            <span>Frontend</span>
          </label>

          <label className="inline-flex items-center gap-2 p-2 border rounded-lg">
            <input
              type="checkbox"
              value="backend"
              {...register("interests")}
              className="accent-green-600"
            />
            <span>Backend</span>
          </label>

          <label className="inline-flex items-center gap-2 p-2 border rounded-lg">
            <input
              type="checkbox"
              value="seo"
              {...register("interests")}
              className="accent-green-600"
            />
            <span>SEO</span>
          </label>
        </div>

        {errors.interests && (
          <p className="text-red-500 text-sm">{errors.interests.message}</p>
        )}
      </div>

      {/* Avatar Upload */}
      <div className="space-y-1">
        <label className="block text-sm font-medium mb-2">
          Avatar Upload (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            updateFields({ avatar: e.target.files?.[0] ?? null })
          }
          className={` w-full px-4 py-3 rounded-xl outline-none border border-gray-300`}
        />
      </div>

      <button type="submit" className="hidden" />
    </form>
  );
}
