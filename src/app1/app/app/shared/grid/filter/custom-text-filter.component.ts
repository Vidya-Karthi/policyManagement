import { AfterViewInit, Component } from '@angular/core';
import { IFloatingFilter, IFloatingFilterParams, SerializedTextFilter } from 'ag-grid-community';
import { AgFrameworkComponent } from 'ag-grid-angular';

export interface CustomTextFilterChange {
  model: SerializedTextFilter;
}

export interface CustomTextFilterParams extends IFloatingFilterParams<SerializedTextFilter, CustomTextFilterChange> {
  value: '';
}

@Component({
  template:
    `
    <input matInput type="text" autofill="false" class="ag-floating-filter-input" autocomplete="off"
          [(ngModel)]="currentValue" (keyup.enter)="valueChanged()" (blur)="valueChanged()" (focus)="onFocus()"/>
  `,
  styles: [`
    input.ag-floating-filter-input {
        border-bottom: none !important;
      }
    input.ag-floating-filter-input:focus {
      padding-bottom: 0px !important;
      border-bottom: none !important;
    }
  `]
})
export class CustomTextFilterComponent implements IFloatingFilter<SerializedTextFilter,
CustomTextFilterChange, CustomTextFilterParams>,
  AgFrameworkComponent<CustomTextFilterParams>, AfterViewInit {
  private params: CustomTextFilterParams;
  public currentValue: string;
  public initialValue: string;
  agInit(params: CustomTextFilterParams): void {
    this.params = params;
    this.currentValue = '';
  }
  constructor() {
  }
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
    // this.valueChanged();
  }
  /**
    @name onParentModelChanged- set current filter Value
    */
  onParentModelChanged(parentModel: SerializedTextFilter): void {
    if (!parentModel) {
      this.currentValue = '';
    } else {
      this.currentValue = parentModel.filter;
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
    if (this.currentValue === '') {
      return null;
    }
    return {
      filterType: 'text',
      type: 'equals',
      filter: this.currentValue.trim()
    };
  }
}
