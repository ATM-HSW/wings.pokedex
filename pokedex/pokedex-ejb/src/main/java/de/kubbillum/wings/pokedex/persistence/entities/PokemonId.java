package de.kubbillum.wings.pokedex.persistence.entities;

import java.io.Serializable;

/**
 * Class for the composite primary key of the Entity Pokemon. 
 * The composite primary key is a combination of the two columns dex and shiny.
 * 
 * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de> 
 */
public class PokemonId implements Serializable {
	
	private static final long serialVersionUID = 1L;

	public Integer dex;

	public Boolean shiny;

	public PokemonId(int dex, Boolean shiny) {
		this.dex = dex;
		this.shiny = shiny;
	}

	public PokemonId() {
		super();
	}

	public Integer getDex() {
		return dex;
	}

	public void setDex(Integer dex) {
		this.dex = dex;
	}

	public Boolean getShiny() {
		return shiny;
	}

	public void setShiny(Boolean shiny) {
		this.shiny = shiny;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public boolean equals(Object other) {
		if (this == other)
			return true;
		if (!(other instanceof PokemonId))
			return false;
		PokemonId castOther = (PokemonId) other;
		return (this.dex).equals(castOther.getDex()) && shiny.equals(castOther.shiny);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.dex.hashCode();
		hash = hash * prime + this.shiny.hashCode();
		return hash;
	}
}
