"use client"
import CarouselBox from "./components/carouselBox";
import AiwithText from "./components/chatBox";
import NavBar from "./components/navBar";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [clg, setCollege] = useState('');
  const searchParams = useSearchParams()
  useEffect(() => {
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
          <CarouselBox collegeName={clg} />
          <div className="fixed bottom-4 right-4">
            <AiwithText/>
          </div>
      </main>
  );
}
