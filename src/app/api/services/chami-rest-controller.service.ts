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

import { Chami } from '../models/chami';

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
   * Path part for operation findById1
   */
  static readonly FindById1Path = '/api/chamis/{login}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1$Response(params: {
    login: string;
  }): Observable<StrictHttpResponse<Chami>> {

    const rb = new RequestBuilder(this.rootUrl, ChamiRestControllerService.FindById1Path, 'get');
    if (params) {
      rb.path('login', params.login, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Chami>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1(params: {
    login: string;
  }): Observable<Chami> {

    return this.findById1$Response(params).pipe(
      map((r: StrictHttpResponse<Chami>) => r.body as Chami)
    );
  }

  /**
   * Path part for operation putChami1
   */
  static readonly PutChami1Path = '/api/chamis/{login}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putChami1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putChami1$Response(params: {
    login: string;
    body: Chami
  }): Observable<StrictHttpResponse<Chami>> {

    const rb = new RequestBuilder(this.rootUrl, ChamiRestControllerService.PutChami1Path, 'put');
    if (params) {
      rb.path('login', params.login, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Chami>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putChami1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putChami1(params: {
    login: string;
    body: Chami
  }): Observable<Chami> {

    return this.putChami1$Response(params).pipe(
      map((r: StrictHttpResponse<Chami>) => r.body as Chami)
    );
  }

  /**
   * Path part for operation createChami
   */
  static readonly CreateChamiPath = '/api/chamis/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createChami()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createChami$Response(params: {
    body: Chami
  }): Observable<StrictHttpResponse<Chami>> {

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
        return r as StrictHttpResponse<Chami>;
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
    body: Chami
  }): Observable<Chami> {

    return this.createChami$Response(params).pipe(
      map((r: StrictHttpResponse<Chami>) => r.body as Chami)
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
  }): Observable<StrictHttpResponse<Array<Chami>>> {

    const rb = new RequestBuilder(this.rootUrl, ChamiRestControllerService.GetChamisPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Chami>>;
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
  }): Observable<Array<Chami>> {

    return this.getChamis$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Chami>>) => r.body as Array<Chami>)
    );
  }

}
