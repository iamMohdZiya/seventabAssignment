package com.mednet.assignment.controller;

import com.mednet.assignment.model.StaffDirectory;
import com.mednet.assignment.service.StaffDirectoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for Staff Directory (Tab 3)
 * Provides server-side pagination and filtering for ExtJS grid
 */
@RestController
@RequestMapping("/staff")
@CrossOrigin(origins = "*")
public class StaffDirectoryRestController {

    @Autowired
    private StaffDirectoryService staffDirectoryService;

    @GetMapping(value = "/debug", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> debugStaff() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<StaffDirectory> staffList = staffDirectoryService.getStaffList(0, 5, null, null, null);
            List<Map<String, Object>> data = new ArrayList<>();

            for (StaffDirectory staff : staffList) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", staff.getId());
                item.put("name", staff.getName());
                item.put("dept", staff.getDept());
                item.put("deptIsNull", staff.getDept() == null);
                data.add(item);
            }

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
            // Get total count with filters
            long totalCount = staffDirectoryService.getStaffCount(name, staffCode, userType);

            // Get paginated data with filters
            List<StaffDirectory> staffList = staffDirectoryService.getStaffList(start, limit, name, staffCode, userType);

            // Transform to JSON-friendly format
            List<Map<String, Object>> data = new ArrayList<>();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

            for (StaffDirectory staff : staffList) {
                Map<String, Object> item = new HashMap<>();
                item.put("name", staff.getName());
                item.put("staffCode", staff.getStaffCode());
                item.put("userType", staff.getUserType());
                item.put("phone", staff.getPhone());

                // Debug: Log the dept value
                String deptValue = staff.getDept();
                System.out.println("DEBUG - Staff: " + staff.getName() + ", Dept: " + deptValue);
                item.put("dept", deptValue);

                item.put("status", staff.getStatus());

                // Format joining date
                if (staff.getJoiningDate() != null) {
                    item.put("joiningDate", dateFormat.format(staff.getJoiningDate()));
                } else {
                    item.put("joiningDate", "-");
                }

                data.add(item);
            }

            response.put("success", true);
            response.put("totalCount", totalCount);
            response.put("data", data);

        } catch (Exception e) {
            System.err.println("Error in listStaff(): " + e.getMessage());
            e.printStackTrace();

            response.put("success", false);
            response.put("message", "Error fetching staff data: " + e.getMessage());
            response.put("totalCount", 0);
            response.put("data", new ArrayList<>());
        }

        return response;
    }
}

