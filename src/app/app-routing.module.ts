import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { OtherPostsComponent } from './components/other-posts/other-posts.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'user',
    component: UserPostsComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: 'other',
    component: OtherPostsComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
