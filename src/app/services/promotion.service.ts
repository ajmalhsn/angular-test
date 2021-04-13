import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import {Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import {  ProcessHTTPMsgService } from '../services/process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private httpError: ProcessHTTPMsgService) { }
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions/').pipe(catchError(this.httpError.handleError));
  }
  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id).pipe(catchError(this.httpError.handleError));
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true' ).pipe(map(promotion => promotion[0])).pipe(catchError(this.httpError.handleError));
  }
}
