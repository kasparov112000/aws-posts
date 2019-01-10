import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-my-nav',
  templateUrl: './app-my-nav.component.html',
  styleUrls: ['./app-my-nav.component.scss']
})

export class AppMyNavComponent implements OnInit {
  progressBarMode: string;
  menuItems: any[];
  appShowAuthed = false;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  isAuthenticated: boolean;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
 
  constructor(private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router) { }



  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  private loadMenus(): void {

    this.menuItems = [
      { link: '/' },
      { link: '/' }
    ];

  }
}
