package com.sbapp04.InterviewSlotBooking.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sbapp04.InterviewSlotBooking.entity.Booking;
import com.sbapp04.InterviewSlotBooking.entity.Slot;
import com.sbapp04.InterviewSlotBooking.entity.User;
import com.sbapp04.InterviewSlotBooking.service.BookingService;
import com.sbapp04.InterviewSlotBooking.service.SlotService;
import com.sbapp04.InterviewSlotBooking.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private SlotService slotService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    
    // 1. GET AVAILABLE SLOTS
    @GetMapping("/slots")
    public List<Slot> getAvailableSlots() {

        return slotService.getAvailableSlots();
    }

    
    // 2. BOOK SLOT
    @PostMapping("/book/{id}")
    public String bookSlot(@PathVariable Long id,
                           Principal principal) {

        User user = userService.findByEmail(principal.getName());

        bookingService.bookSlot(user, id);

        return "Slot Booked Successfully";
    }

    // 3. GET MY BOOKINGS
    @GetMapping("/my-bookings")
    public List<Booking> myBookings(Principal principal) {

        User user = userService.findByEmail(principal.getName());

        return bookingService.getUserBookings(user);
    }

    
    // 4. GET PROFILE
    @GetMapping("/profile")
    public User profile(Principal principal) {

        return userService.findByEmail(principal.getName());
    }
}