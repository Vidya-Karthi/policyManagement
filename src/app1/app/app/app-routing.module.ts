import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterComponent } from './register/register.component';
import { PolicyComponent } from './policy/policy.component';
import { AdminPolicyComponent } from './admin-policy/admin-policy.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  {
    path: 'login',
    //canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    //canActivate: [RegisterGuard],
    component: RegisterComponent
  },
  {
    path: 'aboutUs',
    //canActivate: [AboutUsGuard],
    component: AboutUsComponent
  },
  {
    path: 'contactUs',
    //canActivate: [ContactUsGuard],
    component: ContactUsComponent
  },
  {
    path: 'policy/:userId',
    //canActivate: [ContactUsGuard],
    component: PolicyComponent
  },
  {
    path: 'adminPolicy',
    //canActivate: [ContactUsGuard],
    component: AdminPolicyComponent
  },
  {
    path: 'logout/:userId',
    //canActivate: [ContactUsGuard],
    component: LogoutComponent
  },
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }