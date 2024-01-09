import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Map from "./map";
import { Provider } from "react-redux";
function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDSKsr1WK1DcCmD49tsJ1nZMgKT8RJC9EE",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <Map />
    </div>
  );
}

export default Home;
