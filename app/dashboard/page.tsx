import { auth } from "@/auth";
import React from "react";

const Dashboard = async () => {
  const session = await auth();
  return <div>Hi {session?.user?.email}</div>;
};

export default Dashboard;
