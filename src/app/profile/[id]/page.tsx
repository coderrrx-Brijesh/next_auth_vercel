import React from "react";

interface PageProps {
  params: { id: string };
}

const ProfilePage = ({ params }: PageProps) => {
  // Remove "await" since params is a plain object, not a promise
  const { id } = params;

  return (
    <div>
      <div>Welcome to Profile of</div>
      <span className="bg-amber-600 rounded-b-md text-black p-2">{id}</span>
    </div>
  );
};

export default ProfilePage;
