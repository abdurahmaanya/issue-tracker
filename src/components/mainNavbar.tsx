import { signOut } from "next-auth/react";
import Link from "next/link";

export default function MainNavbar(){
    return (
        <div>
            <nav className="bg-gray-800 shadow">
                <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                    <li className="text-white">
                        <Link href="/profile">Profile</Link>
                    </li>
                    <li className="text-white">
                        <Link href="/issues">Issues</Link>
                    </li>
                    <li className="text-white">
                        <Link href="/logout">Logout</Link>
                    </li>
                </div>
            </nav>
        </div>
    );
}