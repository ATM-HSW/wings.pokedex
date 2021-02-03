// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserPokemonsComponent } from './user-pokemons/user-pokemons.component';
import { FullPokedexComponent } from './full-pokedex/full-pokedex.component';


const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'create-employee' },
  { path: '', pathMatch: 'full', redirectTo: 'full-pokedex' },

  { path: 'user-edit/:id', component: UserEditComponent },
  { path: 'user-pokemons', component: UserPokemonsComponent },
  { path: 'full-pokedex', component: FullPokedexComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }