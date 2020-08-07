import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IFloatingFilter, IFloatingFilterParams, SerializedTextFilter } from 'ag-grid-community';
import { AgFrameworkComponent } from 'ag-grid-angular';

export interface DropDownFilterChange {
  model: SerializedTextFilter;
}

export interface CustomDropDownFilterParams extends IFloatingFilterParams<SerializedTextFilter, DropDownFilterChange> {
  value: '';
}


@Component({
  template:
    `<mat-select placeholder="Filter" [(ngModel)]="currentValue"  (ngModelChange)="onSelectionChange($event)">
      <mat-option *ngFor="let opt of optionList" [value]='opt'>{{opt}}</mat-option>
    </mat-select>`,
  styles: [``]
})
export class CustomDropDownFilterComponent  implements OnInit, AfterViewInit, IFloatingFilter<SerializedTextFilter,
DropDownFilterChange, CustomDropDownFilterParams>,  AgFrameworkComponent<CustomDropDownFilterParams> {
  private params: CustomDropDownFilterParams;
  public currentValue: string;
  public optionList = [];
  agInit(params: CustomDropDownFilterParams): void {
    this.params = params;
    this.currentValue = '';
  }
  constructor() { }

  ngOnInit() {
    if(this.params.column.getColId() === 'dealRvwStatus'){
      this.optionList = ['', 'Pending Submit', 'Approved', 'Submitted', 'Denied'];
    }else if(this.params.column.getColId() === 'paymentMethod'){      
      this.optionList = ['', 'ACH', 'Billing', 'Check'];
    }
  }
  ngAfterViewInit(): void {
  //  this.params.onFloatingFilterChanged({ model: this.buildModel() });
  }

  onSelectionChange(val){
    this.currentValue = val;
    this.params.onFloatingFilterChanged({ model: this.buildModel() });
  }

  onParentModelChanged(parentModel: SerializedTextFilter): void {
    if (!parentModel) {
        this.currentValue = '';
    } else {
        this.currentValue = parentModel.filter;
    }
}

buildModel(): SerializedTextFilter {
    if (this.currentValue === '') {
        return null;
    }
    return {
        filterType: 'text',
        type: 'equals',
        filter: this.currentValue,
    };
}

}
