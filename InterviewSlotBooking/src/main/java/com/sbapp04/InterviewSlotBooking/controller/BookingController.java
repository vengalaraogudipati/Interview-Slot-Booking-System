package com.sbapp04.InterviewSlotBooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sbapp04.InterviewSlotBooking.entity.Booking;
import com.sbapp04.InterviewSlotBooking.entity.BookingStatus;
import com.sbapp04.InterviewSlotBooking.entity.Slot;
import com.sbapp04.InterviewSlotBooking.entity.User;
import com.sbapp04.InterviewSlotBooking.repository.SlotRepository;
import com.sbapp04.InterviewSlotBooking.service.BookingService;
import com.sbapp04.InterviewSlotBooking.service.UserService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    // GET AVAILABLE SLOTS
    @GetMapping("/slots")
    public ResponseEntity<List<Slot>> getAvailableSlots() {
        return ResponseEntity.ok(slotRepository.findByAvailableTrue());
    }

    // BOOK SLOT
    @PostMapping("/{slotId}/{userId}")
    public ResponseEntity<String> bookSlot(
            @PathVariable Long slotId,
            @PathVariable Long userId
    ) {
        User user = userService.findById(userId);

        bookingService.bookSlot(user, slotId);

        return ResponseEntity.ok("Booking Successful! Waiting for HR approval.");
    }

    // MY BOOKINGS
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> myBookings(
            @PathVariable Long userId
    ) {
        User user = userService.findById(userId);

        return ResponseEntity.ok(
                bookingService.getUserBookings(user)
        );
    }

    // ADMIN: ALL BOOKINGS
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(
                bookingService.getAllBookings()
        );
    }
 // APPROVE BOOKING
    @PutMapping("/{id}/approve")
    public ResponseEntity<Booking> approveBooking(
            @PathVariable Long id
    ) {

        Booking booking =
                bookingService.updateStatus(
                        id,
                        BookingStatus.APPROVED
                );

        return ResponseEntity.ok(booking);
    }

    // REJECT BOOKING
    @PutMapping("/{id}/reject")
    public ResponseEntity<Booking> rejectBooking(
            @PathVariable Long id
    ) {

        Booking booking =
                bookingService.updateStatus(
                        id,
                        BookingStatus.REJECTED
                );

        return ResponseEntity.ok(booking);
    }
}