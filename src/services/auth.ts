import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {contentHeaders} from '../common/headers';
import {Observable} from 'rxjs';
import {API_DOMAIN} from '../common/consts'
import 'rxjs/add/operator/map'

@Injectable()
export class Auth {
  public token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(API_DOMAIN + '/api/authenticate',
      JSON.stringify({email: email, password: password}),
      {headers: contentHeaders}
    ).map((response: Response) => {
      // login successful if there's a jwt token in the response
      let token = response.json() && response.json().token;
      if (token) {
        // set token property
        this.token = token;

        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('id_token', this.token);

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
    localStorage.removeItem('id_token');
  }
}
