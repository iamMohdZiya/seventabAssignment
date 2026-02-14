package com.mednet.assignment.service;

import com.mednet.assignment.model.Prefix;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service("pdfService")
@Transactional
public class PdfService {

    @Autowired
    private PrefixService prefixService;

    private static final String SCRIPT_PATH = "puppeteer-pdf/generate-pdf.js";
    private static final String PDF_PATH = "puppeteer-pdf/prefix-master.pdf";
    private static final String TEMP_DATA_FILE = "prefix-data-temp.json";
    private static final long PROCESS_WAIT_TIME = 500;

    public File findProjectRoot(String appPath) {
        if (appPath != null) {
            File appDir = new File(appPath);
            File current = appDir;
            for (int i = 0; i < 5 && current != null; i++) {
                current = current.getParentFile();
                if (current != null) {
                    File testScript = new File(current, SCRIPT_PATH);
                    if (testScript.exists()) {
                        return current;
                    }
                }
            }
        }

        File projectRoot = new File(System.getProperty("user.dir"));
        File testScript = new File(projectRoot, SCRIPT_PATH);
        if (testScript.exists()) {
            return projectRoot;
        }

        if (appPath != null) {
            File current = new File(appPath);
            for (int i = 0; i < 5 && current != null; i++) {
                current = current.getParentFile();
                if (current != null && new File(current, "pom.xml").exists()) {
                    File pomScript = new File(current, SCRIPT_PATH);
                    if (pomScript.exists()) {
                        return current;
                    }
                }
            }
        }

        return null;
    }

    public String generatePdfWithPrefixData(File workingDir) throws IOException, InterruptedException {
        List<Prefix> prefixList = prefixService.getAllPrefixes();
        ObjectMapper mapper = new ObjectMapper();
        String prefixDataJson = mapper.writeValueAsString(prefixList);

        File tempDataFile = new File(workingDir, TEMP_DATA_FILE);
        Files.write(tempDataFile.toPath(), prefixDataJson.getBytes(),
            java.nio.file.StandardOpenOption.CREATE,
            java.nio.file.StandardOpenOption.WRITE,
            java.nio.file.StandardOpenOption.TRUNCATE_EXISTING);

        File scriptFile = new File(workingDir, "generate-pdf.js");

        ProcessBuilder pb = new ProcessBuilder("node", scriptFile.getAbsolutePath(), tempDataFile.getAbsolutePath());
        pb.directory(workingDir);
        pb.redirectErrorStream(true);
        Process process = pb.start();

        StringBuilder output = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
                System.out.println("[Node.js] " + line);
            }
        }

        int exitCode = process.waitFor();
        Thread.sleep(PROCESS_WAIT_TIME);

        try {
            tempDataFile.delete();
        } catch (Exception e) {
            System.out.println("Warning: Could not delete temp file: " + e.getMessage());
        }

        File pdfFile = new File(workingDir, "prefix-master.pdf");
        if (exitCode != 0 || !pdfFile.exists()) {
            throw new IOException("PDF generation failed. Exit code: " + exitCode + ". Output: " + output.toString());
        }

        String timestamp = DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss").format(LocalDateTime.now());
        String timestampedName = "prefix-master-" + timestamp + ".pdf";
        File timestampedFile = new File(workingDir, timestampedName);
        Files.copy(pdfFile.toPath(), timestampedFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

        return timestampedName;
    }

    public File getPdfFileForDownload(File projectRoot) {
        File puppeteerDir = new File(projectRoot, "puppeteer-pdf");
        File pdfFile = new File(puppeteerDir, "prefix-master.pdf");
        return pdfFile.exists() ? pdfFile : null;
    }
}
