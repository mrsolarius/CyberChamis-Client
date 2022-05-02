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
import { DefiDto } from '../models/defi-dto';

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
   * Path part for operation getById
   */
  static readonly GetByIdPath = '/api/defis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Defi>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.GetByIdPath, 'get');
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
   * To access the full response (for headers, for example), `getById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById(params: {
    id: string;
  }): Observable<Defi> {

    return this.getById$Response(params).pipe(
      map((r: StrictHttpResponse<Defi>) => r.body as Defi)
    );
  }

  /**
   * Path part for operation updateDefi
   */
  static readonly UpdateDefiPath = '/api/defis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDefi()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDefi$Response(params: {
    id: string;
    body: Defi
  }): Observable<StrictHttpResponse<Defi>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.UpdateDefiPath, 'put');
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
   * To access the full response (for headers, for example), `updateDefi$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDefi(params: {
    id: string;
    body: Defi
  }): Observable<Defi> {

    return this.updateDefi$Response(params).pipe(
      map((r: StrictHttpResponse<Defi>) => r.body as Defi)
    );
  }

  /**
   * Path part for operation deleteChami
   */
  static readonly DeleteChamiPath = '/api/defis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteChami()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteChami$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.DeleteChamiPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteChami$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteChami(params: {
    id: string;
  }): Observable<void> {

    return this.deleteChami$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
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
  }): Observable<StrictHttpResponse<Array<DefiDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.GetDefisPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DefiDto>>;
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
  }): Observable<Array<DefiDto>> {

    return this.getDefis$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DefiDto>>) => r.body as Array<DefiDto>)
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
