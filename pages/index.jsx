import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { SignInForm } from "../components/auth/signInForm";
import { SignUpForm } from "../components/auth/signUpForm";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [showSignUp, setShowSignUp] = useState(false);
  const { data: session, status } = useSession();
  console.log("session -> login btn page", { session });

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div style={{ display: "grid", placeItems: "center", zoom: "1.5" }}>
      {session ? (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={() => router.push("/dashboard")}>Dashboard</button>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          {showSignUp ? <SignUpForm /> : <SignInForm />}
          <br />
          <br />
          <br />
          <button onClick={() => setShowSignUp(!showSignUp)}>
            {showSignUp ? "login" : "signUp"}
          </button>
        </>
      )}
    </div>
  );
}
