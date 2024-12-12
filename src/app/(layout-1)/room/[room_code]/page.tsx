"use client";
import { useParams } from "next/navigation";
import CheckStatusBeforeJoining from "@/components/room/Room";

export default function Page() {
  const { room_code } = useParams();

  return (
    <>
      <CheckStatusBeforeJoining room_code={room_code as string} />
    </>
  );
}
