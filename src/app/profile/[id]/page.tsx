import React, { JSX } from "react";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps): JSX.Element {
  const { id } = params;
  return (
    <div>
      <div>Welcome to Profile of</div>
      <span className="bg-amber-600 rounded-b-md text-black p-2">{id}</span>
    </div>
  );
}
