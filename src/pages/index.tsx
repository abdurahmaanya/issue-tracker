'use client'
import { signIn, useSession } from "next-auth/react";
import Header from "~/components/header";
import NavItem from "~/components/navItem";
import Image, { type ImageLoader } from 'next/image'

export default function Home() {
  const session = useSession();
  const imageLoader:ImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }  
  if(session.data != null){
    return (
      <>
       <Header/>
        <main>
        <div>
            <NavItem />
            { 
              session.data?.user.image &&
              <Image
                loader={imageLoader}
                src={session.data?.user.image}
                alt="Profile picture of the user"
                width={100}
                height={100}
              />
            }
            <h1>username: {session.data?.user.name}</h1>
            <h1>email: {session.data?.user.email}</h1>
          </div>
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
