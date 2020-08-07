import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridCommonService {

  constructor() { }

  /**
  @name calculateTotalPages-calculation of total pages based on total row count received from service.
  @param rowCtVal - total row count values.
  @param rowsPerPage - number of rows per page.
  */
  public calculateTotalPages(rowCtVal, rowsPerPage): number {
    let pages = Math.floor(rowCtVal / rowsPerPage);
    if (rowCtVal % rowsPerPage !== 0) {
      pages += 1;
    }
    return pages;
  }

  /**
  @name calculateCurrentPageSetValues - calculating current set values based on current page.
  @param currentPageValue - current page no value entered by user.
  @param rowsPerPage - number of rows per page.
  */
  public calculateCurrentPageSetValues(currentPageValue, rowsPerPage) {
    const pageSet = {
      start: 1,
      end: rowsPerPage
    };
    pageSet.start = currentPageValue * rowsPerPage + 1;
    pageSet.end = currentPageValue * rowsPerPage + rowsPerPage;
    return pageSet;
  }

}
