import {Injectable, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {User} from "../models/user";

@Injectable()
export class AuthenticationService {
  public token: string;
  public currentUser: User;

  @Output()
  logged = new EventEmitter<boolean>();

  constructor(private http: Http) {
    // set token if saved in local storage
    var stravaToken = localStorage.getItem('stravaToken');
    var stravaUser = JSON.parse(localStorage.getItem('stravaUser'));
    this.token = stravaToken;
    this.currentUser = stravaUser;

  }


  login(code: string): Observable<Response> {
    return this.http.get('https://api.runforstats.com/exchange?state=&code=' + code)
      .map((response: Response) => {


        // login successful if there's a jwt token in the response
        let jsonResponse = response.json();

        // if token is empty, launch error
        if (jsonResponse == null) {
          this.logged.emit(false);
          throw Observable.throw("Access denied");
        }

        // set token property
        //this.token = jsonResponse.access_token;
        this.token = jsonResponse['access_token'];
        this.currentUser = jsonResponse['athlete'];

        console.log("Welcome " + this.currentUser.username);

        // store username and jwt token in local storage to keep currentUser logged in between page refreshes
        //localStorage.setItem('stravaToken', JSON.stringify({ username: jsonResponse.athlete.firstname, token: this.token }));
        localStorage.setItem('stravaToken', this.token );
        localStorage.setItem('stravaUser', JSON.stringify(jsonResponse['athlete']) );


        this.logged.emit(true);

        return jsonResponse;

      })
  }


  logout(): void {
    // clear token remove currentUser from local storage to log currentUser out
    this.token = null;
    localStorage.removeItem('stravaToken');
    localStorage.removeItem('stravaUser');
    this.logged.emit(false);
    location.reload();

  }


  isLogged(): boolean {
    if (localStorage.getItem('stravaToken')) {
      this.logged.emit(true);
      return true;
    } else {
      this.logged.emit(false);
      return false;
    }
  }
}
