import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MemberComponent } from './member/member.component';
import { RegisterComponent } from './register/register.component';
import { WriteComponent } from './write/write.component';
import { BlogComponent } from  './blog/blog.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch: 'full'
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'home',
    component:HomeComponent
   },
   {
     path:'member',
     component: MemberComponent,
     canActivate: [AuthenticationGuard]
   },
   {
    path:'write',
    component:WriteComponent
   },
   {
    path:'blog/:blogId',
    component: BlogComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
