package com.home.global.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;

import net.coobird.thumbnailator.Thumbnails;

public class CompressPicture {

  public static String compress(InputStream is, Map map) {
    try {
      // net.coobird.thumbnailator.Thumbnails.Builder builder = Thumbnails.of(is).scale(0.3f);

      // System.out.println("heigth is:=" +
      // Thumbnails.of(is).scale(0.3f).asBufferedImage().getHeight());
      // System.out.println("width is:=" +
      // Thumbnails.of(is).scale(0.3f).asBufferedImage().getWidth());
      Thumbnails.of(is).scale(0.3f).toFile(map.get("savePath").toString());

      // Thumbnails.of(is).scale(0.3f).toFile();
      // String[] oriFileName = new FileUtil().getFileNameOrSuffix(map.get("retPath").toString());
      // Thumbnails.of(is).toFile(map.get("oriSavePath").toString());
    } catch (IOException e) {

    }
    return "";
  }

  public static void main(String[] args) {

    try {
      Thumbnails.of("/Users/poppet/Desktop/a.jpg").scale(0.3f).toFile("/Users/poppet/Desktop/111.jpg");
      Thumbnails.of("/Users/poppet/Desktop/a.jpg").scale(0.3f).toFile("/Users/poppet/Desktop/111.jpg");

    } catch (IOException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }

  }
}
