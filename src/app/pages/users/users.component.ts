import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
users:any
searchText;
  constructor(private _route: Router, private http: HttpClient) { }

  async ngOnInit(){
    /* Get all the Users */
    let fetchUsers = await fetch('http://localhost:3001/users/');
    this.users  = await fetchUsers.json();
  }
  createUser(){
    this._route.navigate(['createUser'])
  }
  updateUser(name:any){
    let nameParam = name
    this._route.navigate(['updateUser',nameParam])
  }
  deleteUser(name:any){
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const nameUser = name;
        this.http.post<JSON>('http://localhost:3001/users/delete',{'nameUser': nameUser},).subscribe((res:any) => {
        console.log(res)
        if(res.status == 200){
          this._route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this._route.navigate(["users"]))
        }
    });
        Swal.fire('Deleted!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('The user was not deleted', '', 'info')
      }
    })
    
  }
}
