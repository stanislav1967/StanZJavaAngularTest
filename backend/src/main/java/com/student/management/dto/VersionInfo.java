package com.student.management.dto;

import java.time.LocalDateTime;

public class VersionInfo {
    private String version;
    private String buildDate;
    private String javaVersion;
    private String springBootVersion;
    private LocalDateTime timestamp;

    public VersionInfo() {
        this.timestamp = LocalDateTime.now();
    }

    public VersionInfo(String version, String buildDate, String javaVersion, String springBootVersion) {
        this.version = version;
        this.buildDate = buildDate;
        this.javaVersion = javaVersion;
        this.springBootVersion = springBootVersion;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getBuildDate() {
        return buildDate;
    }

    public void setBuildDate(String buildDate) {
        this.buildDate = buildDate;
    }

    public String getJavaVersion() {
        return javaVersion;
    }

    public void setJavaVersion(String javaVersion) {
        this.javaVersion = javaVersion;
    }

    public String getSpringBootVersion() {
        return springBootVersion;
    }

    public void setSpringBootVersion(String springBootVersion) {
        this.springBootVersion = springBootVersion;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
