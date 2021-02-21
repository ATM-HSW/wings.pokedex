// 
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Pokemon } from '../shared/employee';

//import { retry, catchError } from 'rxjs';
import { Pokemon } from './pokemon';
//import { Observable } from 'rxjs';
//import { Observable } from 'rxjs/Observable';



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

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getUsersPokemons() {
    return this.httpClient.get(this.apiURL + 'api/v1/user/pokemon/list');
  }

  public addUserPokemon(pokemon : Object) {
    return this.httpClient.put<Pokemon>(this.apiURL + 'api/v1/user/pokemon/list/add', pokemon)
  }

  public removeUserPokemon(dex : string | any, shiny : boolean) {
    return this.httpClient.delete<Pokemon>(this.apiURL + `api/v1/user/pokemon/list/remove/${dex}-${shiny}`)
  }

  public getAllPokemons() {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/?limit=${this.maxFetch}&offset=0`); 
  } 

  public getPokemonSpeciesDetails(dex : string | any) { 
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon-species/${dex}`);
  }

  public getPokemonDetails(dex : string | any) { 
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${dex}`);
  }

  public getRegions() { 
    return this.httpClient.get('https://pokeapi.co/api/v2/region'); 
  }

  public getSpeciesByPokedex(url : string) { 
    return this.httpClient.get(url); 
  }

  public getRegionDetails(url : string) { 
    return this.httpClient.get(url); 
  }



  // public fetchPokemonFromPokeApi(pokemons: any) {
  //   return this.httpClient.get('https://pokeapi.co/api/v2/pokemon/?limit=80&offset=0').toPromise().then((res: any) => {
  //     pokemons = res[0];
  //     // console.log("pokemons...");
  //     // console.log( res[0]);
  //     // return res[0];
  //     resolve();
  //   });
  // }


  // HttpClient API get() method => Fetch employees list
  // getPokemons(): Observable<Pokemon> {
  //   return this.http.get<Pokemon>(this.apiURL + 'api/v1/users/pokemons');
  //   // .pipe(
  //   //   retry(1),
  //   //   catchError(this.handleError)
  //   )


  // // HttpClient API get() method => Fetch employee
  // getUserPokemons(id): Observable<Employee> {
  //   return this.http.get<Employee>(this.apiURL + '/user/pokemons/' + id)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }  

  // // HttpClient API post() method => Create employee
  // createEmployee(employee): Observable<Employee> {
  //   return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }  

  // // HttpClient API put() method => Update employee
  // updateEmployee(id, employee): Observable<Employee> {
  //   return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  // // HttpClient API delete() method => Delete employee
  // deleteEmployee(id){
  //   return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  // Error handling 
  // handleError(error: { error: { message: string; }; status: any; message: any; }) {
  //    let errorMessage = '';
  //    if(error.error instanceof ErrorEvent) {
  //      // Get client-side error
  //      errorMessage = error.error.message;
  //    } else {
  //      // Get server-side error
  //      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //    }
  //    window.alert(errorMessage);
  //    return throwError(errorMessage);
  // }
}
