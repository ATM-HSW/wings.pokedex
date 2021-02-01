import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-pokedex',
  templateUrl: './full-pokedex.component.html',
  styleUrls: ['./full-pokedex.component.css']
})

export class FullPokedexComponent implements OnInit {

  constructor() { }
  pokemons: any;

  textValue = 'initial value';

  ngOnInit(): void {
    const Pokedex = require('pokeapi-js-wrapper');

    const P = new Pokedex.Pokedex();
    P.resource([
      "https://pokeapi.co/api/v2/pokemon/?limit=898&offset=0"
    ]).then((response: any) => {
      console.log(response);
      this.pokemons = response[0].results;
    })
  }

  searchByNrName(value: string): void {
    document.querySelectorAll('.pokemons').forEach(element => element.classList.remove('pokemon-selected'));

    console.log('value: ' + value);
    var searchNrName: HTMLElement;
    // searchNrName = document.getElementById("searchNrName");
    if (value.length == 0) {
      alert("Bitte geben Sie den Namen oder die Nummer des Pokemon ein!")
      return;
    }
    value = value.toLocaleLowerCase();
    var element;// : HTMLElement;
    // if (isNaN(parseInt(value))) {
    //   element = document.getElementsByClassName("pokemon-" + value)[0];
    // } else {
    //   element = document.getElementById("pokemon-" + value);
    // }
    element = document.getElementsByClassName("pokemon-" + value)[0];
    if (element != null) {
      element.classList.add("pokemon-selected");
      //element.scrollIntoView(); LARVESTA
      const yOffset = -20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' })


    } else {
      alert("Zu dem Namen oder der Nummer wurde keine Pokemon gefunden.")
    }
  }
  
}
