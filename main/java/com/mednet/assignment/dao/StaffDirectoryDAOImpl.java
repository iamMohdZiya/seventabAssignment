package com.mednet.assignment.dao;

import com.mednet.assignment.model.StaffDirectory;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class StaffDirectoryDAOImpl implements StaffDirectoryDAO {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<StaffDirectory> getStaffList(int start, int limit, String name, String staffCode, String userType) {
        Session session = sessionFactory.getCurrentSession();

        // Build dynamic HQL query
        StringBuilder hql = new StringBuilder("FROM StaffDirectory WHERE 1=1");

        if (name != null && !name.trim().isEmpty()) {
            hql.append(" AND LOWER(name) LIKE :name");
        }
        if (staffCode != null && !staffCode.trim().isEmpty()) {
            hql.append(" AND LOWER(staffCode) LIKE :staffCode");
        }
        if (userType != null && !userType.trim().isEmpty()) {
            hql.append(" AND userType = :userType");
        }

        hql.append(" ORDER BY id ASC");

        Query<StaffDirectory> query = session.createQuery(hql.toString(), StaffDirectory.class);

        // Set parameters
        if (name != null && !name.trim().isEmpty()) {
            query.setParameter("name", "%" + name.toLowerCase() + "%");
        }
        if (staffCode != null && !staffCode.trim().isEmpty()) {
            query.setParameter("staffCode", "%" + staffCode.toLowerCase() + "%");
        }
        if (userType != null && !userType.trim().isEmpty()) {
            query.setParameter("userType", userType);
        }

        // Set pagination
        query.setFirstResult(start);
        query.setMaxResults(limit);

        return query.list();
    }

    @Override
    public long getStaffCount(String name, String staffCode, String userType) {
        Session session = sessionFactory.getCurrentSession();

        // Build dynamic HQL count query
        StringBuilder hql = new StringBuilder("SELECT COUNT(*) FROM StaffDirectory WHERE 1=1");

        if (name != null && !name.trim().isEmpty()) {
            hql.append(" AND LOWER(name) LIKE :name");
        }
        if (staffCode != null && !staffCode.trim().isEmpty()) {
            hql.append(" AND LOWER(staffCode) LIKE :staffCode");
        }
        if (userType != null && !userType.trim().isEmpty()) {
            hql.append(" AND userType = :userType");
        }

        Query<Long> query = session.createQuery(hql.toString(), Long.class);

        // Set parameters
        if (name != null && !name.trim().isEmpty()) {
            query.setParameter("name", "%" + name.toLowerCase() + "%");
        }
        if (staffCode != null && !staffCode.trim().isEmpty()) {
            query.setParameter("staffCode", "%" + staffCode.toLowerCase() + "%");
        }
        if (userType != null && !userType.trim().isEmpty()) {
            query.setParameter("userType", userType);
        }

        return query.uniqueResult();
    }
}

