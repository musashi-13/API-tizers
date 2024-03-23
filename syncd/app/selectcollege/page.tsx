"use client"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from "react";
export default function Home() {
  const [college, setCollege] = useState('');

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
      <div className="h-lvh w-lvw bg-white dark:bg-primary-300 text-primary-300 flex justify-center items-center">
        <div style={{width: "16em"}} className="flex flex-col justify-around gap-4 bg-primary-100 mx-auto text-white items-center p-4 rounded-lg">
          <p>Selct your College</p>
          <FormControl sx={{width: "14em", color: "white"}}>
            <InputLabel id="demo-simple-select-label" color="primary">College</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={college}
                label="College"
                sx={{color: "white"}}
              >
                <MenuItem value={10}>PES University</MenuItem>
                <MenuItem value={20}>BMSIT</MenuItem>
                <MenuItem value={30}>MSRIT</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </ThemeProvider>
    );
  }
  