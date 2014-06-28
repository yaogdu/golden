package com.home.domain.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

/**
 * Author : Lance lance7in_gmail_com Date : 06/01/2014 10:06 Since :
 */
public class ImgPathSerializer extends JsonSerializer<String> {

  @Override
  public void serialize(String value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
    jgen.writeString("/static/temp/" + value);
  }
}
