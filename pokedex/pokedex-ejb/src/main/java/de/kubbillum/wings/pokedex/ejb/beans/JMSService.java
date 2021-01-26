//package de.kubbillum.wings.pokedex.ejb.beans;
//
//import javax.annotation.Resource;
//import javax.ejb.Schedule;
//import javax.ejb.Singleton;
//import javax.ejb.Startup;
//import javax.enterprise.context.RequestScoped;
//import javax.inject.Inject;
//import javax.jms.JMSContext;
//import javax.jms.Queue;
//
////@RequestScoped
//@Singleton
//@Startup
//public class JMSService {
//
//    @Resource(mappedName = "java:/jms/queue/exampleQueue")
//    private Queue queueExample;
//            
//    @Inject
//    JMSContext context;
//
//	@Schedule(hour = "*", minute = "*", second = "*/30", persistent = false)
//    public void sendMessage() {
//
//        try {    
//
//            context.createProducer().send(queueExample, "txt123");                    
//
//        }
//        catch (Exception exc) {
//            exc.printStackTrace();
//        }
//         
//    } 
//}
