"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  preferencesSchema,
  PreferencesType,
} from "./schemas/preferences.schema";

type Props = {
  data: PreferencesType;
  updateFields: (fields: Partial<PreferencesType>) => void;
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

  // update global formData whenever fields change
  //   useEffect(() => {
  //     const sub = watch((values) => updateFields(values));
  //     return () => sub.unsubscribe();
  //   }, [watch, updateFields]);

  useEffect(() => {
    const subscription = watch((values) => {
      updateFields(values);
    });

    return () => subscription.unsubscribe();
  }, [watch, updateFields]);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="bg-white p-6 rounded-xl shadow-lg space-y-4"
    >
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

      {/* Interests */}
      <div className="space-y-1">
        <label className="block text-sm font-medium mb-2">
          Interests
          <span className="text-red-500"> * </span>
        </label>
        <select
          {...register("interests")}
          className={` w-full px-4 py-3 rounded-xl outline-none border border-gray-300 transition-all ${
            errors.interests
              ? "border-red-500"
              : "focus:border-green-700 focus:ring-1 focus:ring-green-700"
          }`}
        >
          <option value="">Select Interest</option>
          <option value="uiux">UI/UX</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="seo">SEO</option>
        </select>

        {errors.interests && (
          <p className="text-red-500 text-sm">{errors.interests.message}</p>
        )}
      </div>

      {/* Avatar Upload */}
      <div className="space-y-1">
        {/* <label className="font-medium">Avatar Upload (Optional)</label> */}
        <label className="block text-sm font-medium mb-2"> Avatar Upload (Optional)</label>
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
