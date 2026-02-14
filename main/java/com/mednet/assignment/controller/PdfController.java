package com.mednet.assignment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletContext;
import com.mednet.assignment.service.PdfService;
import com.mednet.assignment.web.util.HttpResponseUtil;
import java.io.*;

@RestController
@RequestMapping("/pdf")
public class PdfController {

    @Autowired
    private ServletContext servletContext;

    @Autowired
    private PdfService pdfService;

    @GetMapping("/generate")
    public void generatePdf(HttpServletResponse response) {
        try {
            String appPath = servletContext.getRealPath("/");
            File projectRoot = pdfService.findProjectRoot(appPath);

            if (projectRoot == null) {
                HttpResponseUtil.sendJsonErrorResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Error: Could not find project root or script file. Ensure puppeteer-pdf/generate-pdf.js exists.");
                return;
            }

            File workingDir = new File(projectRoot, "puppeteer-pdf");
            if (!workingDir.exists() || !workingDir.isDirectory()) {
                HttpResponseUtil.sendJsonErrorResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Error: Invalid working directory: " + workingDir.getAbsolutePath());
                return;
            }

            String fileName = pdfService.generatePdfWithPrefixData(workingDir);

            response.setContentType("application/json");
            response.getWriter().write(
                "{\"message\":\"PDF generated successfully with prefix master data\",\"fileName\":\"" + fileName + "\"}"
            );
        } catch (IOException e) {
            if (e.getMessage().contains("CreateProcess") || e.getMessage().contains("Cannot run program")) {
                HttpResponseUtil.sendJsonErrorResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Error: Node.js is not installed or not in system PATH. " +
                    "Please install Node.js from https://nodejs.org/ and restart the server.");
            } else {
                HttpResponseUtil.sendJsonErrorResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Error generating PDF: " + e.getMessage());
            }
        } catch (InterruptedException e) {
            HttpResponseUtil.sendJsonErrorResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                "Error: PDF generation process was interrupted: " + e.getMessage());
        }
    }

    @GetMapping("/download")
    public void downloadExistingPdf(HttpServletResponse response) {
        try {
            String appPath = servletContext.getRealPath("/");
            File projectRoot = pdfService.findProjectRoot(appPath);

            if (projectRoot == null) {
                HttpResponseUtil.sendJsonErrorResponse(response, HttpServletResponse.SC_NOT_FOUND,
                    "Error: Could not find project root.");
                return;
            }

            File pdfFile = pdfService.getPdfFileForDownload(projectRoot);

            if (pdfFile != null && pdfFile.exists()) {
                HttpResponseUtil.streamFileToResponse(response, pdfFile, "application/pdf", "prefix-master.pdf");
            } else {
                HttpResponseUtil.sendJsonErrorResponse(response, HttpServletResponse.SC_NOT_FOUND,
                    "PDF file not found. Please generate it first by clicking 'Generate New PDF'.");
            }
        } catch (IOException e) {
            HttpResponseUtil.sendJsonErrorResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                "Error downloading PDF: " + e.getMessage());
        }
    }
}

