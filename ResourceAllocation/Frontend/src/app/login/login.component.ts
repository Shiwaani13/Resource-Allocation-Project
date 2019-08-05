import { Component, OnInit } from '@angular/core';  
import { Router } from '@angular/router';  
import { ILogin } from 'src/app/interfaces/login';  
import { AuthService } from '../services/auth.service'  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
  
@Component({  
   selector: 'app-login',  
   templateUrl: './login.component.html',  
   styleUrls: ['./login.component.css']  
   })  
export class LoginComponent implements OnInit {  
  
   
   constructor(  
      private formBuilder: FormBuilder,  
      private router: Router,  
      private authService: AuthService  
   ) { }  
  
   ngOnInit() {  
   
   
   }  
  
  }