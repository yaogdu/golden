package com.home.quiz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * TODO need to be refactored from paper controller
 * <p/>
 * Author : Lance lance7in_gmail_com Date : 19/12/2013 10:36 Since : 0.1
 */
@Controller
@RequestMapping("/parse")
public class DocParseController {
  //
  // /*--------------------------------------------
  // | C O N S T A N T S |
  // ============================================*/
  // private static final Logger logger =
  // Logger.getLogger(DocParseController.class);
  // private static final Map<String, DeferredResult> deferredResultMap =
  // Collections.synchronizedMap(new HashMap<String, DeferredResult>());
  // /*--------------------------------------------
  // | I N S T A N C E V A R I A B L E S |
  // ============================================*/
  // @Autowired
  // private DocParseService docParseService;
  // @Autowired
  // private DocumentService documentService;
  //
  // /*--------------------------------------------
  // | M E T H O D S |
  // ============================================*/
  //
  // /**
  // * 用户上传未切题word
  // *
  // * @return
  // */
  // @RequestMapping(value = "/upload", method = RequestMethod.POST)
  // @ResponseBody
  // public Object uploadRawPaper(MultipartHttpServletRequest request) {
  // Document d = null;
  // Iterator<String> fileNames = request.getFileNames();
  // while (fileNames.hasNext()) {
  // MultipartFile file = request.getFile(fileNames.next());
  // String filename = file.getOriginalFilename();
  // String mimetype = file.getContentType();
  // long size = file.getSize();
  // InputStream is = null;
  // try {
  // is = file.getInputStream();
  // } catch (IOException e) {
  // return "{\"error\": \"无法读取文件\"}";
  // }
  // try {
  // d = documentService.createDocument(filename, is,
  // mimetype, size);
  // //TODO create Temp Question List
  // docParseService.remoteParse(deferredResultMap, d);
  // } catch (DocumentException e) {
  // return "{\"error\": \"服务器内部错误\"}";
  // }
  // }
  // return "{\"path\": \"" + d.getUuid() + "\"}";
  // }
  //
  // /*-------------------REST-------------------*/
  //
  // /**
  // * 用户上传原始doc试卷文档后长轮询此接口
  // *
  // * @param hash
  // * @return
  // */
  // @RequestMapping(value = "/parsed/{paper_hash}", method = RequestMethod.GET)
  // @ResponseBody
  // public DeferredResult getPaperPreview(
  // @PathVariable("paper_hash") String hash) {
  // final DeferredResult deferredResult = new DeferredResult(30000);
  // deferredResult.onTimeout(new Runnable() {
  // @Override
  // public void run() {
  // deferredResult.setResult(new ArrayList<Question>());
  // }
  // });
  // deferredResultMap.put(hash, deferredResult);
  // // logger.debug(hash);
  // return deferredResult;
  // }
  //
  // /**
  // * 供切题服务回调
  // *
  // * @param hash
  // * @param request
  // * @param response
  // * @return
  // */
  // @RequestMapping(value = "/parsed/{paper_hash}", method = RequestMethod.POST)
  // @ResponseBody
  // public Object getParsedPaperZip(@PathVariable("paper_hash") String hash,
  // MultipartHttpServletRequest request,
  // HttpServletResponse response) {
  // Iterator<String> fileNames = request.getFileNames();
  // while (fileNames.hasNext()) {
  // MultipartFile file = request.getFile(fileNames.next());
  // String filename = file.getOriginalFilename();
  // String mimetype = file.getContentType();
  // long size = file.getSize();
  // InputStream is;
  // try {
  // is = file.getInputStream();
  // } catch (IOException e) {
  // return "{\"error\": \"无法读取文件\"}";
  // }
  // try {
  // String path = documentService.handleZip(hash, filename, is,
  // mimetype, size);
  // //TODO generate parsed quesiton list by json metadata
  // } catch (DocumentException e) {
  // return "{\"error\": \"服务器内部错误\"}";
  // }
  // }
  //
  // deferredResultMap.get(hash).setResult(new ArrayList<Question>());
  // // logger.debug(hash);
  // return "{\"success\": true}";
  // }
}
