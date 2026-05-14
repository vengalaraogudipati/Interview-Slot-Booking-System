package com.sbapp04.InterviewSlotBooking.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    // MANY BOOKINGS → ONE USER
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"password"})
    private User user;

    
    // MANY BOOKINGS → ONE SLOT
    @ManyToOne
    @JoinColumn(name = "slot_id", nullable = false)
    @JsonIgnoreProperties({"bookings"})
    private Slot slot;

    // BOOKING STATUS
    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.PENDING;

    
    // BOOKED TIME
    private LocalDateTime bookedAt = LocalDateTime.now();
}