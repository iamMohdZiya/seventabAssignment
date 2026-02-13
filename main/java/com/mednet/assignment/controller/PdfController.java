package com.mednet.assignment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletContext;
import com.mednet.assignment.service.PrefixService;
import com.mednet.assignment.model.Prefix;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Controller for Tab 7 - PDF Generation using Puppeteer
 */
@RestController
@RequestMapping("/pdf")
public class PdfController {

    @Autowired
    private ServletContext servletContext;

    @Autowired
    private PrefixService prefixService;

    @GetMapping("/generate")
    public void generatePdf(HttpServletResponse response) throws IOException, InterruptedException {
        // Get the real path of the web application
        String appPath = servletContext.getRealPath("/");

        // Path to the puppeteer script - resolve from project root, not web app root
        String scriptPath = "puppeteer-pdf/generate-pdf.js";
        String pdfPath = "puppeteer-pdf/prefix-master.pdf";

        File projectRoot = null;
        File scriptFile = null;
        File pdfFile = null;

        // Strategy 1: Try to find project root from web application path
        if (appPath != null) {
            File appDir = new File(appPath);
            // Navigate up from webapp directory to find project root with puppeteer-pdf
            File current = appDir;
            for (int i = 0; i < 5 && current != null; i++) {
                current = current.getParentFile();
                if (current != null) {
                    File testScript = new File(current, scriptPath);
                    if (testScript.exists()) {
                        projectRoot = current;
                        scriptFile = testScript;
                        pdfFile = new File(current, pdfPath);
                        break;
                    }
                }
            }
        }

        // Strategy 2: Try from current working directory
        if (scriptFile == null || !scriptFile.exists()) {
            projectRoot = new File(System.getProperty("user.dir"));
            File testScript = new File(projectRoot, scriptPath);
            if (testScript.exists()) {
                scriptFile = testScript;
                pdfFile = new File(projectRoot, pdfPath);
            }
        }

        // Strategy 3: Look for pom.xml to identify project root, then check for puppeteer-pdf
        if (scriptFile == null || !scriptFile.exists()) {
            if (appPath != null) {
                File current = new File(appPath);
                for (int i = 0; i < 5 && current != null; i++) {
                    current = current.getParentFile();
                    if (current != null && new File(current, "pom.xml").exists()) {
                        File testScript = new File(current, scriptPath);
                        if (testScript.exists()) {
                            projectRoot = current;
                            scriptFile = testScript;
                            pdfFile = new File(current, pdfPath);
                            break;
                        }
                    }
                }
            }
        }

        // Validate paths before executing
        if (scriptFile == null || !scriptFile.exists()) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Error: Script file not found at: " + (scriptFile != null ? scriptFile.getAbsolutePath() : "unknown path") +
                                      ". Please ensure puppeteer-pdf/generate-pdf.js exists in the project directory.");
            return;
        }

        File workingDir = scriptFile.getParentFile();
        if (!workingDir.exists() || !workingDir.isDirectory()) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Error: Invalid working directory: " + workingDir.getAbsolutePath());
            return;
        }

        // Execute Node.js script to generate PDF
        try {
            List<Prefix> prefixList = prefixService.getAllPrefixes();
            ObjectMapper mapper = new ObjectMapper();
            String prefixDataJson = mapper.writeValueAsString(prefixList);

            ProcessBuilder pb = new ProcessBuilder("node", scriptFile.getAbsolutePath(), prefixDataJson);
            pb.directory(workingDir);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            // Capture output from Node.js script
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder output = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
                System.out.println("[Node.js] " + line);
            }

            // Wait for process to complete
            int exitCode = process.waitFor();

            // Add a small delay to ensure file is fully written
            Thread.sleep(500);

            if (pdfFile != null && pdfFile.exists()) {
                String timestamp = DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss").format(LocalDateTime.now());
                String timestampedName = "prefix-master-" + timestamp + ".pdf";
                File timestampedFile = new File(pdfFile.getParentFile(), timestampedName);

                Files.copy(pdfFile.toPath(), timestampedFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

                response.setContentType("application/json");
                response.getWriter().write(
                    "{\"message\":\"PDF generated successfully with prefix master data\",\"fileName\":\"" + timestampedName + "\"}"
                );
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Error generating PDF. Exit code: " + exitCode +
                                          ". PDF file was not created. Output: " + output.toString());
            }
        } catch (IOException e) {
            // Handle case where Node.js is not installed or not in PATH
            if (e.getMessage().contains("CreateProcess") || e.getMessage().contains("Cannot run program")) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Error: Node.js is not installed or not in system PATH. " +
                                          "Please install Node.js from https://nodejs.org/ and restart the server. " +
                                          "You can still use 'Download Existing PDF' button to download the pre-generated PDF.");
            } else {
                throw e;  // Re-throw other IO exceptions
            }
        } catch (InterruptedException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Error: PDF generation process was interrupted: " + e.getMessage());
        }
    }

    @GetMapping("/download")
    public void downloadExistingPdf(HttpServletResponse response) throws IOException {
        // Download the pre-generated PDF
        String pdfPath = "puppeteer-pdf/sample.pdf";

        // Get the real path of the web application
        String appPath = servletContext.getRealPath("/");

        File projectRoot = null;
        File pdfFile = null;

        // Strategy 1: Try to find project root from web application path
        if (appPath != null) {
            File appDir = new File(appPath);
            // Navigate up from webapp directory to find project root with puppeteer-pdf
            File current = appDir;
            for (int i = 0; i < 5 && current != null; i++) {
                current = current.getParentFile();
                if (current != null) {
                    File testPdf = new File(current, pdfPath);
                    if (testPdf.exists()) {
                        projectRoot = current;
                        pdfFile = testPdf;
                        break;
                    }
                }
            }
        }

        // Strategy 2: Try from current working directory
        if (pdfFile == null || !pdfFile.exists()) {
            projectRoot = new File(System.getProperty("user.dir"));
            File testPdf = new File(projectRoot, pdfPath);
            if (testPdf.exists()) {
                pdfFile = testPdf;
            }
        }

        // Strategy 3: Look for pom.xml to identify project root, then check for puppeteer-pdf
        if (pdfFile == null || !pdfFile.exists()) {
            if (appPath != null) {
                File current = new File(appPath);
                for (int i = 0; i < 5 && current != null; i++) {
                    current = current.getParentFile();
                    if (current != null && new File(current, "pom.xml").exists()) {
                        File testPdf = new File(current, pdfPath);
                        if (testPdf.exists()) {
                            projectRoot = current;
                            pdfFile = testPdf;
                            break;
                        }
                    }
                }
            }
        }


        if (pdfFile != null && pdfFile.exists()) {
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=sample.pdf");

            try (FileInputStream fis = new FileInputStream(pdfFile);
                 OutputStream os = response.getOutputStream()) {
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = fis.read(buffer)) != -1) {
                    os.write(buffer, 0, bytesRead);
                }
            }
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("PDF file not found at: " + (pdfFile != null ? pdfFile.getAbsolutePath() : "unknown path") +
                                      ". Please generate it first.");
        }
    }
}

