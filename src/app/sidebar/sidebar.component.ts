import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppService } from '../shared/app.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  events: string[] = [];
  opened: boolean;
  mobileQuery: MediaQueryList;
  title: string = 'ISL Admin'
  isAuthenticated: boolean;
  authenticationSubscription: Subscription;
  titleSubscription: Subscription;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
      private appService: AppService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.authenticationSubscription = this.appService.autheticated.subscribe((autheticatedValue) => {
      this.isAuthenticated = autheticatedValue;
    });
    this.titleSubscription = this.appService.pageTitle.subscribe((pageTitleValue: string) => {
      this.title = pageTitleValue;
    });
  }

  /* isAuthenticated() {
    return this.appService.autheticated;
  } */

  onLogoutClick() {
    this.appService.updateAuthenticationData(false);
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.authenticationSubscription.unsubscribe();
  }

}
