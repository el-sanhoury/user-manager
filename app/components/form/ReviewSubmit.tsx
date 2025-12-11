"use client";

interface Props {
  data: {
    name: string;
    email: string;
    gender: string;
    age: string;
    country?: string;
    category: string;
    interests: string;
    avatar?: File | null;
  };
}

export default function ReviewSubmit({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
      <h3 className="text-2xl font-bold mb-6">Review & Submit</h3>

      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Gender:</strong> {data.gender}
        </p>
        <p>
          <strong>Age:</strong> {data.age}
        </p>
        <p>
          <strong>Country:</strong> {data.country ?? "Not specified"}
        </p>
        <p>
          <strong>Category:</strong> {data.category}
        </p>
        <p>
          <strong>Interests:</strong> {data.interests}
        </p>
        <p>
          <strong>Avatar:</strong>{" "}
          {data.avatar ? data.avatar.name : "No avatar uploaded"}
        </p>
      </div>
    </div>
  );
}
