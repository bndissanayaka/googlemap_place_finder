import React, { useMemo, useState } from "react";

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import PlacesAutocomplete from "./placesAutocomplete";

function Map() {
  const [selected, setSelected] = useState({ lat: 44, lng: -80 });
  const center = selected;
  return (
    <div className="lv-map-container">
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        <MarkerF key={selected} position={selected} />
      </GoogleMap>
    </div>
  );
}

export default Map;
