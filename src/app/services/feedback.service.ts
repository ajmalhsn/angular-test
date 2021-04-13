import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL} from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private httpError: ProcessHTTPMsgService) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<Feedback>(baseURL + 'feedback/',feedback,httpOptions).pipe(catchError(this.httpError.handleError));
    // return this.http.get<Feedback>(baseURL + 'feedback/').pipe(catchError(this.httpError.handleError));
  }
}
