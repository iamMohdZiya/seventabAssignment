package com.mednet.assignment.service;

import com.mednet.assignment.model.Prefix;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service("excelService")
@Transactional
public class ExcelService {

    @Autowired
    private PrefixService prefixService;

    public Workbook generateExcelFromPrefixes(List<Prefix> prefixes) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Prefix Data");

        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Prefix Name");
        header.createCell(1).setCellValue("Gender");
        header.createCell(2).setCellValue("Prefix Of");

        int rowIdx = 1;
        for (Prefix p : prefixes) {
            Row row = sheet.createRow(rowIdx++);
            row.createCell(0).setCellValue(p.getPrefixName());
            row.createCell(1).setCellValue(p.getGender());
            row.createCell(2).setCellValue(p.getPrefixOf());
        }

        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);

        return workbook;
    }

    public Workbook generateEmptyTemplate() {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Prefix Data");

        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Prefix Name");
        header.createCell(1).setCellValue("Gender");
        header.createCell(2).setCellValue("Prefix Of");

        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);

        return workbook;
    }

    public Map<String, Object> processExcelUpload(MultipartFile file) throws IOException {
        Map<String, Object> result = new java.util.HashMap<>();

        if (file == null || file.isEmpty()) {
            result.put("success", false);
            result.put("message", "No file uploaded or file is empty.");
            return result;
        }

        int savedCount = 0;
        int skippedCount = 0;
        List<String> rowErrors = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            if (sheet == null) {
                result.put("success", false);
                result.put("message", "Uploaded file has no sheets.");
                return result;
            }

            DataFormatter formatter = new DataFormatter();
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) {
                    skippedCount++;
                    continue;
                }

                String prefixName = formatter.formatCellValue(row.getCell(0)).trim();
                String gender = formatter.formatCellValue(row.getCell(1)).trim();
                String prefixOf = formatter.formatCellValue(row.getCell(2)).trim();

                if (prefixName.isEmpty() && gender.isEmpty() && prefixOf.isEmpty()) {
                    skippedCount++;
                    continue;
                }

                if (prefixName.isEmpty()) {
                    rowErrors.add("Row " + (i + 1) + ": Prefix Name is required.");
                    continue;
                }

                Prefix p = new Prefix();
                p.setPrefixName(prefixName);
                p.setGender(gender.isEmpty() ? null : gender);
                p.setPrefixOf(prefixOf.isEmpty() ? null : prefixOf);

                try {
                    prefixService.savePrefix(p);
                    savedCount++;
                } catch (Exception e) {
                    rowErrors.add("Row " + (i + 1) + ": " + e.getMessage());
                }
            }
        }

        if (!rowErrors.isEmpty()) {
            result.put("success", false);
            result.put("message", "Upload completed with errors. Saved: " + savedCount + ", Skipped: " + skippedCount);
            result.put("errors", rowErrors);
        } else {
            result.put("success", true);
            result.put("message", "Upload successful. Saved: " + savedCount + ", Skipped: " + skippedCount);
        }

        return result;
    }
}

