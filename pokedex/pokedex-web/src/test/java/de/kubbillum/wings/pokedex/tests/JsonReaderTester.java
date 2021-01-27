//package de.kubbillum.wings.pokedex.tests;
//
//import static org.junit.Assert.*;
//
//import java.io.File;
//import java.io.IOException;
//import java.math.BigDecimal;
//import java.nio.charset.StandardCharsets;
//import java.nio.file.Files;
//import java.util.List;
//
//import javax.json.Json;
//import javax.json.JsonArray;
//import javax.json.JsonReader;
//import javax.json.stream.JsonParser;
//import javax.json.stream.JsonParser.Event;
//
//import org.junit.Test;
//
//public class JsonReaderTester {
//
////	@Before
////	public void setUp() throws Exception {
////	}
//
//	@Test
//	public void test() {
//		// String data = new String(Files.readAllBytes(Paths.get("pmlist.json")));
//		try {
//
////			ClassLoader classLoader = getClass().getClassLoader();
////			File file = new File(classLoader.getResource("pmlist.json").getFile());
////			printFile(file);
////			System.out.println(file.getAbsolutePath()); // fail("Not yet implemented");
//
//			
//			// final String result = Files.readString(Paths.get("[FILE_NAME]"));
//			// String content = new String(Files.readAllBytes(Paths.get("duke.java")));
//			// final JsonParser parser = Json.createParser(new StringReader(content));
//			final JsonParser parser = Json
//					.createParser(this.getClass().getClassLoader().getResourceAsStream("pmlist.json"));
//			String key = null;
//			String value = null;
//			while (parser.hasNext()) {
//				final Event event = parser.next();
//				switch (event) {
//				case KEY_NAME:
//					key = parser.getString();
//					System.out.println(key);
//					break;
//				case VALUE_STRING:
//					String string = parser.getString();
//					System.out.println(string);
//					break;
//				case VALUE_NUMBER:
//					BigDecimal number = parser.getBigDecimal();
//					System.out.println(number);
//					break;
//				case VALUE_TRUE:
//					System.out.println(true);
//					break;
//				case VALUE_FALSE:
//					System.out.println(false);
//					break;
//				}
//			}
//			parser.close();
//			
////			JsonReader jsonReader = Json
////					.createReader(this.getClass().getClassLoader().getResourceAsStream("pmlist.json"));
////			JsonArray jsonArray = jsonReader.readArray();
////			System.out.println(jsonArray);
//
//			
//			JsonReader jsonReader = Json.createReader(this.getClass().getClassLoader().getResourceAsStream("pmlist.json"));
//			//JsonObject jobj = jsonReader.readObject();
//			JsonArray jAr = jsonReader.readArray();
//		//	System.out.println("jAr" + jobj);
//
//		} catch (Exception e) {
//			System.out.println("Ex: " + e.getMessage());
//		}
//		assertNotNull("2");
//
//	}
//
//	private static void printFile(File file) {
//
//		List<String> lines;
//		try {
//			lines = Files.readAllLines(file.toPath(), StandardCharsets.UTF_8);
//			lines.forEach(System.out::println);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//
//	}
//
//}
