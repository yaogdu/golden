package com.home.global.util;

import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.io.File;
import java.io.FileOutputStream;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;

import org.springframework.util.StringUtils;

public class Compress {

  public static boolean compressPic(String srcFilePath, String descFilePath) {
    File file = null;
    BufferedImage src = null;
    FileOutputStream out = null;
    ImageWriter imgWrier;
    ImageWriteParam imgWriteParams;

    // 指定写图片的方式为 jpg
    imgWrier = ImageIO.getImageWritersByFormatName("jpg").next();
    imgWriteParams = new javax.imageio.plugins.jpeg.JPEGImageWriteParam(null);
    // 要使用压缩，必须指定压缩方式为MODE_EXPLICIT
    imgWriteParams.setCompressionMode(imgWriteParams.MODE_EXPLICIT);
    // 这里指定压缩的程度，参数qality是取值0~1范围内，
    imgWriteParams.setCompressionQuality((float) 0.1);
    imgWriteParams.setProgressiveMode(imgWriteParams.MODE_DISABLED);
    ColorModel colorModel = ColorModel.getRGBdefault();
    // 指定压缩时使用的色彩模式
    imgWriteParams.setDestinationType(new javax.imageio.ImageTypeSpecifier(colorModel, colorModel.createCompatibleSampleModel(16, 16)));

    try {
      if (!StringUtils.hasLength(srcFilePath)) {
        return false;
      } else {
        file = new File(srcFilePath);
        src = ImageIO.read(file);
        System.out.println(src.getHeight());
        System.out.println(src.getWidth());
        out = new FileOutputStream(descFilePath);

        imgWrier.reset();
        // 必须先指定 out值，才能调用write方法, ImageOutputStream可以通过任何 OutputStream构造
        imgWrier.setOutput(ImageIO.createImageOutputStream(out));

        // 调用write方法，就可以向输入流写图片
        imgWrier.write(null, new IIOImage(src, null, null), imgWriteParams);
        out.flush();
        out.close();
      }
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
    return true;
  }

  public static void main(String[] args) {
    if (compressPic("/Users/poppet/Desktop/yangting.png", "/Users/poppet/Desktop/yangting2.jpg")) {
      System.out.println("压缩成功！");
    } else {
      System.out.println("压缩失败！");
    }
  }

}
