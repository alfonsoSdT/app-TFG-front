import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/courses',       title: 'Courses',           icon:'nc-single-02',  class: '' },
    { path: '/users',       title: 'Users',           icon:'nc-single-02',  class: '' },
    { path: '/aboutToExpire',       title: 'About-to-expire',           icon:'nc-bullet-list-67',  class: '' },
    
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
