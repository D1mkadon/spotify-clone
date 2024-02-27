import { useSession } from "next-auth/react";
import React from "react";

const page = ({ params }: { params: { albumId: string } }) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      
    },
    });
  return <div>page</div>;
};

export default page;
