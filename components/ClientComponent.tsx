"use client";

import { useSession } from "next-auth/react";

const ClientComponent = () => {
  const session = useSession();
  return (
    <div>
      <h2>Client Session</h2>
      {JSON.stringify(session)}
    </div>
  );
};

export default ClientComponent;
