import { signIn, useSession } from "next-auth/react";
import Header from "~/components/header";

import MainNavbar from "~/components/mainNavbar";

export default function Home() {

  const { data: sessionData } = useSession();
  
  if(sessionData != null){
    return (
      <>
       <Header/>
        <main>
          <MainNavbar />
        </main> 
      </>
    );
  }
  else{
    return(
      <>
        <Header/>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={() => void signIn()}
            >
              Log in
            </button>
          </div>
        </main>
      </>
    );
  }
}
