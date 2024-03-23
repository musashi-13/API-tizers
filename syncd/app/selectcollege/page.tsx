"use client"
import { useRouter } from 'next/navigation';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from "react";
import Image from "next/image";

export default function SelectCollege() {
  const router = useRouter();
  const [college, setCollege] = useState('');

  const handleCollegeChange = (event: any) => {
    setCollege(event.target.value);
    router.push(`/?college=${encodeURIComponent(event.target.value)}`);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff'
      },
      secondary: {
        main: '#000000', 
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen w-screen bg-white dark:bg-primary-300 text-primary-300 flex justify-center items-center">
        <div style={{width: "18em"}} className="flex flex-col px-8 justify-around bg-primary-100 mx-auto text-white items-center p-4 rounded-lg">
          <Image className="pb-4" src='/logo sm.png' alt='logo' width={36} height={36}/>
          <p className="text-xl pb-4">Welcome to SyncD</p>
          <FormControl sx={{width: "14em", color: "white"}}>
            <InputLabel id="demo-simple-select-label" color="primary" sx={{color: "white"}}>Select your college</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={college}
                label="Select your college"
                onChange={handleCollegeChange}
                sx={{color: "white"}}
              >
                <MenuItem value={'PES University'}>PES University</MenuItem>
                <MenuItem value={'BMSIT'}>BMSIT</MenuItem>
                <MenuItem value={'MSRIT'}>MSRIT</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </ThemeProvider>
    );
  }
