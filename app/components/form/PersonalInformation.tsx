"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import {
  personalInfoSchema,
  PersonalInfoType,
} from "./schemas/personal.schema";
import dynamic from "next/dynamic";

const SearchableSelect = dynamic(() => import("./dropDown/SearchableSelect"), {
  ssr: false,
});

// import SearchableSelect from "./dropDown/SearchableSelect";

type Props = {
  defaultValues: PersonalInfoType;
  updateFields: (values: Partial<PersonalInfoType>) => void;
  onValid: () => void;
};

export default function PersonalInformation({
  defaultValues,
  updateFields,
  onValid,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
    mode: "onChange",
  });

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const countries = [
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    // ... باقي الدول
  ];

  useEffect(() => {
    const subscription = watch((values) => {
      updateFields(values);
    });

    return () => subscription.unsubscribe();
  }, [watch, updateFields]);

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-6">
      <h3 className="text-2xl font-bold mb-6">Personal Information</h3>

      {/* Full Name */}
      <div className="space-y-1">
        <label className="block text-sm font-medium mb-2">
          Full Name
          <span className="text-red-500"> * </span>
        </label>
        <input
          {...register("name")}
          placeholder="Maged Yaseen"
          className={` w-full px-4 py-3 rounded-xl outline-none border border-gray-300 transition-all ${
            errors.name
              ? "border-red-500"
              : "focus:border-green-700 focus:ring-1 focus:ring-green-700"
          }`}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <p className="text-sm text-slate-500 mt-2">Must be 2-50 characters</p>
      </div>

      {/* Email */}
      <div className="space-y-1">
        {/* <label className="font-medium"> */}
        <label className="block text-sm font-medium mb-2">
          Email Address
          <span className="text-red-500"> * </span>
        </label>
        <input
          {...register("email")}
          placeholder="example@email.com"
          className={` w-full px-4 py-3 rounded-xl outline-none border border-gray-300 transition-all ${
            errors.email
              ? "border-red-500"
              : "focus:border-green-700 focus:ring-1 focus:ring-green-700"
          }`}
          aria-invalid={!!errors.name}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Gender */}
      <div className="space-y-1">
        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <SearchableSelect
              name={name}
              required={true}
              value={value || ""}
              onChange={onChange}
              label="Gender "
              options={genders}
              placeholder="Select gender"
              error={errors.gender?.message}
            />
          )}
        />
      </div>

      {/* Country */}
      <div className="space-y-1">
        <Controller
          name="country"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <SearchableSelect
              name={name}
              value={value || ""}
              onChange={onChange}
              label="Country"
              hint="Optional"
              options={countries}
              placeholder="Select country"
            />
          )}
        />
      </div>

      {/* Age */}
      <div className="space-y-1">
        <label className="block text-sm font-medium mb-2">
          Age
          <span className="text-red-500"> * </span>
        </label>

        <input
          type="number"
          {...register("age")}
          placeholder="30"
          className={` w-full px-4 py-3 rounded-xl outline-none border border-gray-300 transition-all ${
            errors.age
              ? "border-red-500"
              : "focus:border-green-700 focus:ring-1 focus:ring-green-700"
          }`}
          aria-invalid={!!errors.name}
        />

        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
        <p className="text-sm text-slate-500 mt-2">Must be between 18-100</p>
      </div>

      {/* Hidden submit: used only by NEXT BUTTON */}
      <button type="submit" className="hidden" aria-hidden="true"></button>
    </form>
  );
}
