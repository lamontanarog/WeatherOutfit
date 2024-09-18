"use client";
// import OutfitRecommendation from "@/components/outfit.jsx";
// import WomanClothes from "../components/woman.jsx";
import Weather from "../components/weather.jsx";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  return (
    <div style={{ backgroundImage: "url('https://i.pinimg.com/736x/20/8e/81/208e81cf3de08d55af49272f6e3a6d4c.jpg')",display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1 style={{ textAlign: "center", backgroundColor: "gray", color: "white", padding: "10px", borderRadius: "10px", filter: "drop-shadow(0 0 0.75rem gray)", marginBottom: "20px" }}>Weather Outfit</h1>
      <Weather/>
      {/* <WomanClothes /> */}
      {/* <OutfitRecommendation /> */}
      <button onClick={() => router.push("/outfit")} style={{ marginTop: "20px", width: "200px", height: "40px", backgroundColor: "gray", color: "white", border: "double", borderRadius: "25px", fontSize: "16px", cursor: "pointer"}}>Recomendar Outfit</button>
    </div>
  );
}

