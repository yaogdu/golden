package com.home.global.util;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

public class VideoCapture {

  private static final Logger logger = Logger.getLogger(VideoCapture.class.getName());

  public static void main(String[] args) {
    processTest("/Users/poppet/Desktop/55.mp4", "/Users/poppet/Desktop/66.mp4");
  }

  public static boolean processTest(String inputPath, String outputPath) {

    // 文件命名

    // String savename = map.get("oriSavePath").toString();;
    List<String> commend = new ArrayList<String>();
    // -y, -i, /data/res_fs/qv/66/47/qv_hnRjgR4766.ori.mp4,
    // -f, mp4, /data/res_fs/qv/66/47/qv_hnRjgR4766/mp4/qv_hnRjgR4766.mp4,
    // -an, -vcodec, png, -vframes, 1, -ss, 00:00:01,
    // /data/res_fs/qv/66/47/qv_hnRjgR4766.ori.png

    String c =
        String.format("/Users/poppet/storage/ffmpeg -y -i %s -pix_fmt yuv420p -vcodec libx264 -s 320*640 -b:v 512k -r 30 -f mp4 %s ",
            inputPath, outputPath);
    // String c =
    // String.format("/Users/poppet/storage/ffmpeg -y -i %s vcodec libx264 -b:v 512k -f mp4 %s ",
    // inputPath, outputPath);
    // String c =
    // String.format("/Users/poppet/storage/ffmpeg -y -i %s -pix_fmt yuv420p -vcodec h264 -f mp4 %s ",
    // inputPath, outputPath);

    // String c =
    // String.format("/Users/poppet/storage/ffmpeg -y -i %s -f mp4 -bitexact -vcodec h263 -b:v 512k -ab 320k %s ",
    // inputPath, outputPath);

    // -an -vcodec png -vframes 1 -ss 00:00:01 %s

    List<String> cc = Arrays.asList(c.split(" "));

    for (String s : cc) {
      commend.add(s);
    }

    logger.info(commend.toString());

    try {

      ProcessBuilder builder = new ProcessBuilder();
      builder.command(commend);
      // builder.start();

      builder.redirectErrorStream(true);

      logger.info("视频转换开始...");

      builder.start();

      Process process = builder.start();

      InputStream in = process.getInputStream();

      byte[] re = new byte[1024];

      System.out.print("正在进行转换，请稍候");

      while (in.read(re) != -1) {

        System.out.print(".");

      }
      System.out.println("");

      logger.info("success");

      in.close();

      return true;

    } catch (Exception e) {

      e.printStackTrace();

      return false;

    }
  }

  public boolean capture(Map map) {
    // 视频文件
    String videoRealPath = map.get("oriSavePath").toString();
    // 截图的路径（输出路径）
    String imageRealPath = map.get("savePath").toString();

    // 方法一：调用批处理程序，调用批处理文件ffmpeg.bat转换视频格式
    // try {
    // //调用批处理文件
    // Runtime.getRuntime().exec("cmd /c start C:\\Users\\Administrator\\Desktop\\test\\ffmpeg.bat "
    // + videoRealPath + " " + imageRealPath);
    // } catch (IOException e) {
    // // TODO Auto-generated catch block
    // e.printStackTrace();
    // }

    // 方法二：通过命令提示符来调用需要添加系统路径（Path），调用menconder转换视频各种
    // commendF
    // .add("cmd.exe /c mencoder E:\\Eclipse2\\test.flv -o e:\\Eclipse2\\test.avi
    // -oac mp3lame -lameopts cbr:br=32
    // -ovc x264 -x264encopts bitrate=440 -vf scale=448:-3");

    // 方法三：调用系统中的可执行程序调用ffmpeg 提取视屏缩略图
    List<String> commend = new java.util.ArrayList<String>();

    commend.add(map.get("commandPath").toString() + "ffmpeg");
    commend.add("-i");
    commend.add(videoRealPath);
    commend.add("-y");
    commend.add("-f");
    commend.add("image2");
    commend.add("-ss");
    commend.add("8");
    commend.add("-t");
    commend.add("0.001");
    commend.add("-s");
    commend.add("350x240");
    commend.add(imageRealPath);

    try {

      ProcessBuilder builder = new ProcessBuilder();

      builder.command(commend);

      builder.redirectErrorStream(true);

      logger.info("视频截图开始...");

      // builder.start();

      Process process = builder.start();

      InputStream in = process.getInputStream();

      byte[] re = new byte[1024];

      System.out.print("正在进行截图，请稍候");

      while (in.read(re) != -1) {

        System.out.print(".");

      }

      logger.info("");

      in.close();

      logger.info("视频截图完成...");
      return true;

    } catch (Exception e) {

      e.printStackTrace();

      logger.info("视频截图失败！");
      return false;

    }
  }

  public boolean processMP4(Map map) {

    // 文件命名

    String savename = map.get("oriSavePath").toString();;
    List<String> commend = new ArrayList<String>();
    // -y -i %s -pix_fmt yuv420p -vcodec libx264 -s 320*640 -b:v 512k -r 30 -f mp4 %s
    // String c =
    // String.format("%s -y -i %s -pix_fmt yuv420p -r 30 -f mp4 %s ",
    // map.get("commandPath").toString() + "ffmpeg", map.get("oriSavePath")
    // .toString(), savename.substring(0, savename.lastIndexOf(".") + 1) + "mp4");
    String c =
        String.format("%s -y -i %s -pix_fmt yuv420p -vcodec libx264 -s 320*640 -b:v 512k -r 30 -f mp4 %s ", map.get("commandPath")
            .toString()
            + "ffmpeg", map.get("oriSavePath").toString(), savename.substring(0, savename.lastIndexOf(".") + 1) + "mp4");

    List<String> cc = Arrays.asList(c.split(" "));

    for (String s : cc) {
      commend.add(s);
    }

    logger.info(commend.toString());

    // commend.add(map.get("commandPath").toString() + "ffmpeg");
    // commend.add("-y");
    // commend.add("-i");
    // // commend.add("-qscale");
    // // commend.add("6");
    // commend.add(map.get("oriSavePath").toString());
    //
    // // String convertUrl = "-ab 128 -acodec libmp3lame -ac 1 -ar 22050 -r 29.97 -qscale 6 -y";
    // // String convertUrl = "-ac 1 -ar 22050 -r 29.97 -qscale 6 -y";
    // // commend.addAll(Arrays.asList(convertUrl.split(" ")));
    //
    // commend.add(savename.substring(0, savename.lastIndexOf(".") + 1) + "mp4");
    //
    // logger.info(commend.toString());
    try {

      ProcessBuilder builder = new ProcessBuilder();
      builder.command(commend);
      // builder.start();

      builder.redirectErrorStream(true);

      logger.info("视频转换开始...");

      builder.start();

      Process process = builder.start();

      InputStream in = process.getInputStream();

      byte[] re = new byte[1024];

      System.out.print("正在进行转换，请稍候");

      while (in.read(re) != -1) {

        System.out.print(".");

      }

      logger.info("");

      in.close();

      logger.info("视频转换完成..." + savename.substring(0, savename.lastIndexOf(".") + 1) + "mp4");
      return true;

    } catch (Exception e) {

      e.printStackTrace();

      logger.info("视频转换失败！" + savename.substring(0, savename.lastIndexOf(".") + 1) + "mp4");
      return false;

    }

  }

}
