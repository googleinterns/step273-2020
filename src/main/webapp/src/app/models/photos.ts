export interface Photos {
  // photoReference is a string used to identify the photo when you perform a Photo request.
  photoReference: string;

  // Maximum height of the image.
  height: number;

  // Maximum width of the image.
  width: number;

  // htmlAttributions contains any required attributions (may be empty).
  htmlAttributions: string[];
}
