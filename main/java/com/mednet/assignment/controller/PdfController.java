package com.mednet.assignment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletContext;
import java.io.*;

/**
 * Controller for Tab 7 - PDF Generation using Puppeteer
 */
@RestController
@RequestMapping("/pdf")
public class PdfController {

    @Autowired
    private ServletContext servletContext;

    @GetMapping("/generate")
    public void generatePdf(HttpServletResponse response) throws IOException, InterruptedException {
        System.out.println("PDF Controller: generatePdf() called");
        System.out.println("Current working directory: " + System.getProperty("user.dir"));
        System.out.flush();

        // Get the real path of the web application
        String appPath = servletContext.getRealPath("/");
        System.out.println("Web application path: " + appPath);

        // Path to the puppeteer script - resolve from project root, not web app root
        String scriptPath = "puppeteer-pdf/generate-pdf.js";
        String pdfPath = "puppeteer-pdf/hello-world.pdf";

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
                        System.out.println("Found via appPath navigation at level " + i);
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
                System.out.println("Found via user.dir");
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
                            System.out.println("Found via pom.xml at level " + i);
                            break;
                        }
                    }
                }
            }
        }

        System.out.println("Project root: " + (projectRoot != null ? projectRoot.getAbsolutePath() : "null"));
        System.out.println("Script path: " + (scriptFile != null ? scriptFile.getAbsolutePath() : "null"));
        System.out.println("Script exists: " + (scriptFile != null && scriptFile.exists()));
        if (scriptFile != null && scriptFile.getParentFile() != null) {
            System.out.println("Script parent dir: " + scriptFile.getParentFile().getAbsolutePath());
            System.out.println("Script parent dir exists: " + scriptFile.getParentFile().exists());
        }
        System.out.flush();

        // Validate paths before executing
        if (!scriptFile.exists()) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Error: Script file not found at: " + scriptFile.getAbsolutePath() +
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
            ProcessBuilder pb = new ProcessBuilder("node", scriptFile.getAbsolutePath());
            pb.directory(workingDir);
            Process process = pb.start();

            // Wait for process to complete
            int exitCode = process.waitFor();
            System.out.println("Process exit code: " + exitCode);
            System.out.println("PDF file exists: " + pdfFile.exists());
            System.out.flush();

            if (exitCode == 0 && pdfFile.exists()) {
                // Send the generated PDF to the browser
                response.setContentType("application/pdf");
                response.setHeader("Content-Disposition", "attachment; filename=hello-world.pdf");

                try (FileInputStream fis = new FileInputStream(pdfFile);
                     OutputStream os = response.getOutputStream()) {
                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    while ((bytesRead = fis.read(buffer)) != -1) {
                        os.write(buffer, 0, bytesRead);
                    }
                }
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Error generating PDF. Exit code: " + exitCode +
                                          ". Script found: " + scriptFile.exists() +
                                          ". PDF exists: " + pdfFile.exists());
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
        }
    }

    @GetMapping("/download")
    public void downloadExistingPdf(HttpServletResponse response) throws IOException {
        System.out.println("PDF Controller: downloadExistingPdf() called");
        System.out.println("Current working directory: " + System.getProperty("user.dir"));
        System.out.flush();

        // Download the pre-generated PDF
        String pdfPath = "puppeteer-pdf/hello-world.pdf";

        // Get the real path of the web application
        String appPath = servletContext.getRealPath("/");
        System.out.println("Web application path: " + appPath);

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
                        System.out.println("Found PDF via appPath navigation at level " + i);
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
                System.out.println("Found PDF via user.dir");
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
                            System.out.println("Found PDF via pom.xml at level " + i);
                            break;
                        }
                    }
                }
            }
        }

        System.out.println("Project root: " + (projectRoot != null ? projectRoot.getAbsolutePath() : "null"));
        System.out.println("Looking for PDF at: " + (pdfFile != null ? pdfFile.getAbsolutePath() : "null"));
        System.out.println("PDF exists: " + (pdfFile != null && pdfFile.exists()));
        System.out.flush();

        if (pdfFile.exists()) {
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=hello-world.pdf");

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
            response.getWriter().write("PDF file not found at: " + pdfFile.getAbsolutePath() +
                                      ". Please generate it first.");
        }
    }
}

