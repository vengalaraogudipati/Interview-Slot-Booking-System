package com.sbapp04.InterviewSlotBooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sbapp04.InterviewSlotBooking.entity.Booking;
import com.sbapp04.InterviewSlotBooking.entity.BookingStatus;
import com.sbapp04.InterviewSlotBooking.entity.Slot;
import com.sbapp04.InterviewSlotBooking.entity.User;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    
    // FIND BOOKINGS BY STATUS
    List<Booking> findByStatus(BookingStatus status);


    // CHECK DUPLICATE BOOKING
    boolean existsByUserAndSlot(User user, Slot slot);

   
    // FIND BOOKINGS BY USER
    List<Booking> findByUser(User user);

    
    // COUNT BOOKINGS BY STATUS
    long countByStatus(BookingStatus status);
}