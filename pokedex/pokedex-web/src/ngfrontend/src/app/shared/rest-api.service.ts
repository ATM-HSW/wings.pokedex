import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  // Define API 
  apiURL = "";
  //apiURL = 'http://localhost:3000';
  //apiURL = 'http://localhost:8080/pokedex-web/api/v1/users';
  maxFetch = 400; //898
  constructor(private httpClient: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getUser(userName: String) {
    return this.httpClient.get(this.apiURL + `api/v1/user/${userName}`);
  }

  public addUser(user: Object) {
    return this.httpClient.put<Object>(this.apiURL + 'api/v1/user/add', user)
  }

  public getUsersPokemons(id: number) {
    return this.httpClient.get(this.apiURL + `api/v1/user/pokemon/list/${id}`);
  }

  public addUserPokemon(userId: number, pokemon: Object) { 
    return this.httpClient.put<Pokemon>(this.apiURL + `api/v1/user/pokemon/list/add/${userId}`, pokemon)
  }

  public removeUserPokemon(userId: number, dex: string | any, shiny: boolean) {
    return this.httpClient.delete<Pokemon>(this.apiURL + `api/v1/user/pokemon/list/remove/${userId}-${dex}-${shiny}`)
  }

  public getAllPokemons() {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/?limit=${this.maxFetch}&offset=0`);
  }

  public getPokemonSpeciesDetails(dex: string | any) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon-species/${dex}`);
  }

  public getPokemonDetails(dex: string | any) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${dex}`);
  }

  public getRegions() {
    return this.httpClient.get('https://pokeapi.co/api/v2/region');
  }

  public getSpeciesByPokedex(url: string) {
    return this.httpClient.get(url);
  }

  public getRegionDetails(url: string) {
    return this.httpClient.get(url);
  }
}
