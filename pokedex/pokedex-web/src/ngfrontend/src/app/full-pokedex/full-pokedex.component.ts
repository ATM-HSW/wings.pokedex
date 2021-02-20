import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalFunctionsService } from '../shared/global-functions.service';
import { Pokemon } from '../shared/pokemon';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-full-pokedex',
  templateUrl: './full-pokedex.component.html',
  styleUrls: ['./full-pokedex.component.css']
})

export class FullPokedexComponent implements OnInit {
  constructor(private http: HttpClient, public restApi: RestApiService, public globalFunctions: GlobalFunctionsService) {
    this.pokemons = new Array<Array<Pokemon>>()
  }

  // pokemons = [{ "types": ['abc', 'xyz'], "height": "", weight: "", "de" : "", "en" : "", "es" : "", "fr" : "", "it" : "", "ja" : "", "ko" : "" }];
  pokemons!: Pokemon[][];
  usersPokemons: Pokemon[] = [];
  usersPokemonsIndex: String[] = [];
  pokemons2: any;
  api: string = "https://pokeapi.co/api/v2/pokemon/?limit=898&offset=0"; //898
  textValue = ''; //initial value
  //categories : any = [];
  //pokemonCounter = 0;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.newSearch();
    }
  }

  // savePokemon(): void {
  //   var data = this.restApi.getPokemons().subscribe((data: {}) => {
  //     alert(data);
  //   })
  // }

  toggleInCollection(dex : string | undefined, shiny : boolean, inCollection : boolean) {
    console.log("savePokemonInCollection");
    this.usersPokemonsIndex.push(`${dex}-${shiny}`);
    var index : number = parseInt(dex!) - 1;
    if(shiny) {      
      this.pokemons[index][1].inCollection = !inCollection;
    } else {
      this.pokemons[index][0].inCollection = !inCollection;
    }
  }

  public getPokemonSpeciesDetails(pokemon: Pokemon) {
    if (pokemon.shiny) {
      let dex: number = parseInt(pokemon.dex!);
      pokemon.de = this.pokemons[dex - 1][0].de;
      pokemon.en = this.pokemons[dex - 1][0].en;
      pokemon.es = this.pokemons[dex - 1][0].es;
      pokemon.fr = this.pokemons[dex - 1][0].fr;
      pokemon.it = this.pokemons[dex - 1][0].it;
      pokemon.ja = this.pokemons[dex - 1][0].ja;
    } else {
      this.restApi.getPokemonSpeciesDetails(pokemon.dex).subscribe((data: any) => {
        //set names
        for (let n = 0; n < data.names.length; n++) {
          let language: string = data.names[n].language.name;
          let name: string = data.names[n].name;
          name = name.charAt(0).toUpperCase() + name.slice(1);
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
  }

  public setPokemonDetails(pokemon: Pokemon, index: number) {
    this.restApi.getPokemonDetails(pokemon.dex).subscribe((data: any) => {
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
      if (this.usersPokemonsIndex.includes(`${pokemon.dex}-${pokemon.shiny}`)) {
        pokemon.inCollection = true;
      }

      //set and add shiny pokemon version
      try {
        let pokemonShiny: Pokemon = Object.assign({}, pokemon);
        if (data.sprites.front_shiny != null) {
          pokemonShiny.url_front = data.sprites.front_shiny;
          pokemonShiny.shiny = true;
          if (this.usersPokemonsIndex.includes(`${pokemonShiny.dex}-${pokemonShiny.shiny}`)) {
            pokemonShiny.inCollection = true;
          }
          this.pokemons[index].push(pokemonShiny);
        }
      } catch (e) {
        console.log("No shiny exists: " + pokemon.dex);
      }
      if (index == (this.restApi.maxFetch - 1)) {
        var pokemonCounter = document.querySelectorAll('.filter-all').length - document.querySelectorAll('.filter-all.hidden-true').length;
        document.getElementById("pokemonCounter")!.innerText = `${pokemonCounter}`;
      }
    });
  }

  getAllPokemons() {
    //this.pokemons = [898][2]; 

    this.restApi.getAllPokemons().subscribe((data: any) => {
      //this.pokemonCounter = data.results.length
      var counter: number;
      for (var pokemonL1 of data.results!) {
        var lcPokemon: Pokemon = new Pokemon();
        lcPokemon.de = pokemonL1.name.charAt(0).toUpperCase() + pokemonL1.name.slice(1);
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
      for (let i = 0; i < this.globalFunctions.pokedexRegions.length; i++) {
        this.getSpeciesByRegion(this.globalFunctions.pokedexRegions[i].url, this.globalFunctions.pokedexRegions[i].name);
        // console.log(this.globalFunctions.pokedexRegions[i].name);
        // console.log(this.globalFunctions.pokedexRegions[i].url);


        // //this.pokemonCounter = data.results.length
        // var counter: number;
        // for (var pokemonL1 of data.results!) {
        //   var lcPokemon: Pokemon = new Pokemon();
        //   lcPokemon.de = pokemonL1.name.charAt(0).toUpperCase() + pokemonL1.name.slice(1);
        //   lcPokemon.url = pokemonL1.url;
        //   var urlAr = pokemonL1.url.split("/");
        //   lcPokemon.dex = urlAr[urlAr.length - 2];
        //   let lcAr = new Array();
        //   lcAr.push(lcPokemon);
        //   this.pokemons.push(lcAr);
        //   //this.pokemons[this.pokemons.length - 1][0] = lcPokemon;
        // }
        // for (let i = 0; i < this.pokemons.length; i++) {
        //   this.setPokemonDetails(this.pokemons[i][0], i);
        // }
        // for (let i = 0; i < this.pokemons.length; i++) {
        //   this.getPokemonSpeciesDetails(this.pokemons[i][0]);
        // }

        // console.log(this.pokemons);
      }
    });
  }

  getSpeciesByRegion(url: string, regionName: string) {
    this.restApi.getRegionDetails(url).subscribe((data: any) => {
      this.restApi.getSpeciesByPokedex(data.pokedexes[0].url).subscribe((data: any) => {
        for (var pokemon_entry of data.pokemon_entries) {
          url = pokemon_entry.pokemon_species.url;
          var urlAr = url.split("/");
          let dex: number = parseInt(urlAr[urlAr.length - 2]);
          if (dex <= this.restApi.maxFetch && this.pokemons[dex - 1] !== undefined) {
            this.pokemons[dex - 1][0].regions.push(regionName);
            this.pokemons[dex - 1][0].regions.splice(this.pokemons[dex - 1][0].regions.indexOf(''), 1);
          }
        }
      });
    });
  }

  getUsersPokemons() {
    //console.log("getUsersPokemons.");
    this.usersPokemonsIndex = [];
    this.usersPokemons = [];
    this.restApi.getUsersPokemons().subscribe((data: any) => {
      this.usersPokemons = data;
      console.log(this.usersPokemons);
      for (var pokemon of this.usersPokemons) {
        this.usersPokemonsIndex.push(`${pokemon.dex}-${pokemon.shiny}`);
      }
      console.log("usersPokemonsIndex");
      console.log(this.usersPokemonsIndex);
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
    //document.getElementById("pokemonCounter")!.innerHTML = globalFunctions.spinnerIcon;

    // var pokemon = Object();
    // pokemon.types = [];
    // pokemon.types.push = ["abc"];
    // pokemon.types.push = ["efg"];
    // this.pokemons.push(pokemon);

    //this.fetchPokemonsFromPokeApi();
    this.getUsersPokemons();

    this.getAllPokemons()
    //this.buildRegions();
  }

  searchByNrName(value: string): void {
    document.querySelectorAll('.pokemons').forEach(element => element.classList.remove('pokemon-selected'));

    var searchNrName: HTMLElement;
    if (value.length == 0) {
      alert("Bitte geben Sie den Namen oder die Nummer des Pokémon ein!")
      return;
    }

    var allHidden = true;
    var selection = document.querySelectorAll(".pokemon-" + value);

    selection.forEach(element => {
      if (!element.classList.contains("hidden-true")) {
        allHidden = false;
        element.classList.add("pokemon-selected");
        const yOffset = -20;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
      element.classList.add('pokemon-selected');
    });

    if (selection.length > 0) {
      if (allHidden) {
        alert("Der gesuchte Pokémon wird durch Ihre Filter ausgeblendet!");
      }
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
    if (!event.srcElement.closest(".pokemons").classList.contains('pokemon-selected')) {
      document.querySelectorAll('.pokemons').forEach(element => element.classList.remove('pokemon-selected'));
      event.srcElement.closest(".pokemons").classList.add('pokemon-selected');
    }
  }

  fetchPokemonData(pokemon: { url: any; }) {
    let url = pokemon.url // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
    fetch(url)
      .then(response => response.json())
      .then((pokeData) => {
        this.pokemons2.push(pokeData);
      })
  }

  toggleShinyRegular(pSelector: any) {
    document.querySelectorAll(pSelector).forEach(element => {
      if (element.classList.contains('hidden-true')) {
        element.classList.remove('hidden-true');
        element.classList.add('pokemon-selected');
      } else {
        element.classList.add('hidden-true');
      }
    });
    this.globalFunctions.updateCounter(true, 400);
  }
}
