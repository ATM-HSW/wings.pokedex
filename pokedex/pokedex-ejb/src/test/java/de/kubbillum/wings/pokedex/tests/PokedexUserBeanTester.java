package de.kubbillum.wings.pokedex.tests;

import static org.junit.Assert.*;

import java.time.LocalDate;
import java.util.Base64;
import java.util.Hashtable;
import javax.naming.Context;
import javax.naming.InitialContext;
import org.junit.Before;
import org.junit.Test;
import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;
import de.kubbillum.wings.pokedex.persistence.entities.Pokemon;
import de.kubbillum.wings.pokedex.persistence.enums.Gender;
import me.sargunvohra.lib.pokekotlin.client.PokeApi;
import me.sargunvohra.lib.pokekotlin.client.PokeApiClient;
import me.sargunvohra.lib.pokekotlin.model.Item;
import me.sargunvohra.lib.pokekotlin.model.PokemonSpecies;

public class PokedexUserBeanTester {

	private PokedexUserDAO pokedexUserDAO;

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
		} catch (Exception e) {
			throw e;
		}
	}

//	// @Test
//	public void test3() {
//		assertNotNull(pokedexUserDAO);
//
//		PokedexUser user = new PokedexUser();
//		user.setFirstName("Martin");
//		user.setLastName("Mustermann");
//		user.setGender(Gender.Male);
//		user.setUserName("2m.kubbillum");
//		user.setBirthday(LocalDate.parse("1984-05-12"));
//
////		user = new PokedexUser();
////		user.setFirstName("Irina");
////		user.setLastName("Wolfram");
////		user.setGender(Gender.Female);
////		user.setUserName("irina73");
////		user.setBirthday(LocalDate.parse("1973-03-06"));	
//
//		PokedexUser result = pokedexUserDAO.create(user);
//
//		Pokemon pokemon = new Pokemon();
//		pokemon.setNameDe("Jakarta");
//		pokemon.setNameEn("Jakarta");
//		pokemon.setNameFr("Jakarta");
//		pokemon.setNameJa("Jakarta");
//		pokemon.setNameJa("Jakarta");
//		pokemon.setNameKr("Jakarta");
//		pokemon.setNameZh("Jakarta");
//		pokemon.setShinyReleased(false);
//
//		assertNotEquals(result.getId(), 0);
//	}

	@Test
	public void test() {
		//assertNotNull(pokedexUserDAO);
		//PokeApi pokeApi = new PokeApiClient();
		//Item bulbasaur = pokeApi.getItem(1);
		
		//byte[] decoded = Base64.getDecoder().decode(bulbasaur.getSprites().getDefault().getBytes());
		//System.out.println("decoded : " + new String(decoded));   // Outputs "Hello"
		
		//System.out.println(bulbasaur.getSprites().getDefault().getBytes());
		
		PokeApi pokeApi = new PokeApiClient();
		//,pokeApi.getPokemonList(0, 0).getResults().c
       // PokemonSpecies bulbasaur = pokeApi.getPokemonSpecies(111);
       // me.sargunvohra.lib.pokekotlin.model.Pokemon pokemon = pokeApi.getPokemon(1);
        
        //System.out.println("pokemon : " + pokemon.getAbilities().get(0));
       // System.out.println("pokemon 123");
       // System.out.println("pokemon : " + pokemon.getName());
        
        //System.out.println(pokemon.getSprites().getBackDefault());
        for (int i=0; i<=1000;i++) {
            me.sargunvohra.lib.pokekotlin.model.Pokemon pokemon = pokeApi.getPokemon(1);
            System.out.println("pokemon : " + pokemon.getName());

        }
        //System.out.println( pokeApi.));
		assertNotEquals( -1, 0);
	}
}
