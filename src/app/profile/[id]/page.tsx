import React from "react";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <div>Welcome to Profile of</div>
      <span className="bg-amber-600 rounded-b-md text-black p-2">{id}</span>
    </div>
  );
};

export default ProfilePage;
