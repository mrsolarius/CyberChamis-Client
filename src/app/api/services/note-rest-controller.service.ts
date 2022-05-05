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

import { NoteDto } from '../models/note-dto';

@Injectable({
  providedIn: 'root',
})
export class NoteRestControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getNote
   */
  static readonly GetNotePath = '/api/note/{defiId}/{utilistateurId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNote()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNote$Response(params: {
    defiId: string;
    utilistateurId: number;
  }): Observable<StrictHttpResponse<NoteDto>> {

    const rb = new RequestBuilder(this.rootUrl, NoteRestControllerService.GetNotePath, 'get');
    if (params) {
      rb.path('defiId', params.defiId, {});
      rb.path('utilistateurId', params.utilistateurId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NoteDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNote$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNote(params: {
    defiId: string;
    utilistateurId: number;
  }): Observable<NoteDto> {

    return this.getNote$Response(params).pipe(
      map((r: StrictHttpResponse<NoteDto>) => r.body as NoteDto)
    );
  }

  /**
   * Path part for operation updateNote
   */
  static readonly UpdateNotePath = '/api/note/{defiId}/{utilistateurId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateNote()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateNote$Response(params: {
    defiId: string;
    utilistateurId: number;
    body: number
  }): Observable<StrictHttpResponse<NoteDto>> {

    const rb = new RequestBuilder(this.rootUrl, NoteRestControllerService.UpdateNotePath, 'put');
    if (params) {
      rb.path('defiId', params.defiId, {});
      rb.path('utilistateurId', params.utilistateurId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NoteDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateNote$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateNote(params: {
    defiId: string;
    utilistateurId: number;
    body: number
  }): Observable<NoteDto> {

    return this.updateNote$Response(params).pipe(
      map((r: StrictHttpResponse<NoteDto>) => r.body as NoteDto)
    );
  }

  /**
   * Path part for operation createNote
   */
  static readonly CreateNotePath = '/api/note/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNote()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNote$Response(params: {
    body: NoteDto
  }): Observable<StrictHttpResponse<NoteDto>> {

    const rb = new RequestBuilder(this.rootUrl, NoteRestControllerService.CreateNotePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NoteDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createNote$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNote(params: {
    body: NoteDto
  }): Observable<NoteDto> {

    return this.createNote$Response(params).pipe(
      map((r: StrictHttpResponse<NoteDto>) => r.body as NoteDto)
    );
  }

}
