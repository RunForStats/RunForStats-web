import {Injectable, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class AuthenticationService {
  public token: string;

  @Output()
  logged = new EventEmitter<boolean>();

  constructor(private http: Http) {
    // set token if saved in local storage
    var stravaToken = JSON.parse(localStorage.getItem('stravaToken'));
    this.token = stravaToken && stravaToken.token;
  }


  login(code: string): Observable<Response> {
    return this.http.get('https://api.runforstats.com/exchange?state=&code=' + code)
      .map((response: Response) => {

        // login successful if there's a jwt token in the response
        let jsonResponse = response.json();

        // set token property
        //this.token = jsonResponse.access_token;
        this.token = JSON.stringify(jsonResponse);

        // store username and jwt token in local storage to keep user logged in between page refreshes
        //localStorage.setItem('stravaToken', JSON.stringify({ username: jsonResponse.athlete.firstname, token: this.token }));
        localStorage.setItem('stravaToken', JSON.stringify({token: this.token}));


        this.logged.emit(true);

        return jsonResponse;

      });
  }


  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('stravaToken');
    this.logged.emit(false);
    location.reload();

  }

  isLogged() {

    if (localStorage.getItem('stravaToken')) {
      this.logged.emit(true);
    } else {
      this.logged.emit(false);
    }
  }
}
