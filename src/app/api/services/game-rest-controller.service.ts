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

import { IndiceDto } from '../models/indice-dto';
import { VisiteDto } from '../models/visite-dto';

@Injectable({
  providedIn: 'root',
})
export class GameRestControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation startGame
   */
  static readonly StartGamePath = '/api/game/start-game';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `startGame()` instead.
   *
   * This method doesn't expect any request body.
   */
  startGame$Response(params: {
    defiId: string;
    userId: number;
  }): Observable<StrictHttpResponse<VisiteDto>> {

    const rb = new RequestBuilder(this.rootUrl, GameRestControllerService.StartGamePath, 'post');
    if (params) {
      rb.query('defiId', params.defiId, {});
      rb.query('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VisiteDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `startGame$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  startGame(params: {
    defiId: string;
    userId: number;
  }): Observable<VisiteDto> {

    return this.startGame$Response(params).pipe(
      map((r: StrictHttpResponse<VisiteDto>) => r.body as VisiteDto)
    );
  }

  /**
   * Path part for operation revealIndice
   */
  static readonly RevealIndicePath = '/api/game/reveal-indice';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `revealIndice()` instead.
   *
   * This method doesn't expect any request body.
   */
  revealIndice$Response(params: {
    visiteId: number;
  }): Observable<StrictHttpResponse<IndiceDto>> {

    const rb = new RequestBuilder(this.rootUrl, GameRestControllerService.RevealIndicePath, 'post');
    if (params) {
      rb.query('visiteId', params.visiteId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IndiceDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `revealIndice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  revealIndice(params: {
    visiteId: number;
  }): Observable<IndiceDto> {

    return this.revealIndice$Response(params).pipe(
      map((r: StrictHttpResponse<IndiceDto>) => r.body as IndiceDto)
    );
  }

  /**
   * Path part for operation etapePrecedente
   */
  static readonly EtapePrecedentePath = '/api/game/previsous-etape';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `etapePrecedente()` instead.
   *
   * This method doesn't expect any request body.
   */
  etapePrecedente$Response(params: {
    visiteId: number;
  }): Observable<StrictHttpResponse<VisiteDto>> {

    const rb = new RequestBuilder(this.rootUrl, GameRestControllerService.EtapePrecedentePath, 'post');
    if (params) {
      rb.query('visiteId', params.visiteId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VisiteDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `etapePrecedente$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  etapePrecedente(params: {
    visiteId: number;
  }): Observable<VisiteDto> {

    return this.etapePrecedente$Response(params).pipe(
      map((r: StrictHttpResponse<VisiteDto>) => r.body as VisiteDto)
    );
  }

  /**
   * Path part for operation etapeSuivante
   */
  static readonly EtapeSuivantePath = '/api/game/next-etape';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `etapeSuivante()` instead.
   *
   * This method doesn't expect any request body.
   */
  etapeSuivante$Response(params: {
    visiteId: number;
  }): Observable<StrictHttpResponse<VisiteDto>> {

    const rb = new RequestBuilder(this.rootUrl, GameRestControllerService.EtapeSuivantePath, 'post');
    if (params) {
      rb.query('visiteId', params.visiteId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VisiteDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `etapeSuivante$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  etapeSuivante(params: {
    visiteId: number;
  }): Observable<VisiteDto> {

    return this.etapeSuivante$Response(params).pipe(
      map((r: StrictHttpResponse<VisiteDto>) => r.body as VisiteDto)
    );
  }

  /**
   * Path part for operation editStatus
   */
  static readonly EditStatusPath = '/api/game/edit-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  editStatus$Response(params: {
    visiteId: number;
    status: 'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE';
  }): Observable<StrictHttpResponse<'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE'>> {

    const rb = new RequestBuilder(this.rootUrl, GameRestControllerService.EditStatusPath, 'post');
    if (params) {
      rb.query('visiteId', params.visiteId, {});
      rb.query('status', params.status, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE'>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  editStatus(params: {
    visiteId: number;
    status: 'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE';
  }): Observable<'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE'> {

    return this.editStatus$Response(params).pipe(
      map((r: StrictHttpResponse<'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE'>) => r.body as 'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE')
    );
  }

  /**
   * Path part for operation createDefaultDefi
   */
  static readonly CreateDefaultDefiPath = '/api/game/create-default-defi';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDefaultDefi()` instead.
   *
   * This method doesn't expect any request body.
   */
  createDefaultDefi$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, GameRestControllerService.CreateDefaultDefiPath, 'post');
    if (params) {
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
   * To access the full response (for headers, for example), `createDefaultDefi$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createDefaultDefi(params?: {
  }): Observable<void> {

    return this.createDefaultDefi$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation checkResponse
   */
  static readonly CheckResponsePath = '/api/game/check-response';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkResponse()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkResponse$Response(params: {
    visiteId: number;
    response: string;
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, GameRestControllerService.CheckResponsePath, 'post');
    if (params) {
      rb.query('visiteId', params.visiteId, {});
      rb.query('response', params.response, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `checkResponse$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkResponse(params: {
    visiteId: number;
    response: string;
  }): Observable<boolean> {

    return this.checkResponse$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation getResponseIndices
   */
  static readonly GetResponseIndicesPath = '/api/game/response-indice';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResponseIndices()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResponseIndices$Response(params: {
    visiteId: number;
  }): Observable<StrictHttpResponse<Array<IndiceDto>>> {

    const rb = new RequestBuilder(this.rootUrl, GameRestControllerService.GetResponseIndicesPath, 'get');
    if (params) {
      rb.query('visiteId', params.visiteId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IndiceDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getResponseIndices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResponseIndices(params: {
    visiteId: number;
  }): Observable<Array<IndiceDto>> {

    return this.getResponseIndices$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IndiceDto>>) => r.body as Array<IndiceDto>)
    );
  }

  /**
   * Path part for operation getIndiceCost
   */
  static readonly GetIndiceCostPath = '/api/game/indice-cost';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIndiceCost()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIndiceCost$Response(params: {
    visiteId: number;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, GameRestControllerService.GetIndiceCostPath, 'get');
    if (params) {
      rb.query('visiteId', params.visiteId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIndiceCost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIndiceCost(params: {
    visiteId: number;
  }): Observable<number> {

    return this.getIndiceCost$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation getVisitesFinishedByChami
   */
  static readonly GetVisitesFinishedByChamiPath = '/api/game/get-visites-by-defi-chami/{idGoogle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVisitesFinishedByChami()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVisitesFinishedByChami$Response(params: {
    idGoogle: string;
  }): Observable<StrictHttpResponse<Array<VisiteDto>>> {

    const rb = new RequestBuilder(this.rootUrl, GameRestControllerService.GetVisitesFinishedByChamiPath, 'get');
    if (params) {
      rb.path('idGoogle', params.idGoogle, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<VisiteDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVisitesFinishedByChami$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVisitesFinishedByChami(params: {
    idGoogle: string;
  }): Observable<Array<VisiteDto>> {

    return this.getVisitesFinishedByChami$Response(params).pipe(
      map((r: StrictHttpResponse<Array<VisiteDto>>) => r.body as Array<VisiteDto>)
    );
  }

  /**
   * Path part for operation getVisites
   */
  static readonly GetVisitesPath = '/api/game/get-visite';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVisites()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVisites$Response(params: {
    visiteId: number;
  }): Observable<StrictHttpResponse<VisiteDto>> {

    const rb = new RequestBuilder(this.rootUrl, GameRestControllerService.GetVisitesPath, 'get');
    if (params) {
      rb.query('visiteId', params.visiteId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VisiteDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVisites$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVisites(params: {
    visiteId: number;
  }): Observable<VisiteDto> {

    return this.getVisites$Response(params).pipe(
      map((r: StrictHttpResponse<VisiteDto>) => r.body as VisiteDto)
    );
  }

  /**
   * Path part for operation visiteCourante
   */
  static readonly VisiteCourantePath = '/api/game/continue-visite';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `visiteCourante()` instead.
   *
   * This method doesn't expect any request body.
   */
  visiteCourante$Response(params: {
    defiId: string;
    userId: number;
  }): Observable<StrictHttpResponse<VisiteDto>> {

    const rb = new RequestBuilder(this.rootUrl, GameRestControllerService.VisiteCourantePath, 'get');
    if (params) {
      rb.query('defiId', params.defiId, {});
      rb.query('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VisiteDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `visiteCourante$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  visiteCourante(params: {
    defiId: string;
    userId: number;
  }): Observable<VisiteDto> {

    return this.visiteCourante$Response(params).pipe(
      map((r: StrictHttpResponse<VisiteDto>) => r.body as VisiteDto)
    );
  }

}
