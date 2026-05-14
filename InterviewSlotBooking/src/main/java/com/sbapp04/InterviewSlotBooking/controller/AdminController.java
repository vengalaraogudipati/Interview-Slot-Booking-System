package com.sbapp04.InterviewSlotBooking.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sbapp04.InterviewSlotBooking.entity.Booking;
import com.sbapp04.InterviewSlotBooking.entity.BookingStatus;
import com.sbapp04.InterviewSlotBooking.entity.Slot;
import com.sbapp04.InterviewSlotBooking.service.BookingService;
import com.sbapp04.InterviewSlotBooking.service.SlotService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private SlotService slotService;

    
    // 1. ADMIN DASHBOARD ANALYTICS
    @GetMapping("/dashboard")
    public Map<String, Long> dashboard() {

        long totalSlots = slotService.countSlots();

        long availableSlots =
                slotService.countAvailableSlots();

        long bookedSlots =
                totalSlots - availableSlots;

        long totalBookings =
                bookingService.getAllBookings().size();

        long approvedBookings =
                bookingService.countApprovedBookings();

        long rejectedBookings =
                bookingService.countRejectedBookings();

        long pendingBookings =
                bookingService.countPendingBookings();

        return Map.of(
                "totalSlots", totalSlots,
                "availableSlots", availableSlots,
                "bookedSlots", bookedSlots,
                "totalBookings", totalBookings,
                "approvedBookings", approvedBookings,
                "rejectedBookings", rejectedBookings,
                "pendingBookings", pendingBookings
        );
    }

    
    // 2. GET ALL BOOKINGS
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {

        return bookingService.getAllBookings();
    }

    
    // 3. APPROVE BOOKING
    @PutMapping("/approve/{id}")
    public Map<String, String> approveBooking(
            @PathVariable Long id) {

        bookingService.updateStatus(
                id,
                BookingStatus.APPROVED
        );

        return Map.of(
                "message",
                "Booking Approved Successfully"
        );
    }

   
    // 4. REJECT BOOKING
    @PutMapping("/reject/{id}")
    public Map<String, String> rejectBooking(
            @PathVariable Long id) {

        bookingService.updateStatus(
                id,
                BookingStatus.REJECTED
        );

        return Map.of(
                "message",
                "Booking Rejected Successfully"
        );
    }

   
    // 5. ADD NEW SLOT
    
    @PostMapping("/slots")
    public Slot addSlot(@RequestBody Slot slot) {

        return slotService.saveSlot(slot);
    }

    
    // 6. GET ALL SLOTS
    
    @GetMapping("/slots")
    public List<Slot> getAllSlots() {

        return slotService.getAllSlots();
    }

    
    // 7. GET AVAILABLE SLOTS
    
    @GetMapping("/available-slots")
    public List<Slot> getAvailableSlots() {

        return slotService.getAvailableSlots();
    }

    
    // 8. ANALYTICS
    
    @GetMapping("/analytics")
    public Map<String, Long> analytics() {

        long totalSlots = slotService.countSlots();

        long availableSlots =
                slotService.countAvailableSlots();

        long bookedSlots =
                totalSlots - availableSlots;

        return Map.of(
                "availableSlots", availableSlots,
                "bookedSlots", bookedSlots
        );
    }
}