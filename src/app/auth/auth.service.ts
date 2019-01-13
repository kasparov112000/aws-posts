import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, ReplaySubject } from "rxjs";

import { environment } from "../../environments/environment";
import { AuthData } from "./auth-data.model";

const BACKEND_URL = environment.apiUrl + "/user/";
@Injectable({ providedIn: "root" })

export class AuthService {

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new ReplaySubject<{}>(1);
  public currentUser = this.currentUserSubject.asObservable();

  private isAdminSubject = new ReplaySubject<boolean>(1);
  public isAdmin = this.isAdminSubject.asObservable();

  private token: string;
  private tokenTimer: any;
  private userId: string;


  private userListener = new Subject<AuthData>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.isAuthenticated;
  }

  getUserListener() {
    this.userListener.asObservable().subscribe(val =>
      console.log(val));
    return this.userListener.asObservable();
  }

  createUser(email: string, password: string, roles: string[]) {
    const authData: AuthData = { email: email, password: password, roles: roles };
    this.http.post(BACKEND_URL + "/signup", authData).subscribe(
      (data: AuthData) => {
        console.log('the user dataaaaaaaaaaaaaaaaa from login');
        console.log(data);

        this.userListener.next(data);
        this.isAuthenticatedSubject.next(true);
        //  this.isAdminSubject.next(data.isAdmin);
        this.router.navigate(["/"]);
      },
      error => {
        this.isAuthenticatedSubject.next(false);
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ any, token: string; expiresIn: number; userId: string }>(
        BACKEND_URL + "login",
        authData
      )
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;
          console.log('the user dataaaaaaaaaaaaaaaaa from login');
          console.log(response);
          this.userListener.next();

          if (token)
          {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticatedSubject.next(true);
            this.userId = response.userId;
            this.currentUserSubject.next(response);

            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000

            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(["/"]);

          }
        },
        error => {
          this.isAuthenticatedSubject.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation)
    {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0)
    {
      this.token = authInformation.token;
      this.isAuthenticatedSubject.next(true);
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);

    }
  }

  logout() {
    this.token = null;
    this.isAuthenticatedSubject.next(false);

    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate)
    {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
