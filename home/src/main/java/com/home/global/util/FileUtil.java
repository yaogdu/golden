package com.home.global.util;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

public class FileUtil {

  private String storeDir;

  private String ffmpegPath;

  private static final Logger logger = Logger.getLogger(FileUtil.class);

  public static void changeDirectory(String filename, String oldpath, String newpath, boolean cover) {
    if (!oldpath.equals(newpath)) {
      File oldfile = new File(oldpath + "/" + filename);
      File newfile = new File(newpath + "/" + filename);
      if (newfile.exists()) {
        if (cover) {
          oldfile.renameTo(newfile);
        } else {
          logger.info("Already have the same name:" + filename);
        }
      } else {
        oldfile.renameTo(newfile);
      }
    }
  }

  public static void copyFile(String sourceFileUri, String targetFileUri) {
    File sourceFile = new File(sourceFileUri);
    File targetFile = new File(targetFileUri);
    File directory = targetFile.getParentFile();
    if (!(directory.exists()) && !(directory.isDirectory())) {
      directory.mkdirs();
    }
    try {
      InputStream in = new FileInputStream(sourceFile);
      OutputStream out = new FileOutputStream(targetFile);
      byte b[] = new byte[1024];
      while (in.read(b) != -1) {
        out.write(b);
      }
      out.close();
      in.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static void createDirectory(File directory) {
    if (!directory.exists()) {
      directory.mkdirs();
    }
  }

  public static void createDirectory(String path) {
    File dir = new File(path);
    if (!dir.exists())
      dir.mkdir();
  }

  public static void createFile(String path, String filename) throws IOException {
    File file = new File(path + "/" + filename);
    if (!file.exists()) {
      file.createNewFile();
    }
  }

  public static void createParentDirectory(String path) {
    File directory = new File(path).getParentFile();
    if (!directory.exists()) {
      directory.mkdirs();
    }
  }

  public static void deleteDirectory(String path) {
    File dir = new File(path);
    if (dir.exists()) {
      File[] tmp = dir.listFiles();
      for (int i = 0; i < tmp.length; i++) {
        if (tmp[i].isDirectory()) {
          deleteDirectory(path + "/" + tmp[i].getName());
        } else {
          tmp[i].delete();
        }
      }
      dir.delete();
    }
  }

  public static boolean deleteFile(String path) {
    File file = new File(path);
    if (file.exists()) {
      return file.delete();
    }
    return true;
  }

  public static void deleteFile(String path, String filename) {
    File file = new File(path + "/" + filename);
    if (file.exists() && file.isFile()) {
      file.delete();
    }
  }

  public static void downLoad(String filePath, String filename, HttpServletResponse response, boolean isOnLine) throws Exception {
    File f = new File(filePath);
    logger.info("--Download--" + filePath + filename);
    if (!f.exists()) {
      response.sendError(404, "File not found!");
      return;
    }
    BufferedInputStream br = null;
    OutputStream out = null;
    try {
      br = new BufferedInputStream(new FileInputStream(f));
      byte[] buf = new byte[1024];
      int len = 0;

      response.reset();
      if (isOnLine) {
        URL u = new URL("file:///" + filePath);
        response.setContentType(u.openConnection().getContentType());
        response.setHeader("Content-Disposition", "inline; filename=" + f.getName());

      } else {
        response.setContentType("application/x-msdownload");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(filename, "UTF-8"));
      }
      out = response.getOutputStream();
      out.flush();
      while ((len = br.read(buf)) > 0) {
        out.write(buf, 0, len);
      }
      out.flush();
    } catch (Exception e) {
      return;
    } finally {
      if (br != null)
        br.close();
      if (out != null)
        out.close();
    }
  }

  public static String getDir(String uploadPath, String type) {
    String str = type.toLowerCase();
    str += "/";
    // str+=UtilDateTime.date2Text(new Date());
    // str+="/";
    // str = UtilString.replaceString(str, "-", "/");
    File directory = new File(uploadPath + str);
    if (!(directory.exists()) && !(directory.isDirectory())) {
      directory.mkdirs();
    }
    return uploadPath + str;
  }

  public static String[] getFileNameOrSuffix(String fileName) {
    String[] str = {"", ""};
    if (fileName.lastIndexOf("/") > -1) {
      fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
    }
    StringTokenizer fx = new StringTokenizer(fileName, ".");
    int n = fx.countTokens();
    if (n < 2) {
      str[0] = fileName;
      str[1] = "";
    } else {
      int i = 1;
      while (fx.hasMoreTokens()) {
        str[1] = fx.nextToken();
        if (i != n) {
          str[0] += (i == 1 ? "" : ".") + str[1];
        }
        i++;
      }
    }
    return str;
  }

  public static String readFile(String path) throws IOException {
    File file = new File(path);
    if (!file.exists() || file.isDirectory()) {
      throw new FileNotFoundException();
    }
    InputStreamReader read = new InputStreamReader(new FileInputStream(file), "UTF-8");
    BufferedReader reader = new BufferedReader(read);
    String line = null;
    StringBuffer sb = new StringBuffer();
    while ((line = reader.readLine()) != null) {
      sb.append(line + "\n");
    }

    return sb.toString();
  }

  public static File renameFile(File file) {
    HashMap<String, String> map = new HashMap<String, String>();
    map.put("exe", "zip");
    map.put("bat", "txt");
    map.put("jsp", "txt");
    map.put("html", "txt");
    map.put("js", "txt");
    map.put("css", "txt");
    map.put("htm", "txt");
    map.put("jar", "zip");
    map.put("swf", "zip");
    map.put("war", "zip");
    map.put("ear", "zip");
    map.put("java", "txt");
    map.put("class", "txt");
    String fileType = getFileNameOrSuffix(file.getName())[1];
    String newType = map.get(fileType);
    return new File(file.getParentFile(), RandomEncryptor.filePrefix() + "." + (newType == null ? fileType : newType));
  }

  public static void renameFile(String path, String oldname, String newname) {
    if (!oldname.equals(newname)) {
      File oldfile = new File(path + "/" + oldname);
      File newfile = new File(path + "/" + newname);
      if (newfile.exists()) {
        logger.info(newname + "already in use!");
      } else {
        oldfile.renameTo(newfile);
      }
    }
  }

  public static void writeFile(String content, String path) throws IOException {
    File file = new File(path);
    if (!file.exists() || file.isDirectory()) {
      throw new FileNotFoundException();
    }
    OutputStreamWriter write = new OutputStreamWriter(new FileOutputStream(file), "UTF-8");
    BufferedWriter writer = new BufferedWriter(write);
    writer.write(content);
    writer.close();

  }

  public String getFfmpegPath() {
    return ffmpegPath;
  }

  public String getStoreDir() {
    return storeDir;
  }

  public Map<String, String> getUploadFileInfo(String app, String fileType, String appPath) {
    Map map = new HashMap();
    long time = System.currentTimeMillis();
    String strTime = String.valueOf(time);
    strTime = strTime.substring(1);
    String bstr = strTime.substring(0, strTime.length() - 1);
    String estr = strTime.substring(strTime.length() - 1);
    Long tmp = Long.valueOf(Long.parseLong(bstr));
    String str62 = Num62.longToN62(tmp.longValue());
    Random r = new Random();
    String rStr = String.format("%03d", new Object[] {Integer.valueOf(r.nextInt(1000))});
    StringBuilder backStr = new StringBuilder(estr).append(rStr);
    StringBuilder retBasePath = new StringBuilder(app).append("_").append(str62).append(backStr);
    StringBuilder retPath = new StringBuilder(retBasePath);
    StringBuilder savePath = new StringBuilder(appPath).append(retBasePath);
    // String[] fileNames = this.getFileNameOrSuffix(retBasePath.toString());
    // StringBuilder oriRetPath = new
    // StringBuilder(fileNames[0]).append(".ori.").append(fileNames[1]);
    StringBuilder oriRetPath = new StringBuilder(retBasePath).append(".ori");
    StringBuilder oriSavePath = new StringBuilder(appPath).append(retBasePath).append(".ori");
    if (!("".equals(fileType))) {
      fileType = fileType.toLowerCase();
      retPath.append(".").append(fileType);
      savePath.append(".").append(fileType);
      oriRetPath.append(".").append(fileType);
      oriSavePath.append(".").append(fileType);
    }
    System.out.println("retPath:==" + retPath);
    System.out.println("savePath:==" + savePath);
    System.out.println("oriRetPath:==" + oriRetPath);
    System.out.println("oriSavePath:==" + oriSavePath);
    map.put("retPath", retPath.toString());
    map.put("savePath", savePath.toString());
    map.put("oriRetPath", oriRetPath.toString());
    map.put("oriSavePath", oriSavePath.toString());
    return map;
  }

  public boolean saveFile(InputStream in, String path) {

    boolean isSave = true;
    OutputStream out = null;
    try {
      out = new FileOutputStream(path);
      int n = -1;
      byte[] b = new byte[1024];
      while ((n = in.read(b)) != -1)
        out.write(b, 0, n);
    } catch (Exception e) {
      logger.error(String.format("upload file %s error: %s", new Object[] {path, e.getMessage()}));
      isSave = false;
      try {
        if (out != null)
          out.close();

        in.close();
      } catch (Exception eee) {
        logger.error(eee.getMessage());
      }
    } finally {
      try {
        if (out != null)
          out.close();

        in.close();
      } catch (Exception e) {
        logger.error(e.getMessage());
      }
    }

    return true;
  }

  public void setFfmpegPath(String ffmpegPath) {
    this.ffmpegPath = ffmpegPath;
  }

  public void setStoreDir(String storeDir) {
    System.out.println("this storeDir is: " + storeDir);
    this.storeDir = storeDir;
  }

}
