package com.mednet.assignment.controller;

import com.mednet.assignment.service.StaffDirectoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/staff")
@CrossOrigin(origins = "*")
public class StaffDirectoryRestController {

    @Autowired
    private StaffDirectoryService staffDirectoryService;

    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> searchStaff(
            @RequestParam(value = "start", defaultValue = "0") int start,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "staffCode", required = false) String staffCode,
            @RequestParam(value = "userType", required = false) String userType
    ) {
        Map<String, Object> response = new HashMap<>();

        try {
            // 1. Get the total count for pagination
            long totalCount = staffDirectoryService.getStaffCount(name, staffCode, userType);

            // 2. Get the pre-formatted data from the Service
            List<Map<String, Object>> data = staffDirectoryService.getStaffDataForUi(start, limit, name, staffCode, userType);

            // 3. Construct the final response
            response.put("success", true);
            response.put("totalCount", totalCount);
            response.put("data", data);

        } catch (Exception e) {
            System.err.println("Error in searchStaff(): " + e.getMessage());
            e.printStackTrace();

            response.put("success", false);
            response.put("message", "Error fetching staff data: " + e.getMessage());
            response.put("totalCount", 0);
            response.put("data", new ArrayList<>());
        }

        return response;
    }

    // Kept for backward compatibility if needed, but cleaner now
    @GetMapping(value = "/debug", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> debugStaff() {
        Map<String, Object> response = new HashMap<>();
        try {
            // Reusing the new service method even for debug to ensure consistency
            List<Map<String, Object>> data = staffDirectoryService.getStaffDataForUi(0, 5, null, null, null);

            response.put("success", true);
            response.put("data", data);
            response.put("count", data.size());
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            e.printStackTrace();
        }
        return response;
    }
}