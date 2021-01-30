package de.kubbillum.wings.pokedex.tests;

import static org.junit.Assert.*;

import java.time.LocalDate;
import java.util.Hashtable;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import org.junit.Before;
import org.junit.Test;
import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.ejb.interfaces.PokemonDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;
import de.kubbillum.wings.pokedex.persistence.entities.Pokemon;
import de.kubbillum.wings.pokedex.persistence.entities.PokemonId;
import de.kubbillum.wings.pokedex.persistence.enums.Gender;
//import me.sargunvohra.lib.pokekotlin.client.PokeApi;
//import me.sargunvohra.lib.pokekotlin.client.PokeApiClient;

public class PokedexUserBeanTester {

	private PokedexUserDAO pokedexUserDAO;

	private PokemonDAO pokemonDAO;

	@Before
	public void setUp() throws Exception {
		try {
			final Hashtable<String, Comparable> jndiProperties = new Hashtable<String, Comparable>();
			jndiProperties.put(Context.INITIAL_CONTEXT_FACTORY,
					"org.wildfly.naming.client.WildFlyInitialContextFactory");
			jndiProperties.put("jboss.naming.client.ejb.context", true); // EJB Context aktivieren
			jndiProperties.put(Context.PROVIDER_URL, "http-remoting://localhost:8080");
			jndiProperties.put(Context.SECURITY_PRINCIPAL, "admin");
			jndiProperties.put(Context.SECURITY_CREDENTIALS, "a");
			final Context context = new InitialContext(jndiProperties);
			final String lookupName = "ejb:pokedex/pokedex-ejb/PokedexUserBean!de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO";
			pokedexUserDAO = (PokedexUserDAO) context.lookup(lookupName);

			final Hashtable<String, Comparable> jndiProperties2 = new Hashtable<String, Comparable>();
			jndiProperties2.put(Context.INITIAL_CONTEXT_FACTORY,
					"org.wildfly.naming.client.WildFlyInitialContextFactory");
			jndiProperties2.put("jboss.naming.client.ejb.context", true); // EJB Context aktivieren
			jndiProperties2.put(Context.PROVIDER_URL, "http-remoting://localhost:8080");
			jndiProperties2.put(Context.SECURITY_PRINCIPAL, "admin");
			jndiProperties2.put(Context.SECURITY_CREDENTIALS, "a");
			final Context context2 = new InitialContext(jndiProperties2);
			final String lookupName2 = "ejb:pokedex/pokedex-ejb/PokemonBean!de.kubbillum.wings.pokedex.ejb.interfaces.PokemonDAO";
			pokemonDAO = (PokemonDAO) context2.lookup(lookupName2);

		} catch (Exception e) {
			throw e;
		}
	}

	@Test
	public void test() {


		
//		PokedexUser user = new PokedexUser();
//		user.setFirstName("Martin");
//		user.setLastName("Mustermann");
//		user.setGender(Gender.Male);
//		user.setUserName("m.kubbillum");
//		user.setEmailAdress("m.kubbillum@stud.hs-wismar.de");
//		user.setBirthday(LocalDate.parse("1984-01-25"));
//		user.getPokemons().add(pokemon);
//		PokedexUser resultUser  = pokedexUserDAO.create(user);
//		assertNotNull(resultUser);
		
		Pokemon pokemon = new Pokemon();
		pokemon.setDex(1523);
		pokemon.setShiny(false);
		PokedexUser user =  pokedexUserDAO.getPokedexUser(1);
		user.getPokemons().add(pokemon);
		PokedexUser resultUser = pokedexUserDAO.update(user);
		

//		Pokemon pokemon = new Pokemon();
//		pokemon.setDex(132);
//		pokemon.setShiny(true);
//		Pokemon resultPokemon = pokemonDAO.create(pokemon);
//	
//		user.getPokemons().add(pokemon);
//		PokedexUser resultUser = pokedexUserDAO.create(user);
//		System.out.println("user: " + resultUser.getUserName());
//		assertNotEquals(resultUser.getId(), 0);

//		PokedexUser user = pokedexUserDAO.getPokedexUser(1);
////		Pokemon pokemon = pokemonDAO.getPokemon(id);
//
//		PokemonId id = new PokemonId(132, Boolean.TRUE);
//		Pokemon p2 = new Pokemon();
//		p2.setDex(132);
//		p2.setShiny(false);
////		Pokemon pokemon = pokemonDAO.create(p2);
//		user.getPokemons().add(p2);
//		PokedexUser resultUser  = pokedexUserDAO.update(user);
		//user.getPokemons().add(pokemon);
		//PokedexUser resultUser = pokedexUserDAO.update(user);
//System.out.println(pokemon.getDex());
//System.out.println(pokemon.getUsers().get(0).getPokemons().get(0).getDex());


//		assertNotNull(resultUser);
	}
}
