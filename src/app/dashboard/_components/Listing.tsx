"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { AiGeneratedImage } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import EmptyState from "./EmptyState";
import Link from "next/link";
import RoomDesignCard from "./RoomDesignCard";

export interface RoomType {
  id: number;
  roomType: string;
  designType: string;
  orgImage: string;
  aiImage: string;
  userEmail: string | null;
}

function Listing() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = React.useState<RoomType[]>([]);

  const getUserRoomList = async () => {
    const result = await db.select().from(AiGeneratedImage)
    .where(eq(AiGeneratedImage.userEmail,user?.primaryEmailAddress?.emailAddress || ''))
    setUserRoomList(result)
    console.log('result',result)
  }

  useEffect(() => {
    if (user) {
      getUserRoomList();
    }
  }, [user]);

  return (
    <div>
      {/* Hero section */}
      <div className="flex md:flex-row flex-col gap-5 items-center justify-between">
        <h2 className="font-bold text-3xl">
          Hola Bienvenido, {user?.fullName}
        </h2>
        <Link href={`/dashboard/create-new`}>
          <Button>+ Rediseñar Interior</Button>
        </Link>
      </div>

      {/* Loading */}
      {userRoomList.length === 0 ?
        <EmptyState />
        : 
        <div className="mt-6">
          <h2 className="font-medium text-primary text-xl mb-10">Estudio de Habitaciones IA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {userRoomList.map((room,index) => (
              <RoomDesignCard
                key={index}
                room={room}
              />
            ))}
          </div>
        </div>}
    </div>
  );
}

export default Listing;
