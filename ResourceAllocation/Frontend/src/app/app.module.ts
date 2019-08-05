import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth.guard';    
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DMComponent } from './dm/dm.component';
import { DmsearchComponent } from './dmsearch/dmsearch.component';
import { DmtimelineComponent } from './dmtimeline/dmtimeline.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { SearchtableComponent } from './searchtable/searchtable.component'; 
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
    
import { FileSelectDirective } from'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    DMComponent,
    DmsearchComponent,
    DmtimelineComponent,
    AdminpageComponent,
    SearchtableComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,    
   ReactiveFormsModule,
   HttpClientModule, AgGridModule.withComponents([]) 
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

