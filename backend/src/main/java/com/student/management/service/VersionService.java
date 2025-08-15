package com.student.management.service;

import com.student.management.dto.VersionInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class VersionService {

    @Value("${app.version:2.0.1}")
    private String appVersion;

    @Value("${spring-boot.version:3.2.0}")
    private String springBootVersion;

    public VersionInfo getVersionInfo() {
        String buildDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String javaVersion = System.getProperty("java.version");
        
        return new VersionInfo(
            appVersion,
            buildDate,
            javaVersion,
            springBootVersion
        );
    }

    public String getAppVersion() {
        return appVersion;
    }

    public String getSpringBootVersion() {
        return springBootVersion;
    }
}
