import { useRef, useEffect } from "react";
import { LatLng, MarkerInfo } from "./types";
import { createLogger } from "../utils/logger.utils";
import { randomID } from "../utils/random.utils";

const log = createLogger("GoogleMap -->");

interface Props {
  latlng: LatLng;
  zoom: number;
  markerInfo: MarkerInfo
}

export function GoogleMap({ latlng, zoom, markerInfo }: Props) {
  const mapDiv = useRef<HTMLDivElement | null>(null);
  const map = useRef<google.maps.Map | null>(null);
  
  async function createMap() {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    map.current = new Map(mapDiv.current as HTMLDivElement, {
      center: latlng,
      zoom: 8,
      mapId: randomID()
    });
  }

  useEffect( () => {
    createMap();
  }, []);

  useEffect(() => {
    log("useEffect, latlng:",latlng);
    if (map.current) {
      map.current.setCenter(latlng);
    }
  }, [latlng]);

  useEffect(() => {
    log("useEffect zoom:", zoom);
    if (map.current) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);


  async function addMarker() {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const marker = new AdvancedMarkerElement({
      position: map.current?.getCenter(),
      map: map.current,
      title: markerInfo.title
    });
    // const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.InfoWindow;
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="text-align:center">
            <h2>${markerInfo.title}</h2>
            <h3>Type: ${markerInfo.type}</h3>
            <br/>
            <img src="https://picsum.photos/200/100?random"/>
            <br/>
            <br/>
            <p>Macaroon halvah cotton candy tiramisu I love.<br/> 
            Croissant halvah bonbon powder gingerbread <br/>
            jujubes icing apple pie. Pastry pudding toffee.</p>
            <br/>
        </div>`,
    });
    marker.addListener("click", function () {
      infoWindow.open(map.current, marker);
    });
  }
  useEffect(() => {
    if (!map.current) return;
    addMarker();
  }, [markerInfo]);


  return <div ref={mapDiv} className="map-box" />;
}

