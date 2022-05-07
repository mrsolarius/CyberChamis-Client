export interface Stops {
  type: "stops";
  gtfsId: string;
  id: string;
  code: string;
  city: string;
  name: string;
  clusterGtfsId: string;
}

export interface featureStop {
  type: "Feature";
  properties: Stops;
  geometry: {
    type: "Point";
    coordinates: number[];
  }
}
