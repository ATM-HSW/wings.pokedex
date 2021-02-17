import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserPokemonsComponent } from './user-pokemons/user-pokemons.component';
import { RouterModule } from '@angular/router';
import { FullPokedexComponent } from './full-pokedex/full-pokedex.component';


@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    UserPokemonsComponent,
    FullPokedexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
