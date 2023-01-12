public class AddressParser {

	public String post_code {get;set;} 
	public String country {get;set;} 
	public String country_abbreviation {get;set;} 
	public List<Places> places {get;set;} 

	public AddressParser(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'post code') {
						post_code = parser.getText();
					} else if (text == 'country') {
						country = parser.getText();
					} else if (text == 'country abbreviation') {
						country_abbreviation = parser.getText();
					} else if (text == 'places') {
						places = arrayOfPlaces(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'AddressParser consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	public class Places {
		public String place_name {get;set;} 
		public String longitude {get;set;} 
		public String state {get;set;} 
		public String state_abbreviation {get;set;} 
		public String latitude {get;set;} 

		public Places(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'place name') {
							place_name= parser.getText();
						} else if (text == 'longitude') {
							longitude = parser.getText();
						} else if (text == 'state') {
							state = parser.getText();
						} else if (text == 'state abbreviation') {
							state_abbreviation = parser.getText();
						} else if (text == 'latitude') {
							latitude = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Places consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	
	public static AddressParser parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new AddressParser(parser);
	}
	
	public static void consumeObject(System.JSONParser parser) {
		Integer depth = 0;
		do {
			System.JSONToken curr = parser.getCurrentToken();
			if (curr == System.JSONToken.START_OBJECT || 
				curr == System.JSONToken.START_ARRAY) {
				depth++;
			} else if (curr == System.JSONToken.END_OBJECT ||
				curr == System.JSONToken.END_ARRAY) {
				depth--;
			}
		} while (depth > 0 && parser.nextToken() != null);
	}
	

    private static List<Places> arrayOfPlaces(System.JSONParser p) {
        List<Places> res = new List<Places>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Places(p));
        }
        return res;
    }




}