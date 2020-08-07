import { Component, OnInit } from '@angular/core';
import { PolicyAppService } from '../policy-app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../shared/message-handler/message-handler.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private policyService: PolicyAppService,private route: ActivatedRoute,
    private messageService: MessageService, private router: Router,
     ){
  }

    ngOnInit() { 
      console.log(" You are in about Us");
    }

}
