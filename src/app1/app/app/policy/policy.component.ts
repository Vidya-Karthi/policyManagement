import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PolicyAppService } from '../policy-app.service';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { UserDetailsRequest } from '../shared/dataModels/userDetailsRequest';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  public policyColumnDefs: any[];
  public userPolicyColumnDefs: any[];
  public policyRowData: any;
  public userPolicyRowData: any;
  public gridOptions: GridOptions;
  public api: GridApi;
  public columnApi: ColumnApi;
  public userRequest: UserDetailsRequest;
  
  public userId: string;

  constructor(private policyService: PolicyAppService,private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(" You are in policy Us");
    this.userId = this.route.snapshot.paramMap.get('userId');
    console.log(" You are in policy Us" + this.userId);
    this.policyColumnDefs = [
    { headerName: 'S.No',
      field: 'policyId',
      width: 100,
      suppressMenu: true,
    },
    { headerName: 'Policy Name',
      field: 'policyName',
      width: 250,
      suppressMenu: true,
    },
    { headerName: 'Policy Details',
      field: 'policyDetails',
      width: 250,
      suppressMenu: true,
    }
  ];
  this.userPolicyColumnDefs = [
    { headerName: 'Policy No',
      field: 'policyNo',
      width: 100,
      suppressMenu: true,
    },
    { headerName: 'Policy Name',
      field: 'policyName',
      width: 250,
      suppressMenu: true,
    },
    { headerName: 'Amount Paid',
      field: 'amountPaid',
      width: 250,
      suppressMenu: true,
    },
    { headerName: 'Policy End Date',
      field: 'policyEndDate',
      width: 250,
      suppressMenu: true,
    },
    { headerName: 'Valid',
      field: 'valid',
      width: 200,
      suppressMenu: true,
    }
];
this.loadPolicyDetails();
this.loadUserPolicyDetails();
  }

  private loadPolicyDetails() {
    console.log("in loadPolicyDetails  " );
    //let PolicyDetailsResponse = new PolicyDetailsResponse();
    this.policyService.loadPolicyInfo()
    .subscribe(
      data => {
        this.policyRowData = data;
        //this.validateUser(loginResponse);
        console.log("Response" + JSON.stringify(data));
        // if (this.policyRowData && this.policyRowData.length) {
        //   this.api.hideOverlay();
        // } else {
        //   this.api.showNoRowsOverlay();
        // }  
      });
      }
  
      private loadUserPolicyDetails() {
        console.log("in loadUserPolicyDetails  " );
        this.userRequest = new UserDetailsRequest(); 
        this.userRequest.setUserId(this.userId);
        //let PolicyDetailsResponse = new PolicyDetailsResponse();
        console.log("in loadUserPolicyDetails  " + JSON.stringify(this.userRequest));
        this.policyService.loadUserPolicyInfo(this.userRequest)
        .subscribe(
          data => {
            this.userPolicyRowData = data;
            //this.validateUser(loginResponse);
            console.log("Responses" + JSON.stringify(data));
         });
          }
      
}


