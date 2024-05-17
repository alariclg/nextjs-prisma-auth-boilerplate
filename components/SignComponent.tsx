"use client";
import { signIn, signOut } from "next-auth/react";

export const SignComponent = () => {
  return (
    <div>
      <button onClick={() => signIn()}>Signin</button>
      <button onClick={() => signOut()}>Signout</button>
    </div>
  );
};
