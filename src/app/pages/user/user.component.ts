import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
userLog:any;
courses:any;
nameParam:any;

    constructor(private route: ActivatedRoute){
        
    }
    async ngOnInit(){
        /* Get the User */
        this.route.params.subscribe((params: Params) => this.nameParam = params['name'])
        if(this.nameParam !=null){
            let url = 'http://localhost:3001/users/name/' + this.nameParam;

            let fetchUsers = await fetch(url);
            this.userLog  = await fetchUsers.json();

            /*Get all the courses */
            let urlCourses = url + '/courses';
            let fetchUsersCourses = await fetch(urlCourses);
            this.courses = await fetchUsersCourses.json();
        }
        else{
            let nameUser = sessionStorage.getItem('UserName')
            let url = 'http://localhost:3001/users/name/' + nameUser;

            let fetchUsers = await fetch(url);
            this.userLog  = await fetchUsers.json();

            /*Get all the courses */
            let urlCourses = url + '/courses';
            let fetchUsersCourses = await fetch(urlCourses);
            this.courses = await fetchUsersCourses.json();
        }

    }
}
