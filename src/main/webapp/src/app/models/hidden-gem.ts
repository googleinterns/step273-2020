import { OpeningHours } from './openingHours';

// This interface contains the details of a hidden gem.
export interface HiddenGem {

  // String ID of the place.
  placeId: string;

  // String name of the place.
  name: string;

  // Contains an array of feature types describing the given result.
  // See the list of supported types:https://developers.google.com/places/web-service/supported_types#table2
  types: string[];

  // Simplified address for the place, including the street name, street number, and locality.
  address: string;

  // Location latitude of the place.
  lat: number;

  // Location longitude of the place.
  lng: number;

  // Price level of the place
  priceLevel: string;

  // Star rating of the place (from 1 to 5).
  rating: number;

  // Number of reviews the place has on Google Maps.
  userRatingsTotal: number;

  // Website url of the place.
  website: string;

  // Indicate whether the place is open at current time.
  openingHours: OpeningHours;

  // photoReference is a string used to identify the photo when you perform a Photo request.
  photoReference: string;

  // htmlAttributions contains any required attributions (may be empty).
  htmlAttributions: string[];

  // Boolean flag indicating whether the place has shut down either permanently or temporarily (value true).
  permanentlyClosed: boolean;

  // Indicates the operational status of the place (OPERATIONAL, CLOSED_TEMPORARILY, CLOSED_PERMANENTLY)
  businessStatus: string;

  matchScore: number;

}
