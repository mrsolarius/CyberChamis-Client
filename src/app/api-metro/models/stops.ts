import {Feature, Point} from "geojson";

export interface Stops {
  type: "stops";
  gtfsId: string;
  id: string;
  code: string;
  city: string;
  name: string;
  clusterGtfsId: string;
}

export interface FeatureStop extends Feature<Point>{
  properties: Stops;
}
