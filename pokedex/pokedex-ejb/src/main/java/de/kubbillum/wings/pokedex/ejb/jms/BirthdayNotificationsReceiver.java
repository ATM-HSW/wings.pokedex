//package de.kubbillum.wings.pokedex.ejb.jms;
//
//import javax.annotation.Resource;
//import javax.ejb.ActivationConfigProperty;
//import javax.ejb.MessageDriven;
//import javax.jms.JMSException;
//import javax.jms.Message;
//import javax.jms.MessageListener;
//import javax.jms.ObjectMessage;
//import javax.mail.MessagingException;
//import javax.mail.Transport;
//import javax.mail.internet.AddressException;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;
//
//import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;
//
//@MessageDriven(activationConfig = {
//		@ActivationConfigProperty(propertyName = "destination", propertyValue = "java:/jms/queue/BirthdayMailQueue") })
//public class BirthdayNotificationsReceiver implements MessageListener {
//
////	@Resource(name="java:jboss/mail/HSWismar")
////	private javax.mail.Session session; 
//
//	@Override
//	public void onMessage(Message message) {
//		if (message instanceof ObjectMessage) {
//			try {
//				PokedexUser user = message.getBody(PokedexUser.class);
//				System.out.println("Message: " + user.getUserName());
////				
////				if(user.getEmailAdress() != null) {
////					javax.mail.Message mail = new MimeMessage(session);
////					mail.setRecipients(javax.mail.Message.RecipientType.TO, InternetAddress.parse(user.getEmailAdress()));
////					mail.setSubject("Happe Birthday!");
////					mail.setText("Hallo,\n\nHappy Birthday! :-)");
////					Transport.send(mail);
////				}
//			} catch (JMSException e) {
////				// TODO Auto-generated catch block
////				e.printStackTrace();
//			}
////				catch (AddressException e) {
////				// TODO Auto-generated catch block
////				e.printStackTrace();
////			} catch (MessagingException e) {
////				// TODO Auto-generated catch block
////				e.printStackTrace();
////			}
//
//		}
//	}
//}
