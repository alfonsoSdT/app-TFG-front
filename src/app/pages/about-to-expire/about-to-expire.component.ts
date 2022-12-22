import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Month } from 'angular-material-datepicker/src/datepicker/month.model';

@Component({
  selector: 'app-about-to-expire',
  templateUrl: './about-to-expire.component.html',
  styleUrls: ['./about-to-expire.component.scss']
})
export class AboutToExpireComponent implements OnInit {
  courses:any;
  users:any;
  usersDC:any;

  model: NgbDateStruct;
  searchText;

  nameParam:any;
  year:number;

  count:number;

  coursePricePerEmployee:any;
  constructor(private _route: Router,private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => this.nameParam = params['name'])
    this.route.params.subscribe((params: Params) => this.year = params['year'])
    console.log(this.year)
    this.count = 0;
   }

  async ngOnInit(){
    //Courses list
    let fetchCourses = await fetch('http://localhost:3001/courses/status')
    this.courses = await fetchCourses.json();
    //Users with DataCourse list
    let fetchUsersWithDC = await fetch('http://localhost:3001/users/datacourses');
    this.usersDC = await fetchUsersWithDC.json();

    for(let user of this.usersDC){
     let year = new Date(user.DataCourse.dateExpired).getFullYear();
     let month = new Date(user.DataCourse.dateExpired).getMonth();
     let day = new Date(user.DataCourse.dateExpired).getDay();
     let dateExpired= {
      'year': year,
      'month': month,
      'day': day
     };
     user.DataCourse.dateExpired = dateExpired;
     let yearC = new Date(user.DataCourse.dateCertified).getFullYear();
     let monthC = new Date(user.DataCourse.dateCertified).getMonth();
     let dayC = new Date(user.DataCourse.dateCertified).getDay();
     
     let dateCertified = {
      'year': yearC,
      'month': monthC,
      'day': dayC
     };
     user.DataCourse.dateCertified = dateCertified;
    }
    if(this.nameParam != null){
      let url = 'http://localhost:3001/courses/name/' + this.nameParam;
      let fetchCourse = await fetch(url)
      let course = await fetchCourse.json();
      console.log(course)
      this.coursePricePerEmployee = course.pricePerHour * course.hoursNeeded;
    }

  }
  upCount(){
    this.count++;
  }
  checkIfOneYear(yearDc:string, year:number):boolean{
    console.log(yearDc)
    console.log(year)
    return (Math.abs(parseInt(yearDc) - year) < 2);
  }

}
