package de.kubbillum.wings.pokedex.tests;

import static org.junit.Assert.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashSet;
import java.util.Hashtable;
import javax.naming.Context;
import javax.naming.InitialContext;
import org.junit.Before;
import org.junit.Test;
import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.ejb.interfaces.PokemonDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;
import de.kubbillum.wings.pokedex.persistence.entities.Pokemon;
import de.kubbillum.wings.pokedex.persistence.enums.Gender;
import me.sargunvohra.lib.pokekotlin.client.PokeApi;
import me.sargunvohra.lib.pokekotlin.client.PokeApiClient;
import me.sargunvohra.lib.pokekotlin.model.Item;
import me.sargunvohra.lib.pokekotlin.model.PokemonSpecies;

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
		Pokemon result = null;
		try {
			assertNotNull(pokedexUserDAO);

//
			Pokemon pokemon = new Pokemon();
			pokemon.setDex(3);
			pokemon.setShiny(false);

			 result = pokemonDAO.create(pokemon);
		} catch (Exception e) {
			System.out.println(e.getMessage());

			
		}
		assertNotNull(result);
		//
//		
//		PokedexUser user = new PokedexUser();
//		user.setFirstName("Martin");
//		user.setLastName("Mustermann"); 
//		user.setGender(Gender.Male);
//		user.setUserName("m22.kubbillum");
//		user.setBirthday(LocalDate.parse("1984-05-12"));
//		
////		user.setPokemons(Arrays.asList(pokemon));

//		user = new PokedexUser();
//		user.setFirstName("Irina");
//		user.setLastName("Wolfram");
//		user.setGender(Gender.Female);
//		user.setUserName("irina73");
//		user.setBirthday(LocalDate.parse("1973-03-06"));	

		// PokedexUser result = pokedexUserDAO.create(user);

		// assertNotEquals(result.getId(), 0);
	}

	// @Test
	public void test3() {
		// assertNotNull(pokedexUserDAO);
		// PokeApi pokeApi = new PokeApiClient();
		// Item bulbasaur = pokeApi.getItem(1);

		// byte[] decoded =
		// Base64.getDecoder().decode(bulbasaur.getSprites().getDefault().getBytes());
		// System.out.println("decoded : " + new String(decoded)); // Outputs "Hello"

		// System.out.println(bulbasaur.getSprites().getDefault().getBytes());

		PokeApi pokeApi = new PokeApiClient();
		// ,pokeApi.getPokemonList(0, 0).getResults().c
		// PokemonSpecies bulbasaur = pokeApi.getPokemonSpecies(111);
		// me.sargunvohra.lib.pokekotlin.model.Pokemon pokemon = pokeApi.getPokemon(1);

		// System.out.println("pokemon : " + pokemon.getAbilities().get(0));
		// System.out.println("pokemon 123");
		// System.out.println("pokemon : " + pokemon.getName());

		// System.out.println(pokemon.getSprites().getBackDefault());
		for (int i = 0; i <= 1000; i++) {
			me.sargunvohra.lib.pokekotlin.model.Pokemon pokemon = pokeApi.getPokemon(1);
			System.out.println("pokemon : " + pokemon.getName());

		}
		// System.out.println( pokeApi.));
		assertNotEquals(-1, 0);
	}
}
