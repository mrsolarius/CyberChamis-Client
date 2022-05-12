import {Injectable} from '@angular/core';
import {RequestBuilder} from "../api-local/request-builder";
import {filter, map} from "rxjs/operators";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {StrictHttpResponse} from "../api-local/strict-http-response";
import {Observable} from "rxjs";
import {GeoJSON} from "geojson";

@Injectable({
  providedIn: 'root'
})
export class MetroboliliteService {

  rootUrl = 'https://data.mobilites-m.fr';

  constructor(private http: HttpClient) {}

  static readonly GetStops = '/api-local/points/json'

  getPoints$Response(params: {
    types: string,
    codes?: string,
    query?: string,
    xmin?: number,
    xmax?: number,
    ymin?: number,
    ymax?: number,
  }) {
    const rb = new RequestBuilder(this.rootUrl, MetroboliliteService.GetStops, 'get');
    if (params) {
      rb.query('types', params.types);
      rb.query('codes', params.codes);
      rb.query('query', params.query);
      rb.query('xmin', params.xmin);
      rb.query('xmax', params.xmax);
      rb.query('ymin', params.ymin);
      rb.query('ymax', params.ymax);
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GeoJSON>;
      })
    );
  }

  getPoints(params: {
    types: string,
    codes?: string,
    query?: string,
    xmin?: number,
    xmax?: number,
    ymin?: number,
    ymax?: number,
  }): Observable<GeoJSON> {
    return this.getPoints$Response(params).pipe(
      map((r: StrictHttpResponse<GeoJSON>) => r.body as GeoJSON));
  }
}
