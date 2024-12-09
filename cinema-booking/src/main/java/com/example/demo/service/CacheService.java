package com.example.demo.service;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CacheService {

    private final SessionFactory sessionFactory;

    @Autowired
    public CacheService(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void clearCache() {
        sessionFactory.getCache().evictAllRegions();
    }
}
