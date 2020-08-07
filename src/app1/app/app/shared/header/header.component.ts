import { Component, OnInit, Renderer2 } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 constructor( translate: TranslateService) {
    translate.addLangs(['en']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
   translate.use('en');
    }
 

  ngOnInit() {
  }

}
