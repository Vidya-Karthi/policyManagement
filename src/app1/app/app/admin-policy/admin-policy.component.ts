import { Component, OnInit } from '@angular/core';
import { PolicyAppService } from '../policy-app.service';
import { ActivatedRoute } from '@angular/router';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { PolicyDetailsResponse } from '../shared/dataModels/policyDetailsResponse';

@Component({
  selector: 'app-admin-policy',
  templateUrl: './admin-policy.component.html',
  styleUrls: ['./admin-policy.component.scss']
})
export class AdminPolicyComponent implements OnInit{

  public adminPolicyColumnDefs: any[];
  public adminPolicyRowData: any;
  public gridOptions: GridOptions;
  public api: GridApi;
  private gridApi;
  private gridColumnApi;
  public columnApi: ColumnApi;
  public userId: string;
  private editType;
  private editingRowIndex ;
  private editingColKey ;
  private policyResponse : PolicyDetailsResponse;
  rowChgList: Array<Number> = [];
  //private rowchg = [];
  public rowchanged: Array<any>;
  
  constructor(private policyService: PolicyAppService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = 'Admin';
    this.adminPolicyColumnDefs = [
    { headerName: 'S.No',
      field: 'policyId',
      width: 100,
      editable: false,
      suppressMenu: true,
    },
    { headerName: 'Policy Name',
      field: 'policyName',
      width: 250,
      editable: true,
      suppressMenu: true,
    },
    { headerName: 'Policy Details',
      field: 'policyDetails',
      width: 250,
      editable: true,
      suppressMenu: true,
    },
    { headerName: 'Change',
      width: 250,
      suppressMenu: true,
      cellRenderer: function(params) {
        return '<button style="font-size: 12px" (click)="editButtonClick()">Edit</button>'
      }
    }
  ];
 this.loadPolicyDetails();
 this.editType = "fullRow";
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  private loadPolicyDetails() {
    console.log("in adminloadPolicyDetails  " );
    //let PolicyDetailsResponse = new PolicyDetailsResponse();
    this.policyService.loadPolicyInfo()
    .subscribe(
      data => {
        this.adminPolicyRowData = data;
        console.log("Response" + JSON.stringify(data));
      });
      }

      onCellClicked($event){
        // check whether the current row is already opened in edit or not
        if(this.editingRowIndex != $event.rowIndex) {
          console.log($event);
          $event.api.startEditingCell({
            rowIndex: $event.rowIndex,
            colKey: $event.column.colId
          });
          this.editingRowIndex = $event.rowIndex;
          this.editingColKey = $event.column.colId;
          this.rowChgList.push(this.editingRowIndex);
          this.editButtonClick(this.rowChgList);
        }
      }

      private editButtonClick(rowList) {
        const selectedRow = this.gridApi.getSelectedRows();
        this.gridApi.startEditingCell({
           rowIndex: this.editingRowIndex,
           colKey: this.editingColKey
         });
        console.log("changing rows" + selectedRow);
      }

     
     
    // stop editing
    saveChanges() {
      console.log("Stop Editing");
      let policyData: any;
      let policyList: PolicyDetailsResponse[] = new Array();
      let policyReq = new PolicyDetailsResponse();
      const selectedRow = this.gridApi.getSelectedRows();
      console.log("editing" + selectedRow);
      this.gridApi.stopEditing();
     //let policyResponse = new PolicyDetailsResponse();
     console.log("done editing" +JSON.stringify(this.adminPolicyRowData));
     this.rowChgList.forEach(element => {
       console.log("changed" + element);
       policyData = this.adminPolicyRowData;
       //this.adminPolicyRowData.forEach(value,index) => {
        policyData.forEach((rowInfo, index) => {
         if(index == element) {
           policyReq = rowInfo;
         }
        });  
    });
    policyList.push(policyReq);
    this.updatePolicyDetails(policyList);
  }

  private updatePolicyDetails(policyReq: PolicyDetailsResponse[]) {
    console.log("in loadPolicyDetails  " );
    this.policyService.updatePolicyInfo(policyReq)
    .subscribe(
      data => {
        this.adminPolicyRowData = data;
        console.log("Response" + JSON.stringify(data));
      });
      }
        

}
