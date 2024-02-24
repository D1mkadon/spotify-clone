import axios from "axios";
import { getSession } from "next-auth/react";
import React, { useEffect } from "react";

const page = ({ params }: { params: { categoryId: string } }) => {
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      axios.get("");
    };
  }, []);
  return <div>page {params.categoryId}</div>;
};

export default page;
