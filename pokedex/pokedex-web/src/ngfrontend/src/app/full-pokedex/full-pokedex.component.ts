import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../shared/pokemon';
import { RestApiService } from "../shared/rest-api.service";


@Component({
  selector: 'app-full-pokedex',
  templateUrl: './full-pokedex.component.html',
  styleUrls: ['./full-pokedex.component.css']
})



export class FullPokedexComponent implements OnInit {
  constructor(private http: HttpClient, public restApi: RestApiService) {
    this.pokemons = new Array<Array<Pokemon>>()
  }

  // pokemons = [{ "types": ['abc', 'xyz'], "height": "", weight: "", "de" : "", "en" : "", "es" : "", "fr" : "", "it" : "", "ja" : "", "ko" : "" }];
  pokemons!: Pokemon[][]; 

  usersPokemons: Pokemon[] = [];
  pokemons2: any;
  api: string = "https://pokeapi.co/api/v2/pokemon/?limit=898&offset=0"; //898
  textValue = ''; //initial value
  //categories : any = [];
  pokemonCounter = 0;


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.newSearch();
    }


  }

  savePokemon(): void {
    var data = this.restApi.getPokemons().subscribe((data: {}) => {
      alert(data);
    })
  }

  public getPokemonSpeciesDetails(pokemon: Pokemon) {
    this.restApi.getPokemonSpeciesDetails(pokemon.dex).subscribe((data: any) => {
      //set names
      for (let n = 0; n < data.names.length; n++) {
        let language: string = data.names[n].language.name;
        let name: string = data.names[n].name;
        switch (language) {
          case "de":
            pokemon.de = name;
            break;
          case "en":
            pokemon.en = name;
            break;
          case "es":
            pokemon.es = name;
            break;
          case "fr":
            pokemon.fr = name;
            break;
          case "it":
            pokemon.it = name;
            break;
          case "ja":
            pokemon.ja = name;
            break;
          case "ko":
            pokemon.ko = name;
            break;
          default:
        }
      }
    });
  }

  public setPokemonDetails(pokemon: Pokemon, index : number) {
    this.restApi.getPokemonDetails(pokemon.dex).subscribe((data: any) => {
      //set types    
      //console.log(data);
  

      let types: string[] = ['', '', '', '', '', ''];
      for (let n = 0; n < data.types.length; n++) {
        types[n] = data.types[n].type.name
      }
      pokemon.types = types;
      var height = parseFloat(data.height) / 10;
      pokemon.height = `${height} m`;
      var weight = parseFloat(data.weight) / 10;
      pokemon.weight = `${weight} kg`
      pokemon.url_front = data.sprites.front_default;
      
      //set and add shiny pokemon version
      try {
        let pokemonShiny : Pokemon = Object.assign({}, pokemon);
        if(data.sprites.front_shiny != null) {
          pokemonShiny.url_front = data.sprites.front_shiny;
          pokemonShiny.shiny = true;
          this.pokemons[index].push(pokemonShiny);
        }       
      } catch(e) {
        console.log("No shiny exists: " + pokemon.dex);
      }
    });
  }

  getAllPokemons() {
    //this.pokemons = [898][2]; 

    this.restApi.getAllPokemons().subscribe((data: any) => {
      document.getElementById("full-pokedex-spinner")!.style.display = "none";
      this.pokemonCounter = data.results.length
      var counter: number;
      for (var pokemonL1 of data.results!) {
        var lcPokemon: Pokemon = new Pokemon();
        lcPokemon.de = pokemonL1.name;
        lcPokemon.url = pokemonL1.url;
        var urlAr = pokemonL1.url.split("/");
        lcPokemon.dex = urlAr[urlAr.length - 2];
        let lcAr = new Array();
        lcAr.push(lcPokemon);
        this.pokemons.push(lcAr);
        //this.pokemons[this.pokemons.length - 1][0] = lcPokemon;
      }
      for (let i = 0; i < this.pokemons.length; i++) {
        this.setPokemonDetails(this.pokemons[i][0], i);
      }
      for (let i = 0; i < this.pokemons.length; i++) {
        this.getPokemonSpeciesDetails(this.pokemons[i][0]);
      }
      
      console.log(this.pokemons);
    });
  }

  getUsersPokemons() {
    //console.log("getUsersPokemons.");
    this.restApi.getUsersPokemons().subscribe((data: any) => {
      this.usersPokemons = data;
      //console.log(this.usersPokemons);
      
      // document.getElementById("full-pokedex-spinner")!.style.display = "none";
      // this.pokemonCounter = data.results.length
      // var counter: number;
      // for (var pokemonL1 of data.results!) {
      //   var lcPokemon: Pokemon = new Pokemon();
      //   lcPokemon.de = pokemonL1.name;
      //   lcPokemon.url = pokemonL1.url;
      //   var urlAr = pokemonL1.url.split("/");
      //   lcPokemon.dex = urlAr[urlAr.length - 2];
      //   this.pokemons.push(lcPokemon);
      // }
      // for (let i = 0; i < this.pokemons.length; i++) {
      //   this.getPokemonSpeciesDetails(this.pokemons[i]);
      // }
      // for (let i = 0; i < this.pokemons.length; i++) {
      //   this.getPokemonDetails(this.pokemons[i]);
      // }
    });
  }
  

  ngOnInit(): void {
    // var pokemon = Object();
    // pokemon.types = [];
    // pokemon.types.push = ["abc"];
    // pokemon.types.push = ["efg"];
    // this.pokemons.push(pokemon);

    document.getElementById("full-pokedex-spinner")!.style.display = "block";
    //this.fetchPokemonsFromPokeApi();
    this.getAllPokemons()
    //this.buildRegions();
  }

  // fetchSpecies(pokemons: any) {
  //   fetch('https://pokeapi.co/api/v2/pokemon/?limit=898&offset=0') //898
  //     .then(response => response.json())
  //     .then(pokemon => console.log("pokemon: " + pokemon))
  //     .catch(error => console.error('error:', error));
  // }
  searchByNrName(value: string): void {
    document.querySelectorAll('.pokemons').forEach(element => element.classList.remove('pokemon-selected'));

    var searchNrName: HTMLElement;
    if (value.length == 0) {
      alert("Bitte geben Sie den Namen oder die Nummer des Pokémon ein!")
      return;
    }
    value = value;
    var element;

    element = document.getElementsByClassName("pokemon-" + value)[0];
    if (element != null) {
      if (element.closest(".filter-all")!.classList.contains("hidden")) {
        alert("Der gesuchte Pokémon wird durch Ihre Filter ausgeblendet!");
        return;
      }
      element.classList.add("pokemon-selected");
      const yOffset = -20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' })
    } else {
      alert("Zu dem Namen oder der Nummer wurde keine Pokémon gefunden.")
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
    fetch(url)
      .then(response => response.json())
      .then((pokeData) => {
        this.pokemons2.push(pokeData);
      })
  }

  switchShiny(event: any, dex: number) {
    var element = (document.getElementById(`img-pokemon-${dex}`) as HTMLImageElement);
    if (element.src.indexOf("shiny/") > -1) {
      element.src = element.src.replace("shiny/", "");
      event.srcElement.style.color = "white";
    } else {
      element.src = element.src.replace("pokemon/", "pokemon/shiny/");
      event.srcElement.style.color = "#4e73df";
    }
  }
}
