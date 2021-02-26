import { HttpClient } from '@angular/common/http';
import { OnChanges, SimpleChanges } from '@angular/core';
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

  // Global variable in which a list of the Pokemon is stored. 
  // The HTML for the Pokemons list is generated from this list. 
  // The array is two-dimensional so that a regular and a shiny pokemon can be stored for the same dex-id
  pokemons!: Pokemon[][];

  // Global variable in which the pokemons collection of the logged in user is stored.
  usersPokemons: Pokemon[] = [];

  textValue = '';

  constructor(private http: HttpClient, public restApi: RestApiService, public globalFunctions: GlobalFunctionsService) {
    this.pokemons = new Array<Array<Pokemon>>()
  }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  // Event listener that expects escape.
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.newSearch();
    }
  }

  /**  
  * By calling this function the local web storage is used. All pokemons will be stored,
  * 
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
  useLocalStorage() {
    console.log("useLocalStorage");
    var stPokemons = JSON.parse(JSON.stringify(this.pokemons));
    for (var pokemon of this.usersPokemons) {
      var index1 = parseInt(pokemon.dex!) - 1;
      var index2 = 0;
      if (pokemon.shiny) {
        index2 = 1
      }
      stPokemons[index1][index2].inCollection = false;
    }
    localStorage.setItem("stPokemons", JSON.stringify(stPokemons));
    localStorage.setItem("stUsersPokemons", JSON.stringify(this.usersPokemons));
  }

  /**  
  * This function adds a new Pokemon to a user's collection. For this purpose the REST API is called.
  * The Pokemon object to be stored needs only 2 attributes, which are passed to the method as parameters.
  * 
  * @param {string} dex - dex-ID of the Pokemon
  * @param {string} shiny - is the Pokemon a regular (false) or a shiny (true)
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
  addUserPokemon(dex: string | undefined, shiny: boolean) {
    var index: number = parseInt(dex!) - 1;
    if (shiny) {
      this.pokemons[index][1].inCollection = true;
    } else {
      this.pokemons[index][0].inCollection = true;
    }
    var pokemon: Object = {
      "dex": dex,
      "shiny": shiny
    }
    this.restApi.addUserPokemon(this.globalFunctions.loginUserId, pokemon).subscribe((data: any) => {
      this.usersPokemons = data;
      this.globalFunctions.toggleSelection(false, null);
    });
  }


  /**  
  * This function removes a Pokemon from a user's collection. For this purpose the REST API is called.
  * After that the user collection will be updated and based on that also the filter selection.
  * 
  * @param {string} dex - dex-ID of the Pokemon
  * @param {string} shiny - is the Pokemon a regular (false) or a shiny (true)
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
  removeUserPokemon(dex: string | undefined, shiny: boolean) {
    console.log("removeUserPokemon");
    var index: number = parseInt(dex!) - 1;
    if (shiny) {
      this.pokemons[index][1].inCollection = false;
    } else {
      this.pokemons[index][0].inCollection = false;
    }
    this.restApi.removeUserPokemon(this.globalFunctions.loginUserId, dex, shiny).subscribe((data: any) => {
      this.usersPokemons = data;
      console.log("removeUserPokemon");
      console.log(data);
      this.globalFunctions.toggleSelection(false, null);
    });
  }

  /**  
  * This function enriches the Pokemons of the Pokedex with additional information. 
  * For this, the RESTful PokApi is called.
  * It adds the name of a Pokemon in the different languages.
  * 
  * @param {string} pokemon - Pokemon to be enriched
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
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

  /**  
  * This function enriches the Pokemons of the Pokedex with additional information. 
  * For this, the RESTful PokApi is called.
  * 
  * Property like size and weight are added.
  * It will also check if there is a shiny image to create then also a shiny Pokemon.
  * 
  * @param {string} pokemon - Pokemon to be enriched
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
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

      //set and add shiny pokemon version
      try {
        let pokemonShiny: Pokemon = Object.assign({}, pokemon);
        pokemonShiny.inCollection = false;
        if (data.sprites.front_shiny != null) {
          pokemonShiny.url_front = data.sprites.front_shiny;
          pokemonShiny.shiny = true;
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

  /**  
  * This function fetches all pokemons of the pokedex and stores them in the global variable pokemons.
  * Then the functions for enriching the pokekoms with details are called.
  * 
  * For all this, the RESTful PokeApi is consumed.
  * The information is all stored in the local web storage, so that when the page is reloaded, the information is loaded directly from there.
  * 
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
  getAllPokemons() {
    console.log("getAllPokemons...");
    var stFetchMax = localStorage.getItem("stFetchMax");
    var stPokemons = localStorage.getItem("stPokemons");
    var lcPokemons = null;
    if ((stFetchMax != null && this.restApi.maxFetch == parseInt(stFetchMax) && stPokemons != null)) {
      lcPokemons = JSON.parse(stPokemons);
    }
    if (!(lcPokemons != null && lcPokemons.length > 0 && lcPokemons.length == this.restApi.maxFetch)) {
      localStorage.setItem("stFetchMax", JSON.stringify(this.restApi.maxFetch));

      this.restApi.getAllPokemons().subscribe((data: any) => {
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
        }
        for (let i = 0; i < this.pokemons.length; i++) {
          this.setPokemonDetails(this.pokemons[i][0], i);
        }
        for (let i = 0; i < this.pokemons.length; i++) {
          this.getPokemonSpeciesDetails(this.pokemons[i][0]);
        }
        for (let i = 0; i < this.globalFunctions.pokedexRegions.length; i++) {
          this.getSpeciesByRegion(this.globalFunctions.pokedexRegions[i].url, this.globalFunctions.pokedexRegions[i].name);
        }
      });
    } else {
      this.pokemons = lcPokemons;
      var stLoginUser = localStorage.getItem("stLoginUser");
      if (stLoginUser != null) {
        this.globalFunctions.loginUser = JSON.parse(stLoginUser);
        this.globalFunctions.loginUserId = this.globalFunctions.loginUser.id;
        this.globalFunctions.loginUsername = this.globalFunctions.loginUser.userName;
        this.getUsersPokemons(this.globalFunctions.loginUser.id)
      }
    }
  }

  /**  
  * This function determines the associated Pokemon to a region. 
  * The Pokemons are enriched with the region information so that it can be displayed and the Pokemon can be filtered by it.
  * For this, the RESTful PokApi is called.
  * 
  * @param {string} regionName - name of the region
  * @param {string} url - url for des REST-Api-Call
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
  getSpeciesByRegion(url: string, regionName: string) {
    this.restApi.getRegionDetails(url).subscribe((data: any) => {
      document.getElementById("pokemonCounter")!.innerHTML = this.globalFunctions.spinnerIcon;
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

  /**  
  * The function empties the Pokemon collection of a the logged-in user.
  * After that, the filter display is reset.
  * 
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
  clearUsersPokemon() {
    for (var pokemon_entry of this.pokemons) {
      pokemon_entry[0].inCollection = false;
      pokemon_entry[1].inCollection = false;
    }
    this.usersPokemons = [];
    var filterAll = <HTMLElement>document.querySelectorAll("[data-filterclass='filter-all']")[0];
    filterAll.click();
    var filterRegular = <HTMLElement>document.querySelectorAll("[data-filterclass='filter-shiny-false']")[0];
    filterRegular.click();
  }

  /**  
  * This function fetches the Pokemon collection of the logged in user.
  * After that, the filter display will be updated and the Pokemons in the user's collection will be highlighted.
  * 
  * @param {number} id - id of the user whose pokemons are to be fetched
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
  getUsersPokemons(id: number) {
    console.log("getUsersPokemons.");
    this.usersPokemons = [];
    this.restApi.getUsersPokemons(id).subscribe((data: any) => {
      this.usersPokemons = data;
      for (var pokemon of this.usersPokemons) {
        var index1 = parseInt(pokemon.dex!) - 1;
        var index2 = 0;
        if (pokemon.shiny) {
          index2 = 1
        }
        this.pokemons[index1][index2].inCollection = true;
      }
      //this.globalFunctions.toggleSelection(false, null);
      var filterAll = <HTMLElement>document.querySelectorAll("[data-filterclass='filter-all']")[0];
      filterAll.click();
      var filterInCollection = <HTMLElement>document.querySelectorAll("[data-filterclass='filter-shiny-false']")[0];
      filterInCollection.click();
    });
  }

  /**  
  * This function searches for a pokemon using the parameter 'value'. 
  * If the value is a number, it searches for the dex-id, otherwise it searches for the name of the pokemon. 
  * If there was a hit, it scrolls directly to the Pokemon you were looking for.  * 
  * 
  * @param {string} value - either the dex-id or the name of the pokemon you are looking for
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
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

  /**  
    * This function scrolls up thE page until you see the search box again. 
    * The cursor will be placed in the search field again, so that you can start a new search.
    * 
    * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
    */
  newSearch(): void {
    var element = document.getElementById("searchNrName");
    const y = element!.getBoundingClientRect().top;
    window.scrollTo({ top: y, behavior: 'smooth' })
    element!.focus();
  }

  /**  
   * A selected Pokomen will be highlighted by adding a CSS-class.     
   * 
   * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
   */
  markPokemon(event: any): void {
    if (!event.srcElement.closest(".pokemons").classList.contains('pokemon-selected')) {
      document.querySelectorAll('.pokemons').forEach(element => element.classList.remove('pokemon-selected'));
      event.srcElement.closest(".pokemons").classList.add('pokemon-selected');
    }
  }

  /**  
   * Shows or hides the Shiny or Regular variant of the selected Pokemon by adding a CSS class (hidden-true)    
   * 
   * @param {any} pSelector - CSS selector of the pokemon to be shown/hidden.
   * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
   */
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

  /**  
   * This function is updating the Pokemon counter.   
   * 
   * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
   */
  onImageLoad() {
    var pokemonCounter = document.querySelectorAll('.filter-all').length - document.querySelectorAll('.filter-all.hidden-true').length;
    document.getElementById("pokemonCounter")!.innerText = `${pokemonCounter}`;
  }
}