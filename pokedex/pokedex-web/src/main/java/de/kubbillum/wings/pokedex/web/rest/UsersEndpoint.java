package de.kubbillum.wings.pokedex.web.rest;

import java.time.LocalDate;
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
import de.kubbillum.wings.pokedex.persistence.enums.Gender;

@Path("/user")
@Stateless
public class UsersEndpoint {

	@EJB
	private PokedexUserDAO pokedexUserDAO;

	@PUT
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	public PokedexUser addUser(PokedexUser user) {
		PokedexUser resultUser = pokedexUserDAO.create(user);
		return resultUser;
	}
	/**
	 * m.kubbillum
	 * @param userName
	 * @return
	 */
	@GET
	@Path("/{userName}")
	@Produces(MediaType.APPLICATION_JSON)
	public PokedexUser getUser(@PathParam("userName") String userName) {
		PokedexUser user = pokedexUserDAO.getPokedexUserByUserName(userName);
		return user;
	}
	
	@GET
	@Path("/list")
	@Produces(MediaType.APPLICATION_JSON)
	public List<PokedexUser> getAll() {
		List<PokedexUser> users = pokedexUserDAO.getAllPokedexUsers();
		return users;
	}
	
	@GET
	@Path("/pokemon/list/{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Pokemon> getPokemons(@PathParam("userId") Integer userId) {
		List<Pokemon> pokemons = pokedexUserDAO.getPokedexUser(userId).getPokemons();
		return pokemons;
	}
	
	@PUT
	@Path("/pokemon/list/add/{userId}")
	@Consumes(MediaType.APPLICATION_JSON)
	public List<Pokemon> addPokemon(@PathParam("userId") Integer userId, Pokemon pokemon) {		
		PokedexUser user =  pokedexUserDAO.getPokedexUser(userId);
		user.getPokemons().add(pokemon);
		PokedexUser resultUser = pokedexUserDAO.update(user);			
		return resultUser.getPokemons();
	}
	
	@DELETE
	@Path("/pokemon/list/remove/{userId}-{dex}-{shiny}")
	public List<Pokemon> removePokemon(@PathParam("userId") Integer userId, @PathParam("dex") Integer dex, @PathParam("shiny") Boolean shiny) {
		PokedexUser user =  pokedexUserDAO.getPokedexUser(userId);
		user.getPokemons().removeIf(p -> (p.getDex().equals(dex) && p.getShiny().equals(shiny)));
		PokedexUser resultUser = pokedexUserDAO.update(user);	
		return resultUser.getPokemons();
	}
}
