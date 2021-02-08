export interface HiddenGem {
  geometry: geometry;
  name: string;
  icon: string;
  placeId: string;
  rating: number;
  types: string[];
  openingHours: openingHours;
  photos: photos[];
  vicinity: string;
  permanentlyClosed: boolean;
  userRatingsTotal: number;
  businessStatus: string;
}

interface photos {
  photoReference: string;
  height: number;
  width: number;
  htmlAttributions: string[];
}

interface location {
  lat: number;
  lng: number;
}

interface geometry {
  location: location;
  viewport: {
    northeast: location;
    southwest: location;
  }
}

interface openingHours {
  openNow: boolean;
}
