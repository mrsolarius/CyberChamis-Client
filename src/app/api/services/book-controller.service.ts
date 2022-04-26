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

import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findById
   */
  static readonly FindByIdPath = '/api/book/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Book>> {

    const rb = new RequestBuilder(this.rootUrl, BookControllerService.FindByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Book>;
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
    id: number;
  }): Observable<Book> {

    return this.findById$Response(params).pipe(
      map((r: StrictHttpResponse<Book>) => r.body as Book)
    );
  }

  /**
   * Path part for operation updateBook
   */
  static readonly UpdateBookPath = '/api/book/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBook$Response(params: {
    id: string;
    body: Book
  }): Observable<StrictHttpResponse<Book>> {

    const rb = new RequestBuilder(this.rootUrl, BookControllerService.UpdateBookPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Book>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBook(params: {
    id: string;
    body: Book
  }): Observable<Book> {

    return this.updateBook$Response(params).pipe(
      map((r: StrictHttpResponse<Book>) => r.body as Book)
    );
  }

  /**
   * Path part for operation findBooks
   */
  static readonly FindBooksPath = '/api/book/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findBooks()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBooks$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Book>>> {

    const rb = new RequestBuilder(this.rootUrl, BookControllerService.FindBooksPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Book>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findBooks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBooks(params?: {
  }): Observable<Array<Book>> {

    return this.findBooks$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Book>>) => r.body as Array<Book>)
    );
  }

  /**
   * Path part for operation createBook
   */
  static readonly CreateBookPath = '/api/book/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBook$Response(params: {
    body: Book
  }): Observable<StrictHttpResponse<Book>> {

    const rb = new RequestBuilder(this.rootUrl, BookControllerService.CreateBookPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Book>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBook(params: {
    body: Book
  }): Observable<Book> {

    return this.createBook$Response(params).pipe(
      map((r: StrictHttpResponse<Book>) => r.body as Book)
    );
  }

}
