import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-navigate-cell-renderer',
  template: `<a href='javascript:void(0);' (click)='pageNavigate()' style='color: #007bff'> {{params.value}} </a>`,
  styles: [``]
})
export class PageNavigateCellRendererComponent implements ICellRendererAngularComp {
  public params: any;
  constructor(private router: Router) { }

  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }

  public pageNavigate(): void {
    const routePath = this.params.context.componentParent.currentPageRoutePath;
      this.router.navigate([routePath]);
    }
}
