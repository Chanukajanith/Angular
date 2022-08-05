import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;

  public loginForm!: FormGroup
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router: Router ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:[''],
      password:['']
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/employeeList").subscribe(res=>{
      const user = res.find((a: any)=>{
        return a.userName === this.loginForm.value.username && a.password === this.loginForm.value.password
      });
      if(user){
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }else{
       
        alert("User not found!!");
      }
    },err=> {
      alert("Something went wrong!!")
    })
  }

}
