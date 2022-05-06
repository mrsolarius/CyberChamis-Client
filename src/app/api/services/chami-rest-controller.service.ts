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

import { ChamiDto } from '../models/chami-dto';

@Injectable({
  providedIn: 'root',
})
export class ChamiRestControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getById1
   */
  static readonly GetById1Path = '/api/chamis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ChamiDto>> {

    const rb = new RequestBuilder(this.rootUrl, ChamiRestControllerService.GetById1Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ChamiDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById1(params: {
    id: number;
  }): Observable<ChamiDto> {

    return this.getById1$Response(params).pipe(
      map((r: StrictHttpResponse<ChamiDto>) => r.body as ChamiDto)
    );
  }

  /**
   * Path part for operation updateChami
   */
  static readonly UpdateChamiPath = '/api/chamis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateChami()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateChami$Response(params: {
    id: number;
    body: ChamiDto
  }): Observable<StrictHttpResponse<ChamiDto>> {

    const rb = new RequestBuilder(this.rootUrl, ChamiRestControllerService.UpdateChamiPath, 'put');
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
        return r as StrictHttpResponse<ChamiDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateChami$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateChami(params: {
    id: number;
    body: ChamiDto
  }): Observable<ChamiDto> {

    return this.updateChami$Response(params).pipe(
      map((r: StrictHttpResponse<ChamiDto>) => r.body as ChamiDto)
    );
  }

  /**
   * Path part for operation deleteChami
   */
  static readonly DeleteChamiPath = '/api/chamis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteChami()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteChami$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ChamiRestControllerService.DeleteChamiPath, 'delete');
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
    id: number;
  }): Observable<void> {

    return this.deleteChami$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getByIdGoogle
   */
  static readonly GetByIdGooglePath = '/api/chamis/google/{idGoogle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByIdGoogle()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByIdGoogle$Response(params: {
    idGoogle: string;
  }): Observable<StrictHttpResponse<ChamiDto>> {

    const rb = new RequestBuilder(this.rootUrl, ChamiRestControllerService.GetByIdGooglePath, 'get');
    if (params) {
      rb.path('idGoogle', params.idGoogle, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ChamiDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getByIdGoogle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByIdGoogle(params: {
    idGoogle: string;
  }): Observable<ChamiDto> {

    return this.getByIdGoogle$Response(params).pipe(
      map((r: StrictHttpResponse<ChamiDto>) => r.body as ChamiDto)
    );
  }

  /**
   * Path part for operation updateChami1
   */
  static readonly UpdateChami1Path = '/api/chamis/google/{idGoogle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateChami1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateChami1$Response(params: {
    idGoogle: string;
    body: ChamiDto
  }): Observable<StrictHttpResponse<ChamiDto>> {
    const rb = new RequestBuilder(this.rootUrl, ChamiRestControllerService.UpdateChami1Path, 'put');
    if (params) {
      rb.path('idGoogle', params.idGoogle, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ChamiDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateChami1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateChami1(params: {
    idGoogle: string;
    body: ChamiDto
  }): Observable<ChamiDto> {

    return this.updateChami1$Response(params).pipe(
      map((r: StrictHttpResponse<ChamiDto>) => r.body as ChamiDto)
    );
  }

  /**
   * Path part for operation deleteChami1
   */
  static readonly DeleteChami1Path = '/api/chamis/google/{idGoogle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteChami1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteChami1$Response(params: {
    idGoogle: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ChamiRestControllerService.DeleteChami1Path, 'delete');
    if (params) {
      rb.path('idGoogle', params.idGoogle, {});
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
   * To access the full response (for headers, for example), `deleteChami1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteChami1(params: {
    idGoogle: string;
  }): Observable<void> {

    return this.deleteChami1$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getChamis
   */
  static readonly GetChamisPath = '/api/chamis/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getChamis()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChamis$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ChamiDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ChamiRestControllerService.GetChamisPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ChamiDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getChamis$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChamis(params?: {
  }): Observable<Array<ChamiDto>> {

    return this.getChamis$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ChamiDto>>) => r.body as Array<ChamiDto>)
    );
  }

  /**
   * Path part for operation createChami
   */
  static readonly CreateChamiPath = '/api/chamis/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createChami()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createChami$Response(params: {
    body: ChamiDto
  }): Observable<StrictHttpResponse<ChamiDto>> {

    const rb = new RequestBuilder(this.rootUrl, ChamiRestControllerService.CreateChamiPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ChamiDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createChami$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createChami(params: {
    body: ChamiDto
  }): Observable<ChamiDto> {

    return this.createChami$Response(params).pipe(
      map((r: StrictHttpResponse<ChamiDto>) => r.body as ChamiDto)
    );
  }

}
