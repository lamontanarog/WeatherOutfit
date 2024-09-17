"use client";
import OutfitRecommendation from "@/components/outfit.jsx";
// import WomanClothes from "../components/woman.jsx";
import Weather from "../components/weather.jsx";


export default function Home() {
  return (
    <>
    <Weather/>
    <OutfitRecommendation />
    </>
  );
}
