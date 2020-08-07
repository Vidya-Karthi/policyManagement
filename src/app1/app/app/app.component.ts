import { Component, OnInit, Renderer2 } from '@angular/core';
import { interval } from 'rxjs';
import { PolicyAppService } from './policy-app.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'isp-app';
  previousUrl: Array<string>;
  public selection: number = 1;
  public accent;
  public warn;
  showChlngeIcon = false;
  showDealIcon = false;
  public toogleMenuCondition = true;

  constructor(private policyService: PolicyAppService, private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
    // initial load of header information.
    this.getHeaderDetails();
    
    this.router.events.subscribe(event => {
      console.log("routing");
      // retains the appropriate nav link highlight on page refresh in any page based on the current route
      let path: string = window.location.pathname.split('/')[1];
      if (window.location.hostname != 'localhost') {
        path = window.location.pathname.split('/')[2];
      }
      if (path == 'login') {
        //this.selection = 0;
      } else if (path.includes('register')) {
        this.selection = 0;
      } else if (path == 'aboutUs') {
        this.selection = 1;
      } else if(path=='contactUs'){
        this.selection = 2;
      }
      if (event instanceof NavigationStart) {
        if (this.previousUrl) {
          this.previousUrl.forEach((bodyClass) => {
            this.renderer.removeClass(document.body, bodyClass);
          })
        }
        let currentUrlSlug = event.url.slice(1).split('/');
        if (currentUrlSlug) {
          currentUrlSlug.slice(0, 2).forEach((bodyClass) => {
            if (bodyClass !== "") {
              this.renderer.addClass(document.body, bodyClass);
            }
          });
        }
        this.previousUrl = currentUrlSlug.slice(0, 2);
      }
    })
  }

  getHeaderDetails() {
  //  this.headerObj = this.ispAppConfigService.getHeaderDetails();
    // this.showChlngeIcon = this.headerObj.challengeNew > 0 ? true : false;
    // this.showDealIcon = this.headerObj.dealReviewNew > 0 ? true : false;
  }

  selectMenu(option: number) {
    this.selection = option;
  }

  toogleMenu() {
    if(this.toogleMenuCondition){
      this.toogleMenuCondition = false;
    }else{
      this.toogleMenuCondition = true;
    }
  }

  ngOnDestroy() {
  }
  
}
