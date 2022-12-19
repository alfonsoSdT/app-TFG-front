import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  nameParam:any;
  courses:any;
  
  userToUpdate:any;

  name:FormControl;
  surname:FormControl;
  age:FormControl;
  email:FormControl;
  updating:boolean;
  nameCourse:FormControl;
  dateCertified:FormControl;
  dateExpired:FormControl;

  data:any;

  coursePopUp: boolean;
  upOk: boolean;

  constructor(private _route: Router,private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => this.nameParam = params['name'])
    this.coursePopUp = false;
    this.upOk = false;
   }

  async ngOnInit(){
    if(this.nameParam !=null){
      this.updating = true;
      let url = 'http://localhost:3001/users/name/' + this.nameParam;
      let fetchUsers = await fetch(url);
      this.userToUpdate= await fetchUsers.json();
      
      let fetchCourses = await fetch('http://localhost:3001/courses/');
      this.courses = await fetchCourses.json();
      this.data = {
        model: null,
        courses:this.courses
      }
      this.name= new FormControl(this.userToUpdate?.nameUser);
      this.surname = new FormControl(this.userToUpdate?.surnameUser);
      this.age =new FormControl(this.userToUpdate?.age);
      this.email = new FormControl(this.userToUpdate?.email);
      this.nameCourse = new FormControl('Choose a course name');
      this.dateCertified = new FormControl('');;
      this.dateExpired = new FormControl('');
    }else{
      this.updating = false;
      this.name= new FormControl('');
      this.surname = new FormControl('');
      this.age =new FormControl('');;
      this.email = new FormControl('');
      this.nameCourse = new FormControl('');
      this.dateCertified = new FormControl('');;
      this.dateExpired = new FormControl('');
    }
  }
  createUser(){
    const nameUser = this.name.value;
    const surnameUser = this.surname.value;
    const age = this.age.value;
    const email = this.email.value;
    
    
    this.http.post<JSON>('http://localhost:3001/users/create',{'nameUser': nameUser,'surnameUser': surnameUser, 'age': age, 'email': email
    })
    .subscribe((res:any) => {
      if(res.status == 200){
        this._route.navigate(['users'])
      }
    });
  }
  updateUser(){
    const idUser = this.userToUpdate.idUser;
    const nameUser = this.name.value;
    const surnameUser = this.surname.value;
    const age = this.age.value;
    const email = this.email.value;

    const nameCourse = this.nameCourse.value;
    const dateCertified = this.dateCertified.value;
    const dateExpired = this.dateExpired.value;

    this.http.post<JSON>('http://localhost:3001/users/update',{idUser: idUser, 'nameUser': nameUser,'surnameUser': surnameUser, 'age': age, 'email': email , 
    })
    .subscribe((res:any) => {
      if(res.status == 200){
        this._route.navigate(['users'])
      }else{
        console.log(res.status)
      }
    });

    if(nameCourse != "Choose a course name" && dateCertified!= null && dateExpired !=null){
      const newCourse = {'idUser': idUser,'nameCourse': nameCourse, 'dateCertified': dateCertified, 'dateExpired': dateExpired}
      this.http.post<JSON>('http://localhost:3001/datacourses/create',newCourse).subscribe((res:any) => {if(res.status == 200){console.log('Creado DC')}  
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'The user has already that course'
      });
    });
    }   
  }
}
