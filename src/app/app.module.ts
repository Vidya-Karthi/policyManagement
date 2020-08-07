import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { IspHttpService } from './shared/services/isp-http.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageHandlerComponent } from './shared/message-handler/message-handler.component';
import { MessageService } from './shared/message-handler/message-handler.service';
import { AgGridModule } from "ag-grid-angular";
import { CustomTextFilterComponent } from './shared/grid/filter/custom-text-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule, MatDialogModule } from '@angular/material'

import { LoginComponent } from './login/login.component';
import { MdePopoverModule } from '@material-extended/mde';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterComponent } from './register/register.component';
import { PolicyComponent } from './policy/policy.component';
import { AdminPolicyComponent } from './admin-policy/admin-policy.component';
import { DatePipe } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { CustomDateFilterComponent } from './shared/grid/filter/custom-date-filter.component';
import { PageNavigateCellRendererComponent } from './shared/grid/page-navigate-cell-renderer/page-navigate-cell-renderer.component';
import { ReplaceZeroWithEmptyCellRendererComponent } from './shared/grid/replace-zero-with-empty-cell-renderer/replace-zero-with-empty-cell-renderer.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MessageHandlerComponent,
    AboutUsComponent,
    ContactUsComponent,
    RegisterComponent,
    PolicyComponent,
    AdminPolicyComponent,
    LogoutComponent,
    CustomTextFilterComponent,
    CustomDateFilterComponent,
    PageNavigateCellRendererComponent,
    ReplaceZeroWithEmptyCellRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomTextFilterComponent,CustomDateFilterComponent, PageNavigateCellRendererComponent, ReplaceZeroWithEmptyCellRendererComponent]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MdePopoverModule
  ],
  providers: [
    IspHttpService,
    MessageService,
    DatePipe,
    {provide: LOCALE_ID, useValue: "en-IN" }, 
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
