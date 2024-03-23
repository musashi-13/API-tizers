import CarouselBox from "./components/carouselBox";
import NavBar from "./components/navBar";

export default function Home() {
  return (
    <main className="bg-primary-50 dark:bg-primary-50">
      <NavBar/>
      <CarouselBox/>
    </main>
  );
}
