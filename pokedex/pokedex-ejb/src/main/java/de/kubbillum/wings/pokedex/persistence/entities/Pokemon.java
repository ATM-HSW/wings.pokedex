package de.kubbillum.wings.pokedex.persistence.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

/**
 * Entity implementation class for Entity: Pokemon
 *
 */

@Entity
@IdClass(PokemonId.class)
@NamedQuery(name = Pokemon.QUERY_GETALL, query = "SELECT c FROM Pokemon c")
@Table(name = "Pokemon")
public class Pokemon implements Serializable {

	public static final String QUERY_GETALL = "Pokemon.GetAll";

	private static final long serialVersionUID = 1L;
	
	@Id
	private int dex;

	@Id
	private Boolean shiny;

//	@Version
//	@Column(name = "version")
//	private int version;

	@ManyToMany(mappedBy = "pokemons")
	List<PokedexUser> users = new ArrayList<PokedexUser>();
	
	public int getDex() {
		return dex;
	}

	public void setDex(int dex) {
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
	
	public List<PokedexUser> getUsers() {
		return users;
	}

	public void setUsers(List<PokedexUser> users) {
		this.users = users;
	}
}