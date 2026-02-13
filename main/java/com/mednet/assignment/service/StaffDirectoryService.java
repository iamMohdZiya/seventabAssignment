package com.mednet.assignment.service;

import com.mednet.assignment.dao.StaffDirectoryDAO;
import com.mednet.assignment.model.StaffDirectory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service layer for Staff Directory (Tab 3)
 */
@Service("staffDirectoryService")
@Transactional
public class StaffDirectoryService {

    @Autowired
    private StaffDirectoryDAO staffDirectoryDAO;

    /**
     * Get paginated and filtered staff list
     */
    public List<StaffDirectory> getStaffList(int start, int limit, String name, String staffCode, String userType) {
        return staffDirectoryDAO.getStaffList(start, limit, name, staffCode, userType);
    }

    /**
     * Get total count of staff matching filter criteria
     */
    public long getStaffCount(String name, String staffCode, String userType) {
        return staffDirectoryDAO.getStaffCount(name, staffCode, userType);
    }
}

