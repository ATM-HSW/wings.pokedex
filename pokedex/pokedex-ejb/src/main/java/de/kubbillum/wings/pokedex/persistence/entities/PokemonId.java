package de.kubbillum.wings.pokedex.persistence.entities;

import java.io.Serializable;

public class PokemonId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public int dex;

	public Boolean shiny;

	public PokemonId(int dex, Boolean shiny) {
	this.dex = dex;
	this.shiny = shiny;
	}

}
