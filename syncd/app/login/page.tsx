"use client"
import { TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("process started")
        const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            sessionStorage.setItem('isLoggedIn', 'true');
            router.push('/selectcollege');
        } else {
            setIsLoading(false);
            const errmsg = await response.json();
            console.error(errmsg.message);
            if (errmsg.message == 'userNotFound'){
                setErrMsg("Account Not Found")
            } else if (errmsg.message == 'invalidPassword') {
                setErrMsg("Invalid password")
            } else if (errmsg.message == 'failLogin' ){
                setErrMsg("Sorry we are having some trouble..")
            } else {
                setErrMsg("Try again")
            }
        }
    };    

  return (
    <div className="flex h-screen bg-primary-100 items-center">
      <div className="bg-white flex flex-col items-center m-auto p-8 rounded-xl" style={{ width: "24em" }}>
        <Image src='/logo sm.png' alt='logo' width={80} height={80} priority={true}/>
        <p className="text-primary-300 py-4 text-lg">Login Now!</p>
        <form onSubmit={handleSubmit} className="flex items-center flex-col gap-4">
            <TextField id="email" sx={{width: "18em"}} label="Email Address" variant="standard" color="primary" InputLabelProps={{ shrink: true }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField id="password" sx={{width: "18em"}} label="Password" variant="standard" color="primary" InputLabelProps={{ shrink: true }} value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className="text-primary-300 text-xs">Don't have an account? <Link href='/signup'><u>Sign Up</u></Link></p>
            <p style={{width: "14rem"}} className="text-red-600 text-sm text-right">{errMsg && <FontAwesomeIcon icon={faWarning} size="xs" style={{marginRight: "0.3rem"}}/>}{errMsg}</p>
            <button style={{width: "18rem"}} type="submit" className="btn-primary text-primary-300 border border-primary-300 px-4 py-2 rounded-lg">{isLoading ? (<FontAwesomeIcon icon={faSpinner} spin size="sm" />) : ("Log In")}</button>
        </form>
      </div>
    </div>
  );
}
