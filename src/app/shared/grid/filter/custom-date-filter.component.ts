import { Component, AfterViewInit } from '@angular/core';
import { IFloatingFilter, IFloatingFilterParams, SerializedTextFilter } from 'ag-grid-community';
import { AgFrameworkComponent } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';

export interface CustomDateFilterChange {
  model: SerializedTextFilter;
}

export interface CustomDateFilterParams extends IFloatingFilterParams<SerializedTextFilter, CustomDateFilterChange> {
  value: '';
}


@Component({
  template:
    `
    <div class="centered">
      <input class="ag-floating-filter-input datepicker" matInput [(ngModel)]="currentValue" (dateChange)="valueChanged()" disabled
        [matDatepicker]="filterDatePicker"  autocomplete="off" (keyup.enter)="valueChanged()" [max]="maxDate" (blur)="valueChanged()" (focus)="onFocus()">
      <mat-datepicker-toggle matSuffix [for]="filterDatePicker"></mat-datepicker-toggle>
      <mat-datepicker color="accent" #filterDatePicker disabled="false"></mat-datepicker>
    </div>    
  `,
  styles: [`
    input.datepicker{
        width: 100% !important;
        line-height: 30px !important;
      }      
    .centered ::ng-deep .mat-button-wrapper {
      display: flex;
      justify-content: center;
    }
    .centered ::ng-deep .mat-icon-button{
      width: 30px;
      height:30px;
      line-height:30px;
      position: relative;
      right: 26px;
      vertical-align: text-bottom;
    }    
    input.datepicker:focus {
      padding-bottom: 0px !important;
      border-bottom: none !important;
    }
  `]
})
export class CustomDateFilterComponent implements IFloatingFilter<SerializedTextFilter,
CustomDateFilterChange, CustomDateFilterParams>,
  AgFrameworkComponent<CustomDateFilterParams>, AfterViewInit {
  private params: CustomDateFilterParams;
  public currentValue: any;
  public initialValue: string;
  public maxDate = new Date();
  agInit(params: CustomDateFilterParams): void {
    this.params = params;
    this.currentValue = '';
  }
  constructor() { }

  /**
   @name valueChanged- set current value and trigger floating filter change.
   */
  valueChanged() {
    if (this.initialValue !== this.currentValue) {
      this.initialValue = this.currentValue;
      this.params.onFloatingFilterChanged({ model: this.buildModel() });
    }

  }

  ngAfterViewInit(): void {
  //  this.valueChanged();
  }
  /**
    @name onParentModelChanged- set current filter Value
    */
  onParentModelChanged(parentModel: SerializedTextFilter): void {
    if (!parentModel) {
      this.currentValue = '';
    } else {
      this.currentValue = new Date(parentModel.filter);
    }
  }
  /**
   @name onFocus- set initialValue value on focus filter text box
   */
  onFocus() {
    this.initialValue = this.currentValue;
  }
  /**
   @name buildModel- set filter model
   */
  buildModel(): SerializedTextFilter {
    if (this.currentValue === null || this.currentValue === '' || this.currentValue.toString() === 'Invalid Date') {
      return null;
    }
    const value: string = new DatePipe('en-US').transform(this.currentValue, 'MM/dd/yyyy');
    return {
      filterType: 'text',
      type: 'equals',
      filter: value
    };
  }

}
