import { useState, useRef, MouseEvent } from "react";
import { TopBar } from "./top-bar";
import { GoogleMap } from "./google-map";
import { LatLng, MarkerInfo } from "./types";
import { createLogger } from "../utils/logger.utils";

const log = createLogger("App -->");

export function App() {

  const zoomInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  const typeInput = useRef<HTMLSelectElement>(null);

  const [latlng, setLatlng] = useState<LatLng>({
    lat: -34.397,
    lng: 150.644
  });

  const [zoom, setZoom] = useState(8);
  const [markerInfo, setMarkerInfo] = useState<MarkerInfo>({title:'',type:''});

  function reposition(event: MouseEvent) {
    const city = (event.target as HTMLElement).dataset.city;
    switch (city) {
      case "tel aviv":
        setLatlng({ lat: 32.0042938, lng: 34.7615399 });
        break;
      case "london":
        setLatlng({ lat: 51.528308, lng: -0.3817828 });
        break;
      case "paris":
        setLatlng({ lat: 48.8587741, lng: 2.2069754 });
        break;
      default:
        alert("Location not supported");
    }
  }

  // const updateZoom = (event: ChangeEvent) => {
  // const z = (event.target as HTMLInputElement).value;
  function updateZoom() {
    const z = zoomInput.current?.value;
    log({ z });
    setZoom(Number(z)); // parseInt(zoom); // +zoom;
  };

  function addMarker(){
    if(!titleInput.current || !typeInput.current ) return;
    setMarkerInfo({
      title: titleInput.current.value,
      type: typeInput.current.value
    });
  }

  function locate_me(){

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      
      function success(position: GeolocationPosition) {

          // const lat  = position.coords.latitude;
          // const lng  = position.coords.longitude;

          const { latitude: lat, longitude: lng } = position.coords;
          
          setLatlng({ lat, lng });
          setZoom(16);
      }
      
      function error(error: GeolocationPositionError) {
        log(`ERROR(${error.code}): ${error.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);
    
  }

  return (
    <div className="app">
      <TopBar>Google Maps Example in React</TopBar>
      <div className="hbox mb20">
        <span>City: &nbsp;</span>
        <button data-city="tel aviv" onClick={reposition}>Tel Aviv</button>
        <button data-city="paris" onClick={reposition}>Paris</button>
        <button data-city="london" onClick={reposition}>London</button>
        <span>Zoom: &nbsp;</span>
        <input ref={zoomInput}
          type="number"
          min="8"
          max="16"
          placeholder="8"
          onChange={updateZoom} />
        <button onClick={locate_me}>locate me</button>
      </div>
      <div className="hbox mb20">
        <span>Title: &nbsp;</span>
        <input
          ref={titleInput}
          type="text"
          className="title-input"
        />
        <select
          ref={typeInput}
          name="type"
          className="type-selector"
        >
          <option value="None">Type:</option>
          <option value="Barbecue">Barbecue </option>
          <option value="Buffet">Buffet </option>
          <option value="Brasserie">Brasserie</option>
          <option value="Cafe">Cafe</option>
          <option value="Casual">Casual</option>
          <option value="Chef">Chef</option>
          <option value="Diner">Diner</option>
          <option value="Ethnic">Ethnic</option>
          <option value="Fast food">Fast food</option>
          <option value="Kosher">Kosher</option>
          <option value="Pub">Pub</option>
        </select>
        <button onClick={addMarker}>Add Marker</button>
      </div>
      <GoogleMap latlng={latlng} 
                zoom={zoom}
                markerInfo={markerInfo}/>
    </div>
  );

}