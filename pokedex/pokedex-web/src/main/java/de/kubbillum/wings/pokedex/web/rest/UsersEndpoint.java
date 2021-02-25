package de.kubbillum.wings.pokedex.web.rest;

import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.jaxrs.PathParam;
import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;
import de.kubbillum.wings.pokedex.persistence.entities.Pokemon;

/**
 * Implementation of the REST endpoints for the operations on the User object.
 * 
 * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de> 
 */
@Path("/user")
@Stateless
public class UsersEndpoint {

	@EJB
	private PokedexUserDAO pokedexUserDAO;

	/** 
	 * Add a new user.
	 */
	@PUT
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	public PokedexUser addUser(PokedexUser user) {
		PokedexUser resultUser = pokedexUserDAO.create(user);
		return resultUser;
	}
		
	/** 
	 * Get a list of all existing users.
	 */
	@GET
	@Path("/list")
	@Produces(MediaType.APPLICATION_JSON)
	public List<PokedexUser> getAll() {
		List<PokedexUser> users = pokedexUserDAO.getAllPokedexUsers();
		return users;
	}
	
	/** 
	 * Get a single user by username.
	 */
	@GET
	@Path("/{userName}")
	@Produces(MediaType.APPLICATION_JSON)
	public PokedexUser getUser(@PathParam("userName") String userName) {
		PokedexUser user = pokedexUserDAO.getPokedexUserByUserName(userName);
		return user;
	}
	
	/** 
	 * Get a single user by userId.
	 */
	@GET
	@Path("/pokemon/list/{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Pokemon> getPokemons(@PathParam("userId") Integer userId) {
		List<Pokemon> pokemons = pokedexUserDAO.getPokedexUser(userId).getPokemons();
		return pokemons;
	}
	
	/** 
	 * Add a pokemon to the collection of an user.
	 */
	@PUT
	@Path("/pokemon/list/add/{userId}")
	@Consumes(MediaType.APPLICATION_JSON)
	public List<Pokemon> addPokemon(@PathParam("userId") Integer userId, Pokemon pokemon) {		
		PokedexUser user =  pokedexUserDAO.getPokedexUser(userId);
		user.getPokemons().add(pokemon);
		PokedexUser resultUser = pokedexUserDAO.update(user);			
		return resultUser.getPokemons();
	}
	
	/** 
	 * Remove a pokemon from the collection of an user.
	 */
	@DELETE
	@Path("/pokemon/list/remove/{userId}-{dex}-{shiny}")
	public List<Pokemon> removePokemon(@PathParam("userId") Integer userId, @PathParam("dex") Integer dex, @PathParam("shiny") Boolean shiny) {
		PokedexUser user =  pokedexUserDAO.getPokedexUser(userId);
		user.getPokemons().removeIf(p -> (p.getDex().equals(dex) && p.getShiny().equals(shiny)));
		PokedexUser resultUser = pokedexUserDAO.update(user);	
		return resultUser.getPokemons();
	}
}
