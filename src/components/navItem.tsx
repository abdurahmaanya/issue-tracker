import Link from "next/link";

export default function NavItem(){
    return (
        <div>
            <nav className="bg-gray-800 shadow">
                <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                    <li className="text-white">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="text-white">
                        <Link href="/backlog">Backlog</Link>
                    </li>
                    <li className="text-white">
                        <Link href="/board">Board</Link>
                    </li>
                    <li className="text-white">
                        <Link href="/logout">Logout</Link>
                    </li>
                </div>
            </nav>
        </div>
    );
}