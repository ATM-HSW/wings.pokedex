//package de.kubbillum.wings.pokedex.ejb.beans;
//
//import java.util.List;
//
//import javax.annotation.PostConstruct;
//import javax.annotation.Resource;
//import javax.ejb.EJB;
//import javax.ejb.Schedule;
//import javax.ejb.Startup;
//import javax.inject.Inject;
//import javax.jms.Destination;
//import javax.jms.JMSContext;
//import javax.jms.JMSDestinationDefinition;
//import javax.jms.JMSDestinationDefinitions;
//import javax.ejb.Singleton;
//
//import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
//import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;
//
//@Singleton
//@Startup
//@JMSDestinationDefinitions({
//		@JMSDestinationDefinition(name = "java:/jms/queue/exampleQueue", interfaceName = "javax.jms.Queue") })
//public class BirthdayNotificationBean {
//
////	@EJB
////	private PokedexUserDAO pokedexUserDAO;
//
//	@Inject
//	private JMSContext context;
//
//	// @Resource(lookup = "java:/jms/queue/exampleQueue")
//
//	//@Resource(lookup = "java:/jms/queue/exampleQueue")
//	@Resource(mappedName = "java:/jms/queue/exampleQueue")	
//	private Destination birthdayDestination;
//
//	@PostConstruct
//	@Schedule(hour = "*", minute = "*", second = "*/30", persistent = false)
//	private void checkBirthday() {
//		context.createProducer().send(birthdayDestination, "user");
//		// List<PokedexUser> birthdays = pokedexUserDAO.getUsersHavingBirthday();
////		List<PokedexUser> birthdays = pokedexUserDAO.getAllPokedexUsers();
//
////		for (PokedexUser user : birthdays) {
////			context.createProducer().send(birthdayDestination, user);
////		}
//	}
//
//}
