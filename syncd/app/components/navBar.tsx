import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react";

export default function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log('Checking session storage...');
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        console.log('Is logged in?', isLoggedIn);
        setLoggedIn(isLoggedIn);
    }, []);

    function handleLogout() {
        sessionStorage.removeItem('isLoggedIn');
        setLoggedIn(false);
    }
    return(
       <nav className="bg-primary-100 flex py-2 px-4 justify-between">
        <Image src='/logo sm.png' alt='logo' width={30} height={30}/>
            <div className="flex justify-between gap-4">
                {!loggedIn ? (
                    <div className="flex gap-4">
                        <Link href='/login' className="text-primary-50 hover:text-white">
                            Log in
                        </Link>
                        <Link href='/signup'className="bg-primary-200 outline-none focus:outline-none border border-dark-100 px-2 text-primary-300 rounded-lg hover:bg-white">
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    <div>
                        <button onClick={handleLogout} className="text-primary-50 hover:text-white">
                            Log Out
                        </button>
                    </div>
                )}
                
            </div>
       </nav> 
    )
}