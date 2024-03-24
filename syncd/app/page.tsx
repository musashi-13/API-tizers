"use client"
import CarouselBox from "./components/carouselBox";
import AiwithText from "./components/chatBox";
import EventCards from "./components/eventCards";
import NavBar from "./components/navBar";
import { useEffect } from 'react';
import { Suspense } from "react";

export default function Home() {
  

  const pullData = async () => {
    const response = await fetch('/api/chatboxdata', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }});
      }


  useEffect(() => {
    pullData();
  }, []);
  return (
      <main className="bg-primary-50 dark:bg-primary-50 w-lwv h-lvh">
          <NavBar />
          <div className="z-1">
            <Suspense fallback={<div>Loading...</div>}>
              <CarouselBox />
            </Suspense>
            <EventCards />
          </div>
          <div className="fixed bottom-4 right-4" style={{zIndex: "25"}}>
            <AiwithText/>
          </div>
      </main>
  );
}
