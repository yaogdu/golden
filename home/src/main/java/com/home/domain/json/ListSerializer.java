package com.home.domain.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.util.List;

public class ListSerializer extends JsonSerializer<List> {

  @Override
  public void serialize(List list, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
    if (list != null) {
      jgen.writeString(list.size() + "");
    } else {
      jgen.writeString("0");
    }
  }
}
