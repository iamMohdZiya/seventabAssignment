package com.mednet.assignment.controller;

import com.mednet.assignment.dao.PrefixDAO;
import com.mednet.assignment.model.Prefix;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/excel")
public class ExcelController {

    @Autowired
    private PrefixDAO prefixDAO;

    // Download current records as Excel (Source 110)
    @GetMapping("/download")
    public void downloadExcel(HttpServletResponse response) throws IOException {
        List<Prefix> list = prefixDAO.getAllPrefixes();
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Prefix Data");

        // Header Row
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Prefix Name");
        header.createCell(1).setCellValue("Gender");
        header.createCell(2).setCellValue("Prefix Of");

        // Data Rows
        int rowIdx = 1;
        for (Prefix p : list) {
            Row row = sheet.createRow(rowIdx++);
            row.createCell(0).setCellValue(p.getPrefixName());
            row.createCell(1).setCellValue(p.getGender());
            row.createCell(2).setCellValue(p.getPrefixOf());
        }

        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=prefix_data.xlsx");
        workbook.write(response.getOutputStream());
        workbook.close();
    }

    // Upload and refresh data (Source 111, 112)
    @PostMapping("/upload")
    @ResponseBody
    public String uploadExcel(@RequestParam("file") MultipartFile file) throws IOException {
        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);
        DataFormatter formatter = new DataFormatter();

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            String prefixName = formatter.formatCellValue(row.getCell(0)).trim();
            String gender = formatter.formatCellValue(row.getCell(1)).trim();
            String prefixOf = formatter.formatCellValue(row.getCell(2)).trim();

            if (prefixName.isEmpty() && gender.isEmpty() && prefixOf.isEmpty()) {
                continue;
            }

            if (!prefixName.isEmpty()) {
                Prefix p = new Prefix();
                p.setPrefixName(prefixName);
                p.setGender(gender.isEmpty() ? null : gender);
                p.setPrefixOf(prefixOf.isEmpty() ? null : prefixOf);
                prefixDAO.savePrefix(p);
            }
        }
        workbook.close();
        return "Success";
    }

    // Download empty Excel template (Source 111)
    @GetMapping("/template")
    public void downloadTemplate(HttpServletResponse response) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Prefix Data");

        // Header Row only
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Prefix Name");
        header.createCell(1).setCellValue("Gender");
        header.createCell(2).setCellValue("Prefix Of");

        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=prefix_template.xlsx");
        workbook.write(response.getOutputStream());
        workbook.close();
    }
}