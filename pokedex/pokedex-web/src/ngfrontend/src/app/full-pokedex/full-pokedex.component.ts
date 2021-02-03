import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from "../shared/rest-api.service";


@Component({
  selector: 'app-full-pokedex',
  templateUrl: './full-pokedex.component.html',
  styleUrls: ['./full-pokedex.component.css']
})

export class FullPokedexComponent implements OnInit {


  constructor(private http: HttpClient) { }
  pokemons: any;
  pokemons2: any;
  api: string = "https://pokeapi.co/api/v2/pokemon/?limit=898&offset=0"; //898
  textValue = ''; //initial value

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.newSearch();
    }
  }

  fetchPokemonsFromPokeApi() {
    const promise = new Promise<void>((resolve, reject) => {
      const apiURL = this.api;
      this.http
        .get(apiURL)
        .toPromise()
        .then((res: any) => {
          // Success
          console.log("fetchPokemonsFromPokeApi..!");
          //console.log(res);
          this.pokemons = res.results;
          
          
          resolve();
          document.getElementById("full-pokedex-spinner")!.style.display = "none";
        },
          err => {
            // Error
            reject(err);
          }
        ).then((pokemons: any) => {
          console.log("START then..!");

          let i  = 0;
          this.pokemons.forEach( (pokemon: any) => {
            i++;
            const promise = new Promise<void>((resolve, reject) => {
              const url = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
              //console.log(i);
              this.http
                .get(url)
                .toPromise()
                .then((pokemonPokeApi: any) => {
                  // Success
                  //console.log(url);
                  //pokemon = pokemonPokeApi;//.names[3].name; 
                  for(let n=0;n<pokemonPokeApi.names.length;n++) {
                    pokemon[pokemonPokeApi.names[n].language.name]= pokemonPokeApi.names[n].name;
                    if(pokemonPokeApi.names[n].language.name.indexOf('de') > -1) {
                      pokemon.name = pokemonPokeApi.names[n].name;
                    }
                  }
                  console.log(pokemon);
                  // this.pokemons = res.map((res: any) => {
                  //   return res[0];
                  // });
                  //i++;
                  resolve();
                  //document.getElementById("full-pokedex-spinner")!.style.display = "none";
                }, 
                  err => {
                    // Error
                    reject(err);
                  }
                );
            });
          
          });
        });
    });
    return promise;
  }

  updatePokemon() {
    for (let i = 0; i < this.pokemons.length; i++) {

    }
  }

  ngOnInit(): void {
    document.getElementById("full-pokedex-spinner")!.style.display = "block";
    
    //alert(213);
    this.fetchPokemonsFromPokeApi();
    //setTimeout(this.test2(),2000);
    //this.fetchPokemonDataFromPokeApi();


    // fetch('https://pokeapi.co/api/v2/pokemon/?limit=80&offset=0')
    //   .then(response => response.json())
    //   .then(function (pokemonAr) {
    //     console.log("pokemon: " + pokemonAr);
    //     pokemons.push(pokemonAr);

    //     fetch('https://pokeapi.co/api/v2/pokemon-species/1')
    //       .then(response => response.json())
    //       .then(function (pokemon) {
    //         ththis.pokemons.push(pokemon);

    //       })
    //       .catch(error => console.error('error:', error));



    // const Pokedex = require('pokeapi-js-wrapper');

    // const P = new Pokedex.Pokedex();
    // P.resource([
    //   "https://pokeapi.co/api/v2/pokemon/?limit=898&offset=0"
    // ]).then((response: any) => {
    //   //console.log(response);
    //   this.pokemons = response[0].results;
    //   var i = 1;
    //   //for(let pokemon of this.pokemons) {

    //   document.getElementById("full-pokedex-spinner")!.style.display = "none";
    // });

    // for(let i=0; i<this.pokemons.length; i++){
    //   console.log(this.pokemons[i]);
    // P.resource([
    //   'https://pokeapi.co/api/v2/pokemon-species/${i}'
    // ]).then((response: any) => {
    //   console.log("response: ${response}"); 
    //   //console.log("start response2...");
    //   //console.log(response2[0].names[3].name);
    //   //this.pokemons[i].name = response2[0].names[3].name;
    // });
    // }

    //this.fetchKantoPokemon();
  }

  fetchSpecies(pokemons: any) {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=898&offset=0') //898 
      .then(response => response.json())
      .then(pokemon => console.log("pokemon: " + pokemon))
      .catch(error => console.error('error:', error));
  }
  searchByNrName(value: string): void {
    document.querySelectorAll('.pokemons').forEach(element => element.classList.remove('pokemon-selected'));

    //console.log('value: ' + value);
    var searchNrName: HTMLElement;
    if (value.length == 0) {
      alert("Bitte geben Sie den Namen oder die Nummer des Pokemon ein!")
      return;
    }
    value = value;//.toLocaleLowerCase();
    var element;

    element = document.getElementsByClassName("pokemon-" + value)[0];
    if (element != null) {
      element.classList.add("pokemon-selected");
      const yOffset = -20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' })
    } else {
      alert("Zu dem Namen oder der Nummer wurde keine Pokemon gefunden.")
    }
  }

  newSearch(): void {
    var element = document.getElementById("searchNrName");
    const y = element!.getBoundingClientRect().top;
    window.scrollTo({ top: y, behavior: 'smooth' })
    element!.focus();
  }

  markPokemon(event: any): void {
    document.querySelectorAll('.pokemons').forEach(element => element.classList.remove('pokemon-selected'));
    event.srcElement.closest(".pokemons").classList.add('pokemon-selected');
  }

  fetchPokemonData(pokemon: { url: any; }) {
    let url = pokemon.url // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
    //console.log("url: " + url);

    fetch(url)
      .then(response => response.json())
      .then((pokeData) => {
        //console.log(pokeData);
        this.pokemons2.push(pokeData);
      })
  }
  // fetchKantoPokemon() {
  //   console.log("fetchKantoPokemon..");
  //   fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  //     .then(response => response.json())
  //     .then((allpokemon) => {
  //       allpokemon.results.forEach((pokemon: any) => {
  //         this.fetchPokemonData(pokemon);

  //       })
  //     })
  // }

}
