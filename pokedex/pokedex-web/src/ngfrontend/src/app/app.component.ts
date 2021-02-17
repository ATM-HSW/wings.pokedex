import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFaviconService } from 'angular-favicon';
import { HttpClient } from '@angular/common/http';
import { FullPokedexComponent } from './full-pokedex/full-pokedex.component';
import { GlobalFunctionsService } from './shared/global-functions.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  types: any = [];

  constructor(private ngxFavicon: AngularFaviconService, private http: HttpClient, public globalFunctions : GlobalFunctionsService) { }
  ngOnInit(): void {
    this.ngxFavicon.setFavicon("favicon.png");
    this.getTypes();
    //console.log("buildRegions");
    this.buildRegions();
  }
  title = 'ngfrontend';

  changeLanguage(lang: string) {
    console.log("changeLanguage...");
    document.querySelectorAll<HTMLElement>('.language').forEach(element => element.style.display = 'none');
    document.querySelectorAll<HTMLElement>(`.language_${lang}`).forEach(element => element.style.display = 'inline');
    document.getElementById("langChange")?.click();
  }

  fullPokedex() {
    document.querySelectorAll<HTMLElement>("#accordionSidebar a.filter.selected").forEach(element => element.classList.remove("selected"));
    document.querySelectorAll<HTMLElement>('.filter-all').forEach(element => element.classList.remove("hidden")); //.display = 'block');
    document.getElementById("a-filter")!.classList.add("collapsed");
    document.getElementById("collapseTwo")!.classList.remove("show");
    document.getElementById("pokemonCounter")!.innerHTML = `${document.querySelectorAll<HTMLElement>('.filter-all').length}`;
    var element = document.getElementById("searchNrName");
    const y = element!.getBoundingClientRect().top;
    window.scrollTo({ top: y, behavior: 'smooth' })
    element!.focus();
  }

  filterPokemons(event: any, removeOtherFilter: boolean) {
    document.querySelectorAll<HTMLElement>("#accordionSidebar a.filter.selected").forEach(element => element.classList.remove("selected"));
    event.srcElement.classList.toggle("selected");

    if (removeOtherFilter) {
      document.querySelectorAll<HTMLElement>('.filter-all').forEach(element => element.classList.remove("selected"));
    }

    document.querySelectorAll<HTMLElement>('.filter-all').forEach(element => element.classList.add("hidden")); //.style.display = 'none');
    document.querySelectorAll("#accordionSidebar a.filter.selected").forEach(element => {
      var filterClass = element.getAttribute("data-filterclass");
      //console.log("filterClass: " + filterClass);
      document.querySelectorAll<HTMLElement>('.' + filterClass).forEach(element => element.classList.remove("hidden")); //.style.display = 'block');
    });
    if (document.querySelectorAll("#accordionSidebar a.filter.selected").length == 0) {
      document.querySelectorAll<HTMLElement>('.filter-all').forEach(element => element.classList.remove("hidden"));//.style.display = 'block');
    }
    var pokemonCounter = document.querySelectorAll<HTMLElement>('.filter-all').length - document.querySelectorAll<HTMLElement>('.filter-all.hidden').length;
    document.getElementById("pokemonCounter")!.innerHTML = `${pokemonCounter}`;
    var element = document.getElementById("searchNrName");
    const y = element!.getBoundingClientRect().top;
    window.scrollTo({ top: y, behavior: 'smooth' })
    element!.focus();
  }


  getTypes() {
    const promise = new Promise<void>((resolve, reject) => {
      const url = `https://pokeapi.co/api/v2/type`; ///https://pokeapi.co/api/v2/pokemon-species/${i}`;
      this.http
        .get(url)
        .toPromise()
        .then((types: any) => {
          //console.log("types...........................................");
          //console.log(types.results);
          for (let n = 0; n < types.results.length; n++) {
            var filterClass = Object();
            filterClass.name = types.results[n].name;
            filterClass.class = `filter-type-${types.results[n].name}`;
            this.types.push(filterClass);
          }
          resolve();
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }

  pokedexRegions: any;
  buildRegions() {
    const promise = new Promise<void>((resolve, reject) => {
      const apiURL = 'https://pokeapi.co/api/v2/pokedex';
      this.http
        .get(apiURL)
        .toPromise()
        .then((res: any) => {
          // Success
          this.pokedexRegions = res.results;
          // for (let n = 0; n < res.results.length; n++) {
          //   console.log(res.results[n].name);
          //   this.pokedexRegions.push(res.results[n].name);

          // }
          resolve();
        },
          err => {
            // Error
            reject(err);
          }
        )
    });
    return promise;
  }

  capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  filterByRegion(event: any) {
    document.querySelectorAll<HTMLElement>("#accordionSidebar a.filter.selected").forEach(element => element.classList.remove("selected"));
    event.srcElement.classList.toggle("selected");
    document.querySelectorAll<HTMLElement>('.filter-all').forEach(element => element.classList.remove("hidden")); //.style.display = 'none');

    var url = event.srcElement.getAttribute("data-filterclass");
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then((res: any) => {
          // Success
          document.querySelectorAll<HTMLElement>('.filter-all').forEach(element => element.classList.add("hidden")); //.style.display = 'none');
          for (let n = 0; n < res.pokemon_entries.length; n++) {
            //console.log(res.pokemon_entries[n].pokemon_species.name);
            //var name = this.capitalizeFirstLetter(res.pokemon_entries[n].pokemon_species.name);
            //name = `pokemon-${name}`;            
            var dexAr = res.pokemon_entries[n].pokemon_species.url.split("/");
            var filterClass = `pokemon-${dexAr[dexAr.length - 2]}`;
            //console.log(filterClass);
            if (document.getElementsByClassName(filterClass).length > 0) {
              document.getElementsByClassName(filterClass)[0].closest(".filter-all")!.classList.remove("hidden"); //.style.display = 'none');
            }
          }
          var pokemonCounter = document.querySelectorAll<HTMLElement>('.filter-all').length - document.querySelectorAll<HTMLElement>('.filter-all.hidden').length;
          document.getElementById("pokemonCounter")!.innerHTML = `${pokemonCounter}`;
          var element = document.getElementById("searchNrName");
          const y = element!.getBoundingClientRect().top;
          window.scrollTo({ top: y, behavior: 'smooth' })
          element!.focus();
        },
          err => {
            // Error
            reject(err);
          }
        )
    });
    return promise;
  }

  switchShinyAll(event: any) {
    event.srcElement.classList.toggle("selected");
    document.querySelectorAll('.img-pokemon').forEach(element => {
      if (event.srcElement.classList.contains("selected")) {
        var elImg = (element as HTMLImageElement);
        var src = elImg.src;
        src = src.replace("shiny/", "");
        src = src.replace("pokemon/", "pokemon/shiny/");
        elImg.src = src;
      } else {
        var elImg = (element as HTMLImageElement);
        var src = elImg.src;
        src = src.replace("shiny/", "");
        elImg.src = src;
      }
    });
    if (event.srcElement.classList.contains("selected")) {
      document.querySelectorAll('.fa-sun').forEach(element => {
        (element as HTMLElement).style.color = "rgb(78, 115, 223)"
      });
    } else {
      document.querySelectorAll('.fa-sun').forEach(element => {
        (element as HTMLElement).style.color = "white"
      });
    }
  }

  //  toggleSelection(pClass : String | undefined, reset : Boolean) {
  //   //document.querySelectorAll(`${pClass}`)[0].classList.toggle('hidden');
  //   if(reset) {
  //     document.querySelectorAll('.filter-all').forEach(element => element.classList.add('hidden'));
  //   }
  //   document.querySelectorAll(`${pClass}`).forEach(element => element.classList.toggle('hidden'));
  //   //this.pokemonCounter = document.querySelectorAll('.filter-all').length - document.querySelectorAll('.filter-all.hidden').length;

  //   //alert(pClass);
  // }
}


