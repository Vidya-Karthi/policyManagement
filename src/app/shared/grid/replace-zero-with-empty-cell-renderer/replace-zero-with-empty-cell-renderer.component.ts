import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: 'app-replace-zero-with-empty-cell-renderer',
  template: '{{processValue()}}',
  styles: [``]
})
export class ReplaceZeroWithEmptyCellRendererComponent implements ICellRendererAngularComp {
  public params: any;
  constructor() { }

  // called on init
  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  public processValue(): string {
    if (this.params.value !== 0) {
      return this.params.value;
    } else {
      return '';
    }
  }

}
