/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Defi } from '../models/defi';

@Injectable({
  providedIn: 'root',
})
export class DefiRestControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findById
   */
  static readonly FindByIdPath = '/api/defis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Defi>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.FindByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Defi>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: {
    id: string;
  }): Observable<Defi> {

    return this.findById$Response(params).pipe(
      map((r: StrictHttpResponse<Defi>) => r.body as Defi)
    );
  }

  /**
   * Path part for operation putChami
   */
  static readonly PutChamiPath = '/api/defis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putChami()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putChami$Response(params: {
    id: string;
    body: Defi
  }): Observable<StrictHttpResponse<Defi>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.PutChamiPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Defi>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putChami$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putChami(params: {
    id: string;
    body: Defi
  }): Observable<Defi> {

    return this.putChami$Response(params).pipe(
      map((r: StrictHttpResponse<Defi>) => r.body as Defi)
    );
  }

  /**
   * Path part for operation getDefis
   */
  static readonly GetDefisPath = '/api/defis/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDefis()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDefis$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Defi>>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.GetDefisPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Defi>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDefis$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDefis(params?: {
  }): Observable<Array<Defi>> {

    return this.getDefis$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Defi>>) => r.body as Array<Defi>)
    );
  }

  /**
   * Path part for operation createDefi
   */
  static readonly CreateDefiPath = '/api/defis/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDefi()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDefi$Response(params: {
    body: Defi
  }): Observable<StrictHttpResponse<Defi>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.CreateDefiPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Defi>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDefi$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDefi(params: {
    body: Defi
  }): Observable<Defi> {

    return this.createDefi$Response(params).pipe(
      map((r: StrictHttpResponse<Defi>) => r.body as Defi)
    );
  }

}
