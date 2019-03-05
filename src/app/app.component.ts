import { Component } from '@angular/core';
import { AppService } from './shared/app.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private appService: AppService, private route: Router) {
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((route: NavigationEnd) => {
        console.log(route);
        this.setTitle(route.urlAfterRedirects)
      });
  }

  setTitle(route: string) {
    const url = route.split('/');
    let pageTitle: string = 'ISL Admin'
     switch(url[1]) {
        case 'news-dashboard':
          pageTitle = 'News';
          break;
        case 'dashboard':
          pageTitle = 'Main Dashboard'
     }
     this.appService.updatePageTitle(pageTitle); 
  }
  
}
