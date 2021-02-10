import { Geometry } from './geometry';
import { Photos } from './photos';
import { OpeningHours } from './openingHours';

// This interface contains the details of a hidden gem.
export interface HiddenGem {
  // Location coordinates of the place.
  geometry: Geometry;

  // String name of the place.
  name: string;

  // String of the URL of a suggested icon which may be displayed to the user when indicating this result on a map.
  icon: string;

  // String ID of the place.
  placeId: string;

  // Star rating of the place (from 1 to 5).
  rating: number;

  // Contains an array of feature types describing the given result.
  // See the list of supported types:https://developers.google.com/places/web-service/supported_types#table2
  types: string[];

  // Indicate whether the place is open at current time.
  openingHours: OpeningHours;

  // Array of photo objects, each containing a reference to an image.
  photos: Photos[];

  // Simplified address for the place, including the street name, street number, and locality.
  vicinity: string;

  // Boolean flag indicating whether the place has shut down either permanently or temporarily (value true).
  permanentlyClosed: boolean;

  // Number of reviews the place has on Google Maps.
  userRatingsTotal: number;

  // Indicates the operational status of the place (OPERATIONAL, CLOSED_TEMPORARILY, CLOSED_PERMANENTLY)
  businessStatus: string;
}
