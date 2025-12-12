"use client";

interface Props {
  data: {
    name: string;
    email: string;
    gender: string;
    age: string;
    country?: string;
    category: string;
    interests: string[];
  };
}

export default function ReviewSubmit({ data }: Props) {
  return (
    <>
      <h3 className="text-2xl font-bold mb-6">Review & Submit</h3>

      {/* CARD */}
      <div className="bg-slate-50 p-6 rounded-xl mb-['24px']">
        <h4 className="text-lg font-semibold mb-4">User Summary</h4>

        <div className="divide-y divide-[#dce6f2]">
          {/* Row */}
          <div className="flex justify-between py-3">
            <p className="text-slate-600">Name:</p>
            <p className="font-medium">{data.name}</p>
          </div>

          <div className="flex justify-between py-3">
            <p className="text-slate-600">Email:</p>
            <p className="font-medium">{data.email}</p>
          </div>

          <div className="flex justify-between py-3">
            <p className="text-slate-600">Gender:</p>
            <p className="font-medium">{data.gender}</p>
          </div>

          <div className="flex justify-between py-3">
            <p className="text-slate-600">Country:</p>
            <p className="font-medium">{data.country || "Not specified"}</p>
          </div>

          <div className="flex justify-between py-3">
            <p className="text-slate-600">Age:</p>
            <p className="font-medium">{data.age}</p>
          </div>

          <div className="flex justify-between py-3">
            <p className="text-slate-600">Category:</p>
            <p className="font-medium">{data.category}</p>
          </div>

          {/* Interests */}
          <div className="flex justify-between py-3">
            <p className="text-gray-600">Interests:</p>

            <div className="flex gap-2">
              {data.interests?.map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* READY MESSAGE */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
        <div className="flex items-start">
          
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
            className="lucide lucide-circle-check-big w-5 h-5 text-green-600 mt-0.5 mr-3 shrink-0"
            aria-hidden="true"
          >
            <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
            <path d="m9 11 3 3L22 4"></path>
          </svg>

          <div>
            {/* <p>Ready to submit</p> */}
            <p className="text-green-800 font-medium">Ready to submit</p>
            {/* <br /> */}
            <p className="text-green-700 text-sm mt-1">
              Review all information carefully before submitting. You can go
              back to make changes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
