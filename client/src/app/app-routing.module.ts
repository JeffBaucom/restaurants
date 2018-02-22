import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { WriteComponent } from './write/write.component';

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', redirectTo: ''},
    {path: 'new', component: NewComponent },
    {path: 'reviews/:id', component: ReviewsComponent },
    {path: 'write/:id', component: WriteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
