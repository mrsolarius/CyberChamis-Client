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

import { CommentaireDto } from '../models/commentaire-dto';

@Injectable({
  providedIn: 'root',
})
export class CommentaireRestControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createOrUpdateCom
   */
  static readonly CreateOrUpdateComPath = '/api/commentaires/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrUpdateCom()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrUpdateCom$Response(params: {
    body: CommentaireDto
  }): Observable<StrictHttpResponse<CommentaireDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommentaireRestControllerService.CreateOrUpdateComPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommentaireDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createOrUpdateCom$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrUpdateCom(params: {
    body: CommentaireDto
  }): Observable<CommentaireDto> {

    return this.createOrUpdateCom$Response(params).pipe(
      map((r: StrictHttpResponse<CommentaireDto>) => r.body as CommentaireDto)
    );
  }

  /**
   * Path part for operation getCommentairesByDefiAndChami
   */
  static readonly GetCommentairesByDefiAndChamiPath = '/api/commentaires/{idDefi}/{idChami}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCommentairesByDefiAndChami()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentairesByDefiAndChami$Response(params: {
    idDefi: string;
    idChami: number;
  }): Observable<StrictHttpResponse<Array<CommentaireDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CommentaireRestControllerService.GetCommentairesByDefiAndChamiPath, 'get');
    if (params) {
      rb.path('idDefi', params.idDefi, {});
      rb.path('idChami', params.idChami, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CommentaireDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCommentairesByDefiAndChami$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentairesByDefiAndChami(params: {
    idDefi: string;
    idChami: number;
  }): Observable<Array<CommentaireDto>> {

    return this.getCommentairesByDefiAndChami$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CommentaireDto>>) => r.body as Array<CommentaireDto>)
    );
  }

  /**
   * Path part for operation getCommentaires
   */
  static readonly GetCommentairesPath = '/api/commentaires/{defiId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCommentaires()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentaires$Response(params: {
    defiId: string;
  }): Observable<StrictHttpResponse<Array<CommentaireDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CommentaireRestControllerService.GetCommentairesPath, 'get');
    if (params) {
      rb.path('defiId', params.defiId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CommentaireDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCommentaires$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentaires(params: {
    defiId: string;
  }): Observable<Array<CommentaireDto>> {

    return this.getCommentaires$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CommentaireDto>>) => r.body as Array<CommentaireDto>)
    );
  }

  /**
   * Path part for operation getCommentaireById
   */
  static readonly GetCommentaireByIdPath = '/api/commentaires/commentaire/{idCom}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCommentaireById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentaireById$Response(params: {
    idCom: number;
  }): Observable<StrictHttpResponse<CommentaireDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommentaireRestControllerService.GetCommentaireByIdPath, 'get');
    if (params) {
      rb.path('idCom', params.idCom, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommentaireDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCommentaireById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentaireById(params: {
    idCom: number;
  }): Observable<CommentaireDto> {

    return this.getCommentaireById$Response(params).pipe(
      map((r: StrictHttpResponse<CommentaireDto>) => r.body as CommentaireDto)
    );
  }

  /**
   * Path part for operation getCommentairesByChami
   */
  static readonly GetCommentairesByChamiPath = '/api/commentaires/chami/{idChami}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCommentairesByChami()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentairesByChami$Response(params: {
    idChami: number;
  }): Observable<StrictHttpResponse<Array<CommentaireDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CommentaireRestControllerService.GetCommentairesByChamiPath, 'get');
    if (params) {
      rb.path('idChami', params.idChami, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CommentaireDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCommentairesByChami$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentairesByChami(params: {
    idChami: number;
  }): Observable<Array<CommentaireDto>> {

    return this.getCommentairesByChami$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CommentaireDto>>) => r.body as Array<CommentaireDto>)
    );
  }

}
