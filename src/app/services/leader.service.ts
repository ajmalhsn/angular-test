import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import {Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; 
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import {  ProcessHTTPMsgService } from '../services/process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private httpError:ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership/').pipe(catchError(this.httpError.handleError));
  }
  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/'+ id).pipe(catchError(this.httpError.handleError));
  }
  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/?featured=true').pipe(map(leaders => leaders[0]));
  }
}
