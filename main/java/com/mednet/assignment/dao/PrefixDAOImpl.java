package com.mednet.assignment.dao;

import com.mednet.assignment.model.Prefix;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
@Transactional
public class PrefixDAOImpl implements PrefixDAO {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public void savePrefix(Prefix prefix) {
        sessionFactory.getCurrentSession().saveOrUpdate(prefix);
    }

    @Override
    public List<Prefix> getAllPrefixes() {
        List<Prefix> prefixes = sessionFactory.getCurrentSession()
                .createQuery("from Prefix", Prefix.class).list();
        return prefixes;
    }

    @Override
    public void deletePrefix(Long id) {
        Session session = sessionFactory.getCurrentSession();
        Prefix prefix = session.get(Prefix.class, id);
        if (null != prefix) {
            session.delete(prefix);
        }
    }
}