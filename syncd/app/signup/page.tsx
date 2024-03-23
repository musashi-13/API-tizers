"use client"
import { TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router from "next/router";


export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [errMsg, setErrMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (password===reEnterPassword){
        console.log("process started "+email+' '+password)
        const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            setLoading(false);
            const errmsg = await response.json();
            console.error(errmsg.message);
            if (errmsg.message === 'invalidCredentials'){
                setErrMsg("Invalid Credentials")
            } else if (errmsg.message === 'weakPassword') {
                setErrMsg("Weak Password")
            } else if (errmsg.message === 'userExists' ){
                setErrMsg("Account Already Exists")
            } else if (errmsg.message === 'failCreate' ){
                setErrMsg("Sorry We Are Having Some Trouble")
            } else {
                setErrMsg("Try Again")
            }
        }
    }
  };    

  return (
    <div className="flex h-screen bg-primary-100 items-center">
      <div className="bg-white flex flex-col items-center m-auto p-8 rounded-xl" style={{ width: "20em" }}>
        <Image src='/logo sm.png' alt='logo' width={80} height={80} />
        <p className="text-primary-300 py-4 text-lg">Create your account now!</p>
        <form onSubmit={handleSubmit} className="flex items-center flex-col gap-4">
          <TextField id="email" label="Email Address" variant="standard" color="primary" InputLabelProps={{ shrink: true }} value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField id="password" label="Password" variant="standard" color="primary" InputLabelProps={{ shrink: true }} value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField id="reEnterPassword" label="Re Enter Password" variant="standard" color="primary" InputLabelProps={{ shrink: true }} value={reEnterPassword} onChange={(e) => setReEnterPassword(e.target.value)} />
          <p className="text-primary-300 text-xs">Already have an account? <Link href='/login'><u>Login</u></Link></p>
          <button style={{width: "14rem"}} type="submit" className="btn-primary text-primary-300 border border-primary-300 px-4 py-2 rounded-lg">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
