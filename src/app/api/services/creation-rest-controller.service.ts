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

import { DefiCreateDto } from '../models/defi-create-dto';

@Injectable({
  providedIn: 'root',
})
export class CreationRestControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createOrUpdateDefi
   */
  static readonly CreateOrUpdateDefiPath = '/api/defibuilder/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrUpdateDefi()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrUpdateDefi$Response(params: {
    body: DefiCreateDto
  }): Observable<StrictHttpResponse<DefiCreateDto>> {

    const rb = new RequestBuilder(this.rootUrl, CreationRestControllerService.CreateOrUpdateDefiPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DefiCreateDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createOrUpdateDefi$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrUpdateDefi(params: {
    body: DefiCreateDto
  }): Observable<DefiCreateDto> {

    return this.createOrUpdateDefi$Response(params).pipe(
      map((r: StrictHttpResponse<DefiCreateDto>) => r.body as DefiCreateDto)
    );
  }

  /**
   * Path part for operation createDefi1
   */
  static readonly CreateDefi1Path = '/api/defibuilder/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDefi1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDefi1$Response(params: {
    body: DefiCreateDto
  }): Observable<StrictHttpResponse<DefiCreateDto>> {

    const rb = new RequestBuilder(this.rootUrl, CreationRestControllerService.CreateDefi1Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DefiCreateDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDefi1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDefi1(params: {
    body: DefiCreateDto
  }): Observable<DefiCreateDto> {

    return this.createDefi1$Response(params).pipe(
      map((r: StrictHttpResponse<DefiCreateDto>) => r.body as DefiCreateDto)
    );
  }

  /**
   * Path part for operation getFullDefi
   */
  static readonly GetFullDefiPath = '/api/defibuilder/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFullDefi()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFullDefi$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<DefiCreateDto>> {

    const rb = new RequestBuilder(this.rootUrl, CreationRestControllerService.GetFullDefiPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DefiCreateDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFullDefi$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFullDefi(params: {
    id: string;
  }): Observable<DefiCreateDto> {

    return this.getFullDefi$Response(params).pipe(
      map((r: StrictHttpResponse<DefiCreateDto>) => r.body as DefiCreateDto)
    );
  }

  /**
   * Path part for operation deleteDefi
   */
  static readonly DeleteDefiPath = '/api/defibuilder/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDefi()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDefi$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CreationRestControllerService.DeleteDefiPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteDefi$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDefi(params: {
    id: string;
  }): Observable<void> {

    return this.deleteDefi$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
