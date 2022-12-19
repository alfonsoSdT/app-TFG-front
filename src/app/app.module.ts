import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserFormComponent } from './pages/user-form/user-form.component';
import { CourseFormComponent } from './pages/course-form/course-form.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Ng2SearchPipeModule } from "ng2-search-filter";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CoursesComponent,
    UsersComponent,
    LoginComponent,
    UserFormComponent,
    CourseFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    ReactiveFormsModule,
    NavbarModule,
    NgbModule,
    ToastrModule.forRoot(),
    FooterModule,
    FormsModule,
    FixedPluginModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
