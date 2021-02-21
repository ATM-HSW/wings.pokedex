package de.kubbillum.wings.pokedex.web.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.jboss.resteasy.annotations.jaxrs.PathParam;

import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;
import de.kubbillum.wings.pokedex.persistence.entities.Pokemon;

@Path("/user")
@Stateless
public class UsersEndpoint {

	@EJB
	private PokedexUserDAO pokedexUserDAO;

	@GET
	@Path("/list")
	@Produces(MediaType.APPLICATION_JSON)
	public List<PokedexUser> getAll() {
		List<PokedexUser> users = pokedexUserDAO.getAllPokedexUsers();
		return users;

	}
	
	@GET
	@Path("/pokemon/list")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Pokemon> getPokemons() {
		List<Pokemon> pokemons = pokedexUserDAO.getAllPokedexUsers().get(0).getPokemons();
		return pokemons;
	}
	
	@PUT
	@Path("/pokemon/list/add")
	@Consumes(MediaType.APPLICATION_JSON)
	public List<Pokemon> addPokemon(Pokemon pokemon) {		
		PokedexUser user =  pokedexUserDAO.getAllPokedexUsers().get(0);
		user.getPokemons().add(pokemon);
		PokedexUser resultUser = pokedexUserDAO.update(user);			
		return resultUser.getPokemons();
	}
	
	@DELETE
	@Path("/pokemon/list/remove/{dex}-{shiny}")
	public List<Pokemon> removePokemon(@PathParam("dex") Integer dex, @PathParam("shiny") Boolean shiny) {
		PokedexUser user =  pokedexUserDAO.getAllPokedexUsers().get(0);
		user.getPokemons().removeIf(p -> (p.getDex().equals(dex) && p.getShiny().equals(shiny)));
		PokedexUser resultUser = pokedexUserDAO.update(user);	
		return resultUser.getPokemons();
	}
}
