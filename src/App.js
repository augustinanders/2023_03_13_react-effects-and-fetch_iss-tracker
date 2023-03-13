import { useState, useEffect } from "react";
import Controls from "./components/Controls";
import Map from "./components/Map";
import "./styles.css";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

export default function App() {
  const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    getISSCoords();
    const timer = setInterval(() => {
      getISSCoords();
    }, 5000);

    // cleanup function
    return () => {
      clearInterval(timer);
    };
  }, []);

  async function getISSCoords() {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    setCoords(data);
  }

  return (
    <main>
      <Map longitude={coords.longitude} latitude={coords.latitude} />
      <Controls
        longitude={coords.longitude}
        latitude={coords.latitude}
        onRefresh={getISSCoords}
      />
    </main>
  );
}
