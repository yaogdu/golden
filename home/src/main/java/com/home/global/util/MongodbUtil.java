package com.home.global.util;

import org.springframework.stereotype.Service;

/**
 * Created by wangbeichen on 14-1-20.
 */
@Service("MongodbUtil")
public class MongodbUtil {

  // private static final Logger logger = Logger.getLogger(MongodbUtil.class);
  //
  // private GridFS fsQuiz;
  //
  // private GridFS fsResource;
  //
  // private GridFS fsPaper;
  //
  // private String quizUrlPrefix;
  //
  // private String paperUrlPrefix;
  //
  // private String resourceUrlPrefix;
  //
  // private String quizFsCollection;
  //
  // private String paperFsCollection;
  //
  // private String resourceFsCollection;
  //
  // private MongoDbFactory mongoDbFactory;
  //
  // public void setMongoDbFactory(MongoDbFactory mongoDbFactory) {
  // this.mongoDbFactory = mongoDbFactory;
  // }
  //
  // public void setQuizFsCollection(String quizFsCollection) {
  // this.quizFsCollection = quizFsCollection;
  // }
  //
  // public void setResourceFsCollection(String resourceFsCollection) {
  // this.resourceFsCollection = resourceFsCollection;
  // }
  //
  // public void setPaperFsCollection(String paperFsCollection) {
  // this.paperFsCollection = paperFsCollection;
  // }
  //
  // public String getQuizUrlPrefix() {
  // return this.quizUrlPrefix;
  // }
  //
  // public void setQuizUrlPrefix(String quizUrlPrefix) {
  // this.quizUrlPrefix = quizUrlPrefix;
  // }
  //
  // public void setResourceUrlPrefix(String resourceUrlPrefix) {
  // this.resourceUrlPrefix = resourceUrlPrefix;
  // }
  //
  // public String getResourceUrlPrefix() {
  // return this.resourceUrlPrefix;
  // }
  //
  // public String getPaperUrlPrefix() {
  // return paperUrlPrefix;
  // }
  //
  // public void setPaperUrlPrefix(String paperUrlPrefix) {
  // this.paperUrlPrefix = paperUrlPrefix;
  // }
  //
  // public String storeFile(String filePath, Map<String,Object> metaData, TypeMongoFS typeMongoFS)
  // {
  // GridFS gridFS = this.gridFsSelecter(typeMongoFS);
  // InputStream inputStream = null;
  // try {
  // inputStream = new FileInputStream(filePath);
  // // GridFSFile file = gridFsTemplate.store(inputStream,
  // FileUtil.getFileNameOrSuffix(filePath)[0], FileUtil.getFileNameOrSuffix(filePath)[1],
  // metaData);
  //
  // GridFSInputFile file = gridFS.createFile(inputStream);
  // file.setFilename(FileUtil.getFileNameOrSuffix(filePath)[0]+"."+FileUtil.getFileNameOrSuffix(filePath)[1]);
  // file.setContentType(FileUtil.getFileNameOrSuffix(filePath)[1]);
  //
  // if(metaData != null && !metaData.isEmpty()) {
  // DBObject md = new BasicDBObject();
  // for(Map.Entry<String, Object> entry : metaData.entrySet()) {
  // md.put(entry.getKey(), entry.getValue());
  // }
  // file.setMetaData(md);
  // }
  // file.save();
  // return file.getMD5();
  //
  // } catch (FileNotFoundException e) {
  // logger.info("File " + filePath +" not found.");
  // e.printStackTrace();
  // } finally {
  // if (inputStream != null) {
  // try {
  // inputStream.close();
  // } catch (IOException e) {
  // logger.info("File " + filePath +" IO Exception occurs.");
  // e.printStackTrace();
  // }
  // }
  // }
  // return null;
  // }
  //
  // public String storeFile(InputStream fileInputStream, String fileName, String contentType,
  // Map<String,Object> metaData, TypeMongoFS typeMongoFS) {
  // GridFS gridFS = this.gridFsSelecter(typeMongoFS);
  // GridFSInputFile file = gridFS.createFile(fileInputStream);
  // file.setFilename(fileName);
  // file.setContentType(contentType);
  //
  // if(metaData != null && !metaData.isEmpty()) {
  // DBObject md = new BasicDBObject();
  // for(Map.Entry<String, Object> entry : metaData.entrySet()) {
  // metaData.put(entry.getKey(), entry.getValue());
  // }
  // file.setMetaData(md);
  // }
  //
  // file.save();
  // return file.getMD5();
  // }
  //
  // public GridFSDBFile findFile(String fileMD5, TypeMongoFS typeMongoFS) {
  // GridFS gridFS = this.gridFsSelecter(typeMongoFS);
  // DBObject query = new BasicDBObject();
  // query.put("md5", fileMD5);
  // GridFSDBFile file = gridFS.findOne(query);
  // return file;
  // }
  //
  // private String findFileUrl(String fileMD5, TypeMongoFS typeMongoFS) {
  // String urlPrefix = "";
  // switch(typeMongoFS) {
  // case Quiz: urlPrefix = this.getQuizUrlPrefix(); break;
  // case Resource: urlPrefix = this.getResourceUrlPrefix(); break;
  // case Paper: urlPrefix = this.getPaperUrlPrefix(); break;
  // }
  // return urlPrefix + fileMD5;
  // }
  //
  // public synchronized boolean remove(String fileMD5, TypeMongoFS typeMongoFS) {
  // boolean flag = false;
  // GridFS gridFS = this.gridFsSelecter(typeMongoFS);
  // DBObject query = new BasicDBObject();
  // query.put("md5", fileMD5);
  // GridFSDBFile file = gridFS.findOne(query);
  // if(file != null){
  // gridFS.remove(file);
  // flag = true;
  // }
  // return flag;
  // }
  //
  // private GridFS gridFsSelecter(TypeMongoFS typeMongoFS) {
  // GridFS gridFS = null;
  // switch(typeMongoFS) {
  // case Quiz: {
  // if(fsQuiz == null) {
  // fsQuiz = new GridFS(mongoDbFactory.getDb(), quizFsCollection);
  // }
  // gridFS = fsQuiz;
  // } break;
  // case Resource: {
  // if(fsResource == null) {
  // fsResource = new GridFS(mongoDbFactory.getDb(), resourceFsCollection);
  // }
  // gridFS = fsResource;
  // } break;
  // case Paper: {
  // if(fsPaper == null) {
  // fsPaper = new GridFS(mongoDbFactory.getDb(),
  // paperFsCollection);
  // }
  // gridFS = fsPaper;
  // } break;
  // }
  // return gridFS;
  // }

}
