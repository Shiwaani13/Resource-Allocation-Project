import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { DMComponent } from './dm/dm.component';
import { DmsearchComponent } from './dmsearch/dmsearch.component';
import { DmtimelineComponent } from './dmtimeline/dmtimeline.component';
import { AdminpageComponent } from './adminpage/adminpage.component'; 
import { SearchtableComponent } from './searchtable/searchtable.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent,canActivate : [AuthGuard]},  
  { path: 'dm', component: DMComponent,canActivate : [AuthGuard]},  
   { path: 'admin', component: AdminComponent,canActivate : [AuthGuard]}, 
   { path: 'adminpage', component: AdminpageComponent,canActivate : [AuthGuard]},
   { path: 'dmsearch', component: DmsearchComponent ,canActivate : [AuthGuard]},
   { path: 'search', component: SearchtableComponent },
   { path: 'timeline', component: DmtimelineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 
