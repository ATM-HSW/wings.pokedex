package de.kubbillum.wings.pokedex.persistence.entities;

import java.io.Serializable;
import javax.persistence.*;

/**
 * Entity implementation class for Entity Pokemon.
 * 
 * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de> 
 */
@Entity
@IdClass(PokemonId.class)
@NamedQuery(name = Pokemon.QUERY_GETALL, query = "SELECT c FROM Pokemon c")
@Table(name = "Pokemon")
public class Pokemon implements Serializable {

	public static final String QUERY_GETALL = "Pokemon.GetAll";

	private static final long serialVersionUID = 1L;
	
	@Id
	private Integer dex;

	@Id
	private Boolean shiny;
	
	public Integer getDex() {
		return dex;
	}
 
	public void setDex(Integer dex) {
		this.dex = dex;
	}
	
	public Pokemon() {
		super();
	}

	public Boolean getShiny() {
		return shiny;
	}

	public void setShiny(Boolean shiny) {
		this.shiny = shiny;
	}
}