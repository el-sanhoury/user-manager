"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  personalInfoSchema,
  PersonalInfoType,
} from "./schemas/personal.schema";

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
    formState: { errors, isValid },
    watch,
  } = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
    mode: "onChange",
  });

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
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Gender */}
      <div className="space-y-1">
        <label className="block text-sm font-medium mb-2">
          Gender
          <span className="text-red-500"> * </span>
        </label>
        <select
          {...register("gender")}
          className={` w-full px-4 py-3 rounded-xl outline-none border border-gray-300 transition-all ${
            errors.gender
              ? "border-red-500"
              : "focus:border-green-700 focus:ring-1 focus:ring-green-700"
          }`}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>

      {/* Country */}
      <div className="space-y-1">
        <label className="block text-sm font-medium mb-2">
          {" "}
          Country (Optional){" "}
        </label>
        <select
          {...register("country")}
          className={` w-full px-4 py-3 rounded-xl outline-none border border-gray-300 transition-all `}
        >
          <option value="">Select country</option>
          <option value="egypt">Egypt</option>
          <option value="ksa">Saudi Arabia</option>
          <option value="uae">UAE</option>
        </select>
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
        />

        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
      </div>

      {/* Hidden submit: used only by NEXT BUTTON */}
      <button type="submit" className="hidden"></button>
    </form>
  );
}
