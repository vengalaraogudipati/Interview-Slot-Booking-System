package com.sbapp04.InterviewSlotBooking.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sbapp04.InterviewSlotBooking.entity.Slot;

public interface SlotRepository extends JpaRepository<Slot, Long> {

    List<Slot> findByAvailableTrue();

    List<Slot> findByAvailableFalse();

    long countByAvailableTrue();

    List<Slot> findByDate(LocalDate date);

    boolean existsByDateAndTime(LocalDate date, LocalTime time);
}