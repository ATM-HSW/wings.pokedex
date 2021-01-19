package de.kubbillum.wings.pokedex.tests;

import static org.junit.Assert.*;

import java.util.Hashtable;
import java.util.Properties;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.junit.Before;
import org.junit.Test;

import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;
import de.kubbillum.wings.pokedex.persistence.enums.Gender;

public class PokedexUserBeanTester {

	private PokedexUserDAO pokedexUserDAO;

	@Before
	public void setUp() throws Exception {
		try {
			final Hashtable<String, Comparable> jndiProperties = new Hashtable<String, Comparable>();
			jndiProperties.put(Context.INITIAL_CONTEXT_FACTORY, "org.wildfly.naming.client.WildFlyInitialContextFactory");
			jndiProperties.put("jboss.naming.client.ejb.context", true); // EJB Context aktivieren
			jndiProperties.put(Context.PROVIDER_URL, "http-remoting://localhost:8080");
			jndiProperties.put(Context.SECURITY_PRINCIPAL, "admin");
			jndiProperties.put(Context.SECURITY_CREDENTIALS, "a");

			final Context context = new InitialContext(jndiProperties);
			final String lookupName = "ejb:pokedex/pokedex-ejb/PokedexUserBean!de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO";
//
//			//
			//https://docs.jboss.org/author/display/WFLY/JNDI%20Reference.html
            //Context context = createInitialContext();
            pokedexUserDAO = (PokedexUserDAO) context.lookup(lookupName);
		} catch (Exception e) {
			throw e;
		}
	}
	
	// ==> https://blog.akquinet.de/2014/09/26/jboss-eap-wildfly-three-ways-to-invoke-remote-ejbs/
	// http://www.mastertheboss.com/jboss-server/jboss-as-7/jboss-as-7-remote-ejb-client-tutorial
	private static Context createInitialContext() throws NamingException {
        Properties jndiProperties = new Properties();
//        jndiProperties.put(Context.INITIAL_CONTEXT_FACTORY, 
//          "org.jboss.naming.remote.client.InitialContextFactory");
		jndiProperties.put(Context.INITIAL_CONTEXT_FACTORY,  "org.wildfly.naming.client.WildFlyInitialContextFactory");
        jndiProperties.put(Context.URL_PKG_PREFIXES, 
          "org.jboss.ejb.client.naming");
        jndiProperties.put(Context.PROVIDER_URL, 
           "http-remoting://localhost:8080");
        jndiProperties.put("jboss.naming.client.ejb.context", true);
        return new InitialContext(jndiProperties);
    }

	@Test
	public void test() {
		assertNotNull(pokedexUserDAO);
		PokedexUser user = new PokedexUser();
		user.setFirstName("Martin");
		user.setLastName("Mustermann");
		user.setGender(Gender.Male);
		user.setUserName("m.kubbillum");
		
		PokedexUser result = pokedexUserDAO.create(user);
		assertNotEquals(result.getId(), 0);	
	}

}
