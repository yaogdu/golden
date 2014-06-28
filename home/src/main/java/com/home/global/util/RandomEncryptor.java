package com.home.global.util;

import java.util.Random;

public class RandomEncryptor {

  static char[] str = {
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};

  static char[] digit = {
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};

  static char[] num = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};

  public static String confirmCode() {
    return RandomEncryptor.generate(6) + "-" + System.currentTimeMillis() + "-" + RandomEncryptor.generate(6);
  }

  // upload file prefix
  public static String filePrefix() {
    return RandomEncryptor.generate(8) + "-" + System.currentTimeMillis() + "-" + RandomEncryptor.generate(8);
  }

  public static String getPhoName() {
    return generate(7);
  }

  public static void main(String[] args) {
    String uzzi = RandomEncryptor.uzzi("uio1234");
    System.out.println(uzzi);
    System.out.println(RandomEncryptor.retriveUzziPassword(uzzi));

    // String url = "http://sports.sina.com.cn";
    System.out.println(randomUserId());
  }

  // auto generate password for those who forgot password
  public static String password() {
    return RandomEncryptor.generate(8);
  }

  public static String randomUserId() {
    final int max = 10;
    int c;

    StringBuffer sb = new StringBuffer("");
    Random r = new Random();
    for (int i = 0; i < 5; i++) {
      c = Math.abs(r.nextInt(max));
      sb.append(num[c]);
    }
    return sb.toString();
  }

  // resolve password from uzzi cookie
  public static String retriveUzziPassword(String uzzi) {
    return uzzi.substring(18, uzzi.length() - 6);
  }

  // uzzi cookie
  public static String uzzi(String password) {
    return RandomEncryptor.generate(2) + System.currentTimeMillis() + RandomEncryptor.generate(3) + password + RandomEncryptor.generate(6);
  }

  private static String generate(int length) {
    final int max = 36;
    int c;

    StringBuffer sb = new StringBuffer("");
    Random r = new Random();
    for (int i = 0; i < length; i++) {
      c = Math.abs(r.nextInt(max));
      sb.append(str[c]);
    }
    return sb.toString();
  }
}
