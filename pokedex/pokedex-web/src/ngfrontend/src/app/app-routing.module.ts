import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullPokedexComponent } from './full-pokedex/full-pokedex.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'full-pokedex' },
  { path: 'full-pokedex', component: FullPokedexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }