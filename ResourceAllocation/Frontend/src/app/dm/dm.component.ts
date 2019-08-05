import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { AuthService } from '../services/auth.service'; 
import { ILogin } from 'src/app/interfaces/login';  
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';  

@Component({
  selector: 'app-dm',
  templateUrl: './dm.component.html',
  styleUrls: ['./dm.component.css']
})
export class DMComponent implements OnInit {
  model: ILogin = { userid: "dm", password: "dm@123"}  //DM Credentials
  loginForm: FormGroup;  
  message: string;  
  returnUrl: string; 

  constructor(
    private formBuilder: FormBuilder,  
     private router: Router,  
     private authService: AuthService  
  ) { }

  ngOnInit() {  
    this.loginForm = this.formBuilder.group({  
       userid: ['', Validators.required],  
       password: ['', Validators.required]  
    });  
 this.returnUrl = '/dmsearch';  //redirected to DM Search page on successful login 
 this.authService.logout();  
 }  

// convenience getter for easy access to form fields  
get f() { return this.loginForm.controls; }  


login() {  

 // stop here if form is invalid  
 if (this.loginForm.invalid) {  
    return;  
 }  
 else {  
    if (this.f.userid.value == this.model.userid && this.f.password.value == this.model.password) {  
    console.log("Login successful");  
    //this.authService.authLogin(this.model);  
    localStorage.setItem('isLoggedIn', "true");  
    localStorage.setItem('token', this.f.userid.value);  
    this.router.navigate([this.returnUrl]);  
    }  
 else {  
    this.message = "Please check your userid and password";  
    }  
   }  
}  

}  