import { useEffect, useRef, useState } from 'react';

import { Box } from '@chakra-ui/layout';

import tt, {
  Map,
  Marker,
} from '@tomtom-international/web-sdk-maps';

import { ENV_TOMTOM_API_KEY } from '../constants/envs';

export type Tomtom = typeof tt;
export type TomtomMapCoordinate = Record<'latitude' | 'longitude', number> & {
  markerSrc?: string;
};

const createMarker = (ttInstance: Tomtom) => (
  coordinate: TomtomMapCoordinate
): Marker => {
  if (coordinate.markerSrc) {
    const img = document.createElement('img');
    img.src = coordinate.markerSrc;
    img.width = 120;
    img.height = 120;

    const marker = new ttInstance.Marker({ element: img }).setLngLat([
      coordinate.longitude,
      coordinate.latitude,
    ]);
    return marker;
  }

  const marker = new ttInstance.Marker().setLngLat([
    coordinate.longitude,
    coordinate.latitude,
  ]);
  return marker;
};


export type TomtomMapProps = {
  coordinates: TomtomMapCoordinate[];
};
export const TomtomMap = ({ coordinates }: TomtomMapProps) => {
  const mapElement = useRef(null);
  const [tt, setTt] = useState<Tomtom | null>(null);
  const ttMap = useRef<Map | null>(null);

  // Load Tomtom on client only via dynamic import
  useEffect(() => {
    if (tt) {
      return;
    }

    const loadModule = async () => {
      const ttModule = (await import('@tomtom-international/web-sdk-maps'))
        .default;
      setTt(ttModule);
    };

    loadModule();
  }, [tt]);

  // Initialize Tomtom Map
  useEffect(() => {
    if (!tt) {
      return;
    }

    const mapInstance: Map = tt.map({
      key: ENV_TOMTOM_API_KEY,
      container: mapElement.current,
      zoom: 9,
    });

    ttMap.current = mapInstance;
  }, [tt]);

  // Add marker coordinates in the Tomtom Map
  useEffect(() => {
    if (!tt) {
      return;
    }

    if (!ttMap.current) {
      return;
    }

    if (!coordinates.length) {
      return;
    }

    const map = ttMap.current;

    const createMarkerAndAddToMap = (map: Map) => (coordinate: TomtomMapCoordinate) => {
      const marker = createMarker(tt)(coordinate);
      marker.addTo(map);

      return marker;
    };

    // Fit all markers to the map
    const bounds = coordinates.reduce((accumulator, coordinate) => {
      const marker = createMarkerAndAddToMap(map)(coordinate);
      accumulator.extend(marker.getLngLat());

      return accumulator;
    }, new tt.LngLatBounds())

    map.fitBounds(bounds, { padding: 50 });
  }, [coordinates, tt]);

  return <Box ref={mapElement} height="100%" />;
};
