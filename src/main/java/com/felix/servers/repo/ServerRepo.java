package com.felix.servers.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.felix.servers.model.Server;

public interface ServerRepo extends JpaRepository <Server, Long> {
    Server findByIpAddress(String ipAddress);
    
}
