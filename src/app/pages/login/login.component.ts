import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  name = new FormControl('');
  password = new FormControl('');
  showPopUpPassword:boolean;
  showPopUpUser:boolean;
  constructor(private _route: Router, private http: HttpClient) { }

   ngOnInit(){   
  }
  checkUser(){
    const nameUser = this.name.value;
    const passwordUser = this.password.value;
    this.showPopUpPassword = false;
    this.showPopUpUser = false;
    let info = {
      'nameUser': nameUser,
      'password': passwordUser
    }
    console.log(info)
    this.http.post<JSON>('http://localhost:3001/users/login',{'nameUser': nameUser,'password': passwordUser},).subscribe((res:any) => {
      console.log(res)
      if(res.status == 200){
        sessionStorage.setItem('UserName',nameUser)
        this._route.navigate(['dashboard'])
      }
    },
    (error) => {
      if(error.status == 404){
        this.showPopUpUser = true;
      }if(error.status == 403){
        this.showPopUpPassword = true;
      }
    })
  }
}
