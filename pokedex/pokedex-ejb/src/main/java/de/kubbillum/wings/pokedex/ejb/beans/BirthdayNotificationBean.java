package de.kubbillum.wings.pokedex.ejb.beans;

import java.util.List;

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

import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;

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
		if (false) {
			System.out.println("BirthdayNotificationBean...");
			TextMessage message;

			try (Connection connection = jmsFactory.createConnection();
					Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
					MessageProducer producer = session.createProducer(jmsQueue)) {
				List<PokedexUser> birthdays = pokedexUserDAO.getAllPokedexUsers();

				for (PokedexUser user : birthdays) {
					ObjectMessage om = session.createObjectMessage();
					om.setObject(user);
					producer.send(om);
				}

			} catch (JMSException e) {
				e.printStackTrace();
			}
		}
	}
}
