package com.mednet.assignment.service;

import com.mednet.assignment.dao.StaffDirectoryDAO;
import com.mednet.assignment.model.StaffDirectory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("staffDirectoryService")
@Transactional
public class StaffDirectoryService {

    @Autowired
    private StaffDirectoryDAO staffDirectoryDAO;

    public List<StaffDirectory> getStaffList(int start, int limit, String name, String staffCode, String userType) {
        return staffDirectoryDAO.getStaffList(start, limit, name, staffCode, userType);
    }

    public long getStaffCount(String name, String staffCode, String userType) {
        return staffDirectoryDAO.getStaffCount(name, staffCode, userType);
    }

    /**
     * Transforms a list of StaffDirectory objects into a list of Maps suitable for JSON response.
     * Handles date formatting and null checks internally.
     */
    public List<Map<String, Object>> getStaffDataForUi(int start, int limit, String name, String staffCode, String userType) {
        List<StaffDirectory> staffList = this.getStaffList(start, limit, name, staffCode, userType);
        List<Map<String, Object>> data = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

        for (StaffDirectory staff : staffList) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", staff.getId()); // Added ID for reference
            item.put("name", staff.getName());
            item.put("staffCode", staff.getStaffCode());
            item.put("userType", staff.getUserType());
            item.put("phone", staff.getPhone());

            // Handle Department logic
            item.put("dept", staff.getDept());

            // Handle Status
            item.put("status", staff.getStatus());

            // Handle Date Formatting
            if (staff.getJoiningDate() != null) {
                item.put("joiningDate", dateFormat.format(staff.getJoiningDate()));
            } else {
                item.put("joiningDate", "-");
            }

            data.add(item);
        }
        return data;
    }
}