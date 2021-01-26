//package de.kubbillum.wings.pokedex.ejb.beans;
//
//import java.util.Date;
//import javax.annotation.Resource;
//import javax.ejb.LocalBean;
//import javax.ejb.Schedule;
//import javax.ejb.Stateless;
//import javax.ejb.Timer;
//import javax.ejb.TimerService;
//import javax.jms.Connection;
//import javax.jms.ConnectionFactory;
//import javax.jms.Destination;
//import javax.jms.JMSException;
//import javax.jms.MessageProducer;
//import javax.jms.Session;
//import javax.jms.TextMessage;
//import javax.jms.Topic;
//import javax.jms.TopicConnectionFactory;
//
//@Stateless
//@LocalBean
//public class ScheduleTimerBean {
//	@Resource(lookup = "jms/RemoteConnectionFactory")
//	ConnectionFactory connectionFactory;
//	//TopicConnectionFactory connectionFactory;
//	
// 
//	@Resource(lookup = "jms/queue/exampleQueue")
//	Destination destination;
//	//Topic destination;
//	@Resource
//	TimerService timerService;
//
//	//@Schedule(hour = "7", minute = "*")
//	@Schedule(hour = "*", minute = "*", second = "*/30", persistent = false)
//	public void sendTimeMessage(Timer timer) {
//		try {
//			Connection connection = connectionFactory.createConnection();
//			Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
//			MessageProducer messageProducer = session.createProducer(destination);
//			TextMessage textMessage = session.createTextMessage();
//			textMessage.setText(timer.getInfo().toString() + ": " + new Date());
//			messageProducer.send(textMessage);
//		} catch (JMSException e) {
//			e.printStackTrace();
//		}
//	}
//}