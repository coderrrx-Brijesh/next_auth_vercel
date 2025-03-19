import React, { JSX } from "react";

interface ProfilePageProps {
    params: Promise<{ id: string }>;
    // optionally, add searchParams if needed:
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProfilePage({ params }: ProfilePageProps): Promise<JSX.Element> {
    const { id } = await params;
    return (
        <div>
            <div>Welcome to Profile of</div>
            <span className="bg-amber-600 rounded-b-md text-black p-2">{id}</span>
        </div>
    );
}