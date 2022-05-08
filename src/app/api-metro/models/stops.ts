import {Feature, Point} from "geojson";
import {ArretDto} from "../../api/models/arret-dto";

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

export function castFeatureStopToArretDto(input:FeatureStop):ArretDto{
  return {
    codeArret:input.properties.id,
    nomArret:input.properties.name,
    latitude:input.geometry.coordinates[0],
    longitude:input.geometry.coordinates[1],
    ville:input.properties.city
  }
}
