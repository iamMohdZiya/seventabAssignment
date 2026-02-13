package com.mednet.assignment.dao;

import com.mednet.assignment.model.StaffDirectory;
import java.util.List;

public interface StaffDirectoryDAO {
    /**
     * Get paginated and filtered list of staff
     * @param start Starting index
     * @param limit Number of records to return
     * @param name Filter by name (LIKE search)
     * @param staffCode Filter by staff code
     * @param userType Filter by user type
     * @return List of staff matching the criteria
     */
    List<StaffDirectory> getStaffList(int start, int limit, String name, String staffCode, String userType);

    /**
     * Get total count of staff matching the filter criteria
     * @param name Filter by name (LIKE search)
     * @param staffCode Filter by staff code
     * @param userType Filter by user type
     * @return Total count of matching records
     */
    long getStaffCount(String name, String staffCode, String userType);
}

