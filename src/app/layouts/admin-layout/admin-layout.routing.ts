import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { CoursesComponent } from 'app/pages/courses/courses.component';
import { UsersComponent } from 'app/pages/users/users.component';
import { LoginComponent } from 'app/pages/login/login.component';
import { UserFormComponent } from 'app/pages/user-form/user-form.component';
import { CourseFormComponent } from 'app/pages/course-form/course-form.component';

import { AdminLayoutComponent } from './admin-layout.component';
import { AboutToExpireComponent } from 'app/pages/about-to-expire/about-to-expire.component';
import { TotalCostComponent } from 'app/pages/total-cost/total-cost.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'courses',        component: CoursesComponent },
    { path: 'users',          component: UsersComponent },
    { path: 'user',           component: UserComponent },
    { path: 'user/:name',           component: UserComponent },
    { path: 'login',          component: AdminLayoutComponent },
    { path: 'createUser',     component: UserFormComponent },
    { path: 'updateUser/:name',     component: UserFormComponent },
    { path: 'createCourse',     component: CourseFormComponent },
    { path: 'updateCourse/:name',     component: CourseFormComponent },
    { path: 'aboutToExpire',  component: AboutToExpireComponent },
    { path: 'aboutToExpire/:name/:year',  component: AboutToExpireComponent },
    { path: 'totalCost',  component: TotalCostComponent }
];
