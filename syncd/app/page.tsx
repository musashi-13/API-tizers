"use client"
import CarouselBox from "./components/carouselBox";
import AiwithText from "./components/chatBox";
import NavBar from "./components/navBar";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [clg, setCollege] = useState('');
  const searchParams = useSearchParams()

  const pullData = async () => {
    const response = await fetch('/api/chatboxdata', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }});
      }


  useEffect(() => {
    pullData();
    if (searchParams){
      const college = searchParams.get('college')
      if (college){
        setCollege(college)
      }
    }
  }, []);
  return (
      <main className="bg-primary-50 dark:bg-primary-50 w-lwv h-lvh">
          <NavBar />
          <div className="z-1">
          <CarouselBox collegeName={clg} />
          </div>
          <div className="fixed bottom-4 right-4" style={{zIndex: "25"}}>
            <AiwithText/>
          </div>
      </main>
  );
}
