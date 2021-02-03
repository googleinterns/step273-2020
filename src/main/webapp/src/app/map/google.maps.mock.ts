//throw this name space in the global area 
 export namespace google.maps {
  //later, created with the actual name of the required mock 
  export class Map {
    verifyMock = true;
    constructor(public opts: any) { }
  }

  export class Marker {
    verifyMock = true;
    constructor(public opts: any) { }
  }

  export enum MapTypeId {
    HYBRID,
    ROADMAP,
    SATELLITE,
    TERRAIN
  }
  //and other mocks ...
  //see @types/googlemaps for the declarations
 }
//get angry with lint once not transferred to any. 
 const _global: any = global;
//assignment! ! 
 _global.google = google;
