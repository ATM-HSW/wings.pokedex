package de.kubbillum.wings.pokedex.ejb.beans;

import java.time.Instant;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.Schedule;
import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.MessageProducer;
import javax.jms.ObjectMessage;
import javax.jms.Queue;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.json.Json;
import javax.json.JsonObject;

import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;

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

@Singleton
public class BirthdayNotificationBean {

	@Resource(lookup = "java:/ConnectionFactory")
	private ConnectionFactory jmsFactory;

	@Resource(lookup = "java:/jms/queue/exampleQueue")
	private Queue jmsQueue;

	@EJB
	private PokedexUserDAO pokedexUserDAO;

	@Inject
	private JMSContext context;

	@Schedule(hour = "*", minute = "*", second = "*/30", persistent = false)
	public void sendStockInformation() {
		System.out.println("BirthdayNotificationBean...");
		TextMessage message;

		try (Connection connection = jmsFactory.createConnection();
				Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
				MessageProducer producer = session.createProducer(jmsQueue)) {

//			JsonObject stockInformation = Json.createObjectBu#ilder()
//					.add("stockCode", stockCodes[ThreadLocalRandom.current().nextInt(stockCodes.length)])
//					.add("price", ThreadLocalRandom.current().nextDouble(1.0, 150.0))
//					.add("timestamp", Instant.now().toEpochMilli()).build();

			// List<PokedexUser> birthdays = pokedexUserDAO.getUsersHavingBirthday();
		List<PokedexUser> birthdays = pokedexUserDAO.getAllPokedexUsers();

		for (PokedexUser user : birthdays) {
			//context.createProducer().send(birthdayDestination, user);
			ObjectMessage om = session.createObjectMessage();
			om.setObject(user);
			producer.send(om);
		}
//			message = session.createTextMessage();
//			message.setText("BirthdayNotificationBean...");
//
//			producer.send(message);

		} catch (JMSException e) {
			e.printStackTrace();
		}
	}

}
