import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  userLogged:boolean;
  name = new FormControl('');
  password = new FormControl('');
  showPopUpPassword:boolean;
  showPopUpUser:boolean;

  constructor(private _route: Router, private http: HttpClient) { 
  }
  ngOnInit() {
    this.reload()
    let name = sessionStorage.getItem('UserName');
    if(name == null){this.userLogged = false;}
    else{this.userLogged = true;}
  }
  reload(){
    if( window.localStorage ){
      if( !localStorage.getItem('firstLoad') )
      {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }  
      else
        localStorage.removeItem('firstLoad');
    }
  }
  checkUser(){
    const nameUser = this.name.value ;
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
       this.userLogged = true;
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
