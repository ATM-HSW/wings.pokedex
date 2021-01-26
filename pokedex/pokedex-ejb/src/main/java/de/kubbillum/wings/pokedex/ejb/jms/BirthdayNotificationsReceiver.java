package de.kubbillum.wings.pokedex.ejb.jms;

import javax.annotation.Resource;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;
import javax.jms.Queue;
import javax.mail.MessagingException;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;

@MessageDriven(activationConfig = {
		@ActivationConfigProperty(propertyName = "destination", propertyValue = "java:/jms/queue/exampleQueue") })
public class BirthdayNotificationsReceiver implements MessageListener {

	@Resource(name="java:jboss/mail/HSWismar")
	private javax.mail.Session session; 


//	@Resource(lookup = "java:/ConnectionFactory")
//	private ConnectionFactory jmsFactory;
//
//	@Resource(lookup = "java:/jms/queue/exampleQueue")
//	private Queue jmsQueue;
	
	@Override
	public void onMessage(Message message) {
		if (message instanceof ObjectMessage) {
			try {
//				String txt = message.getBody(String.class);
//				System.out.println("Message: " + txt);
				PokedexUser user = message.getBody(PokedexUser.class);
							System.out.println("User-E-Mail: " + user.getEmailAdress());

				//if(user.getEmailAdress() != null) {
					javax.mail.Message mail = new MimeMessage(session);
					mail.setFrom(InternetAddress.parse("m.kubbillum@stud.hs-wismar.de")[0]);
					mail.setRecipients(javax.mail.Message.RecipientType.TO, InternetAddress.parse(user.getEmailAdress()));
					mail.setSubject("Happy Birthday " + user.getFirstName());
					mail.setText("Hallo,\n\nHappy Birthday! :-)");
					Transport.send(mail);
				//}
			} catch (JMSException e) {
//				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (AddressException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
	}
}

