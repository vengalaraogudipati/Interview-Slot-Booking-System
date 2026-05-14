package com.sbapp04.InterviewSlotBooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sbapp04.InterviewSlotBooking.entity.AuditLog;

public interface AuditLogRepository
        extends JpaRepository<AuditLog, Long> {
}