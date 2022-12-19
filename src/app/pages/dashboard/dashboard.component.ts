import { Component, OnInit } from '@angular/core';



@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  users:any
  datacourses:any
  usersDC:any
  userLogged:any;

  searchText;

    async ngOnInit(){
      this.userLogged = sessionStorage.getItem('UserName')
      /* Get all the Users */
      let fetchUsers = await fetch('http://localhost:3001/users/');
      this.users  = await fetchUsers.json();

      /* Get the dataCourses of all the users*/
      let fetchUsersWithDC = await fetch('http://localhost:3001/users/datacourses');
      this.usersDC = await fetchUsersWithDC.json();
      
    } 
      

      
}
