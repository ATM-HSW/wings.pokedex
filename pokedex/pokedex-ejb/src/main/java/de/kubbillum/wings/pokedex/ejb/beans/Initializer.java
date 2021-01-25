//package de.kubbillum.wings.pokedex.ejb.beans;
//
//import javax.annotation.Resource;
//import javax.ejb.Singleton;
//import javax.ejb.Startup;
//import javax.enterprise.inject.Produces;
//import javax.jms.JMSDestinationDefinition;
//import javax.jms.JMSDestinationDefinitions;
//import javax.jms.Queue;
//
//@JMSDestinationDefinitions(
//        value = {
//            @JMSDestinationDefinition(
//                    name = "java:/queue/duke-queue",
//                    interfaceName = "javax.jms.Queue",
//                    destinationName = "duke"
//            ),
//            @JMSDestinationDefinition(
//                    name = "java:/topic/duke-topic",
//                    interfaceName = "javax.jms.Topic",
//                    destinationName = "duke-topic"
//            )
//        }
//)
//@Startup
//@Singleton
//public class Initializer {
//     
//    @Resource(lookup = "java:/queue/duke-queue")
//    private Queue queue;      
//    
//    @Produces
//    public Queue expose() {
//        return this.queue;
//    }
//}
