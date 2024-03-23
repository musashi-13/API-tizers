import Image from "next/image"
import Link from "next/link"

export default function NavBar() {
    return(
       <nav className="bg-primary-100 flex py-2 px-4 justify-between">
        <Image src='/logo sm.png' alt='logo' width={30} height={30}/>
            <div className="flex justify-between gap-4">
                <button>
                <svg className="w-6 h-6 text-primary-200 hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM1.866 8.832a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z"/>
                </svg>
                </button>
                <Link href='/login' className="text-primary-50 hover:text-white">
                    Log in
                </Link>
                <Link href='/signup'className="bg-primary-200 outline-none focus:outline-none border border-dark-100 px-2 text-primary-300 rounded-lg hover:bg-white">
                    Sign Up
                </Link>
            </div>
       </nav> 
    )
}