"use client";

import { useFormStatus } from "react-dom";
// import { submitForm } from "@/app/actions/submitForm";

export default function Form() {
  return (
    <form  className="space-y-4 max-w-xl mx-auto p-6">
      <div>
        <label>Name</label>
        <input name="name" className="input" />
      </div>

      <div>
        <label>Email</label>
        <input name="email" className="input" />
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
