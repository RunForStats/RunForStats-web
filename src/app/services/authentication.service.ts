import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    var stravaToken = JSON.parse(localStorage.getItem('stravaToken'));
    this.token = stravaToken && stravaToken.token;
  }

  login(code:string ): Observable<boolean> {
    return this.http.get('https://api.runforstats.com/exchange?state=&code=' + code)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let jsonResponse = response.json();
        if (jsonResponse) {
          // set token property
          this.token = jsonResponse.access_token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('stravaToken', JSON.stringify({ username: jsonResponse.athlete.firstname, token: this.token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('stravaToken');
  }
}
