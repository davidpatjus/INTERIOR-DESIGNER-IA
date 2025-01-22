"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React from "react";
import EmptyState from "./EmptyState";
import Link from "next/link";

function Listing() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = React.useState([]);

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
      {userRoomList.length === 0 ? <EmptyState /> : <div>si hay</div>}
    </div>
  );
}

export default Listing;
