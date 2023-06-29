import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
    
  const { data: sessionData } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (sessionData) {
      void signOut().then().catch((err)=>console.log(err));
    }
  }, );
  useEffect(() => {
    void router.push('/');
  }, );
}