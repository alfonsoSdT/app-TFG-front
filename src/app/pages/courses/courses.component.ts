import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
courses:any;
searchText;
  constructor(private _route: Router, private http: HttpClient) { }

  async ngOnInit() {
    let fetchCourses = await fetch('http://localhost:3001/courses/status')
    this.courses = await fetchCourses.json();
  }
  createCourse(){
    this._route.navigate(['createCourse'])
  }
  updateCourse(name:any){
    let nameParam = name;
    this._route.navigate(['updateCourse',nameParam])
  }
  deleteCourse(name:any){
    Swal.fire({
      title: 'Are you sure you want to delete this course?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const nameCourse = name;
        this.http.post<JSON>('http://localhost:3001/courses/delete',{'nameCourse': nameCourse},).subscribe((res:any) => {
        if(res.status == 200){
          this._route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this._route.navigate(["courses"]))
        }
      });
        Swal.fire('Deleted!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('The course was not deleted', '', 'info')
      }
    })
  }

}
