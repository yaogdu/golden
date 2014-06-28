package com.home.global.util;

import java.io.File;
import java.io.IOException;
import java.util.Hashtable;
import java.util.Map;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

public class QrGenerator {

  public static void createQrCode(String contents, int width, int height, String imgPath) throws IOException {
    Map<EncodeHintType, String> hints = new Hashtable<>();
    hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
    BitMatrix encode = null;
    try {
      encode = new MultiFormatWriter().encode(contents, BarcodeFormat.QR_CODE, width, height, hints);
      writeToFile(encode, imgPath.substring(imgPath.lastIndexOf(".") + 1), imgPath);
    } catch (WriterException e) {
      e.printStackTrace();
    }
  }

  public static void main(String[] args) {
    for (int i = 10001; i <= 12000; i++) {
      try {
        System.out.println("creating index: " + i);
        createQrCode("http://qr.ezxdf.cn/quiz/an1/ot1/" + i, 300, 300, "/qr/" + i + ".png");
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  private static void writeToFile(BitMatrix matrix, String format, String imgPath) throws IOException {
    File file = new File(imgPath);
    MatrixToImageWriter.writeToFile(matrix, format, file);
  }
}
