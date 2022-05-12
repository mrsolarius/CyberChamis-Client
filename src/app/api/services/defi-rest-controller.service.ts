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

import { ChamisCount } from '../models/chamis-count';
import { DefiCount } from '../models/defi-count';
import { DefiDto } from '../models/defi-dto';
import { TagCount } from '../models/tag-count';

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
  }): Observable<StrictHttpResponse<DefiDto>> {

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
        return r as StrictHttpResponse<DefiDto>;
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
  }): Observable<DefiDto> {

    return this.getById$Response(params).pipe(
      map((r: StrictHttpResponse<DefiDto>) => r.body as DefiDto)
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
    body: DefiDto
  }): Observable<StrictHttpResponse<DefiDto>> {

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
        return r as StrictHttpResponse<DefiDto>;
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
    body: DefiDto
  }): Observable<DefiDto> {

    return this.updateDefi$Response(params).pipe(
      map((r: StrictHttpResponse<DefiDto>) => r.body as DefiDto)
    );
  }

  /**
   * Path part for operation deleteDefi
   */
  static readonly DeleteDefiPath = '/api/defis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDefi()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDefi$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.DeleteDefiPath, 'delete');
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
    body: DefiDto
  }): Observable<StrictHttpResponse<DefiDto>> {

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
        return r as StrictHttpResponse<DefiDto>;
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
    body: DefiDto
  }): Observable<DefiDto> {

    return this.createDefi$Response(params).pipe(
      map((r: StrictHttpResponse<DefiDto>) => r.body as DefiDto)
    );
  }

  /**
   * Path part for operation getTagCount
   */
  static readonly GetTagCountPath = '/api/defis/tags/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTagCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTagCount$Response(params?: {
  }): Observable<StrictHttpResponse<Array<TagCount>>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.GetTagCountPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TagCount>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTagCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTagCount(params?: {
  }): Observable<Array<TagCount>> {

    return this.getTagCount$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TagCount>>) => r.body as Array<TagCount>)
    );
  }

  /**
   * Path part for operation getDefisBy
   */
  static readonly GetDefisByPath = '/api/defis/tag/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDefisBy()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDefisBy$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Array<DefiDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.GetDefisByPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `getDefisBy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDefisBy(params: {
    id: string;
  }): Observable<Array<DefiDto>> {

    return this.getDefisBy$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DefiDto>>) => r.body as Array<DefiDto>)
    );
  }

  /**
   * Path part for operation getByChami
   */
  static readonly GetByChamiPath = '/api/defis/defi/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByChami()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByChami$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Array<DefiDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.GetByChamiPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `getByChami$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByChami(params: {
    id: number;
  }): Observable<Array<DefiDto>> {

    return this.getByChami$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DefiDto>>) => r.body as Array<DefiDto>)
    );
  }

  /**
   * Path part for operation getDefisByUserStatut
   */
  static readonly GetDefisByUserStatutPath = '/api/defis/defi/{idgoogle}/{statut}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDefisByUserStatut()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDefisByUserStatut$Response(params: {
    idgoogle: string;
    statut: 'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE';
  }): Observable<StrictHttpResponse<Array<DefiDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.GetDefisByUserStatutPath, 'get');
    if (params) {
      rb.path('idgoogle', params.idgoogle, {});
      rb.path('statut', params.statut, {});
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
   * To access the full response (for headers, for example), `getDefisByUserStatut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDefisByUserStatut(params: {
    idgoogle: string;
    statut: 'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE';
  }): Observable<Array<DefiDto>> {

    return this.getDefisByUserStatut$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DefiDto>>) => r.body as Array<DefiDto>)
    );
  }

  /**
   * Path part for operation getNbDefiByAuteur
   */
  static readonly GetNbDefiByAuteurPath = '/api/defis/defi/nbDefiByChami';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNbDefiByAuteur()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNbDefiByAuteur$Response(params?: {
  }): Observable<StrictHttpResponse<Array<DefiCount>>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.GetNbDefiByAuteurPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DefiCount>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNbDefiByAuteur$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNbDefiByAuteur(params?: {
  }): Observable<Array<DefiCount>> {

    return this.getNbDefiByAuteur$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DefiCount>>) => r.body as Array<DefiCount>)
    );
  }

  /**
   * Path part for operation getDefiNbChamis
   */
  static readonly GetDefiNbChamisPath = '/api/defis/defi/nbChamis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDefiNbChamis()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDefiNbChamis$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ChamisCount>>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.GetDefiNbChamisPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ChamisCount>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDefiNbChamis$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDefiNbChamis(params?: {
  }): Observable<Array<ChamisCount>> {

    return this.getDefiNbChamis$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ChamisCount>>) => r.body as Array<ChamisCount>)
    );
  }

  /**
   * Path part for operation deleteCommentaireFromDefi
   */
  static readonly DeleteCommentaireFromDefiPath = '/api/defis/commentaire/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCommentaireFromDefi()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCommentaireFromDefi$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DefiRestControllerService.DeleteCommentaireFromDefiPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteCommentaireFromDefi$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCommentaireFromDefi(params: {
    id: number;
  }): Observable<void> {

    return this.deleteCommentaireFromDefi$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
