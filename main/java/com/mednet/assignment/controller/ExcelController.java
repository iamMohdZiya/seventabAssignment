package com.mednet.assignment.controller;

import com.mednet.assignment.model.Prefix;
import com.mednet.assignment.service.ExcelService;
import com.mednet.assignment.service.PrefixService;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/excel")
public class ExcelController {

    @Autowired
    private ExcelService excelService;

    @Autowired
    private PrefixService prefixService;

    @GetMapping("/download")
    public void downloadExcel(HttpServletResponse response) throws IOException {
        List<Prefix> prefixes = prefixService.getAllPrefixes();
        Workbook workbook = excelService.generateExcelFromPrefixes(prefixes);

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=prefix_data.xlsx");
        workbook.write(response.getOutputStream());
        workbook.close();
    }

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> uploadExcel(@RequestParam("file") MultipartFile file) {
        try {
            Map<String, Object> result = excelService.processExcelUpload(file);

            if ((Boolean) result.get("success")) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }
        } catch (IOException e) {
            Map<String, Object> result = new HashMap<>();
            result.put("success", false);
            result.put("message", "Failed to read Excel file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
    }

    @GetMapping("/template")
    public void downloadTemplate(HttpServletResponse response) throws IOException {
        Workbook workbook = excelService.generateEmptyTemplate();

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=prefix_template.xlsx");
        workbook.write(response.getOutputStream());
        workbook.close();
    }
}