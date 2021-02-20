import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";


@Component({
  selector: 'app-user-pokemons',
  templateUrl: './user-pokemons.component.html',
  styleUrls: ['./user-pokemons.component.css']
}) 
export class UserPokemonsComponent implements OnInit {

  UserPokemon: any = [];


  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    //this.loadUserPokemons()
  }

  // Get employees list
  // loadUserPokemons() {
  //   return this.restApi.getPokemons().subscribe((data: {}) => {
  //     this.UserPokemon = data;
  //   })
  // }

  // Delete employee
  // deleteEmployee(id: any) {
  //   if (window.confirm('Are you sure, you want to delete?')){
  //     this.restApi.deleteEmployee(id).subscribe(data => {
  //       this.loadEmployees()
  //     })
  //   }
  // }  

}
