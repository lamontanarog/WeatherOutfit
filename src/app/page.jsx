"use client";
// import OutfitRecommendation from "@/components/outfit.jsx";
// import WomanClothes from "../components/woman.jsx";
import Weather from "../components/weather.jsx";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Weather Outfit</h1>
      <Weather/>
      {/* <WomanClothes /> */}
      {/* <OutfitRecommendation /> */}
      <button onClick={() => router.push("/outfit")} style={{ marginTop: "20px", width: "100%" }}>Recomendar Outfit</button>
    </div>
  );
}

