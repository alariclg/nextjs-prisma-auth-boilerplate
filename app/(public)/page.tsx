import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";
import ClientComponent from "@/components/ClientComponent";
import { SignComponent } from "@/components/SignComponent";

const LandingPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <SignComponent />
      <h2>Server session</h2>
      <pre>{JSON.stringify(session)}</pre>

      <ClientComponent />
    </div>
  );
};

export default LandingPage;
