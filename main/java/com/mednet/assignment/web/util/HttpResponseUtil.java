package com.mednet.assignment.web.util;

import javax.servlet.http.HttpServletResponse;
import java.io.*;

public class HttpResponseUtil {

    public static void streamFileToResponse(HttpServletResponse response, File file, String contentType, String fileName) throws IOException {
        response.setContentType(contentType);
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);

        try (FileInputStream fis = new FileInputStream(file);
             OutputStream os = response.getOutputStream()) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
        }
    }

    public static void sendJsonErrorResponse(HttpServletResponse response, int statusCode, String message) {
        try {
            response.setStatus(statusCode);
            response.setContentType("application/json");
            String escapedMessage = message.replace("\"", "\\\"").replace("\n", "\\n");
            response.getWriter().write("{\"error\":\"" + escapedMessage + "\"}");
        } catch (IOException e) {
            System.err.println("Error writing error response: " + e.getMessage());
        }
    }

    public static void sendJsonSuccessResponse(HttpServletResponse response, String message) {
        try {
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            String escapedMessage = message.replace("\"", "\\\"").replace("\n", "\\n");
            response.getWriter().write("{\"message\":\"" + escapedMessage + "\"}");
        } catch (IOException e) {
            System.err.println("Error writing success response: " + e.getMessage());
        }
    }
}

