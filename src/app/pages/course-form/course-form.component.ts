import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  nameParam:any;
  courseToUpdate:any;
  nameCourse:FormControl;
  moreInfo:FormControl;
  hoursNeeded: FormControl;
  pricePerHour:FormControl;

  updating:boolean;
  constructor(private _route: Router,private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => this.nameParam = params['name'])
    console.log(this.nameParam)
   }

  async ngOnInit(){
    if(this.nameParam !=null){
      this.updating = true
      
      let url = 'http://localhost:3001/courses/name/' + this.nameParam;
      let fetchUsers = await fetch(url);
      this.courseToUpdate= await fetchUsers.json();

      this.nameCourse= new FormControl(this.courseToUpdate?.nameCourse);
      this.moreInfo = new FormControl(this.courseToUpdate?.moreInfo);
      this.hoursNeeded = new FormControl(this.courseToUpdate.hoursNeeded);
      this.pricePerHour = new FormControl(this.courseToUpdate.pricePerHour);
    }else{
      this.updating = false;
      this.nameCourse= new FormControl('');
      this.moreInfo = new FormControl('');
      this.hoursNeeded = new FormControl('');
      this.pricePerHour = new FormControl('');
    }
  }
  createCourse(){
    const nameCourse = this.nameCourse.value;
    const moreInfo = this.moreInfo.value;
    const hoursNeeded = this.hoursNeeded.value;
    const pricePerHour = this.pricePerHour.value;

    this.http.post<JSON>('http://localhost:3001/courses/create',{'nameCourse': nameCourse,'moreInfo': moreInfo , 'hoursNeeded': hoursNeeded,'pricePerHour': pricePerHour,},).subscribe((res:any) => {
      console.log(res)
      if(res.status == 200){
        this._route.navigate(['courses'])
      }
    });
  }
  updateCourse(){
    const idCourse = this.courseToUpdate.idCourse;
    const nameCourse = this.nameCourse.value;
    const moreInfo = this.moreInfo.value;
    const hoursNeeded = this.hoursNeeded.value;
    const pricePerHour = this.pricePerHour.value;

    this.http.post<JSON>('http://localhost:3001/courses/update',{
      'idCourse': idCourse, 'nameCourse': nameCourse,'moreInfo': moreInfo, 'hoursNeeded': hoursNeeded,'pricePerHour': pricePerHour,
    },).subscribe((res:any) => {
      console.log(res)
      if(res.status == 200){
        this._route.navigate(['courses'])
      }
    });
  }

}
