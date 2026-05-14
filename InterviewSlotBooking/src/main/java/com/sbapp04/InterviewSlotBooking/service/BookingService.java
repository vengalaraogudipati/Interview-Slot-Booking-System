package com.sbapp04.InterviewSlotBooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sbapp04.InterviewSlotBooking.entity.AuditLog;
import com.sbapp04.InterviewSlotBooking.entity.Booking;
import com.sbapp04.InterviewSlotBooking.entity.BookingStatus;
import com.sbapp04.InterviewSlotBooking.entity.Slot;
import com.sbapp04.InterviewSlotBooking.entity.User;
import com.sbapp04.InterviewSlotBooking.repository.AuditLogRepository;
import com.sbapp04.InterviewSlotBooking.repository.BookingRepository;
import com.sbapp04.InterviewSlotBooking.repository.SlotRepository;

@Service
public class BookingService {

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Transactional
    public void bookSlot(User user, Long slotId) {

        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() ->
                        new RuntimeException("Slot not found")
                );

        boolean alreadyBooked =
                bookingRepository.existsByUserAndSlot(user, slot);

        if (alreadyBooked) {
            throw new RuntimeException("You already booked this slot");
        }

        if (!slot.isAvailable()) {
            throw new RuntimeException("Slot already booked");
        }

        slot.setAvailable(false);
        slotRepository.save(slot);

        Booking booking = new Booking();

        booking.setUser(user);
        booking.setSlot(slot);
        booking.setStatus(BookingStatus.PENDING);

        Booking savedBooking = bookingRepository.save(booking);

        String bookingMessage =
                "Hello " + user.getName() + ",\n\n"
                + "Your interview slot booking is pending admin approval.\n\n"
                + "Booking Details:\n"
                + "Booking ID: " + savedBooking.getId() + "\n"
                + "Date: " + slot.getDate() + "\n"
                + "Time: " + slot.getTime() + "\n"
                + "Status: " + savedBooking.getStatus() + "\n\n"
                + "Thank you.";

        emailService.sendMail(
                user.getEmail(),
                "Interview Slot Booked",
                bookingMessage
        );

        AuditLog log = new AuditLog();

        log.setAction("BOOKED");
        log.setPerformedBy(user.getEmail());

        auditLogRepository.save(log);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking updateStatus(Long id, BookingStatus status) {

        Booking booking =
                bookingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found")
                );

        booking.setStatus(status);

        Booking updatedBooking =
                bookingRepository.save(booking);

        String subject = "";
        String message = "";

        if (status == BookingStatus.APPROVED) {

            subject = "Interview Slot Approved";

            message =
                    "Hello " + booking.getUser().getName() + ",\n\n"
                    + "Your interview slot has been APPROVED.\n\n"
                    + "Booking Details:\n"
                    + "Booking ID: " + booking.getId() + "\n"
                    + "Date: " + booking.getSlot().getDate() + "\n"
                    + "Time: " + booking.getSlot().getTime() + "\n"
                    + "Status: " + status + "\n\n"
                    + "Prepare well & All the best for your interview  \n"
                    + "Thank you.";

        } else if (status == BookingStatus.REJECTED) {

            subject = "Interview Slot Rejected";

            message =
                    "Hello " + booking.getUser().getName() + ",\n\n"
                    + "Your interview slot has been REJECTED.\n\n"
                    + "Booking Details:\n"
                    + "Booking ID: " + booking.getId() + "\n"
                    + "Date: " + booking.getSlot().getDate() + "\n"
                    + "Time: " + booking.getSlot().getTime() + "\n"
                    + "Status: " + status + "\n\n"
                    + "Please book another available slot.\n\n"
                    + "Thank you.";
        }

        if (!subject.isEmpty()) {
            emailService.sendMail(
                    booking.getUser().getEmail(),
                    subject,
                    message
            );
        }

        AuditLog log = new AuditLog();

        log.setAction(status.name());
        log.setPerformedBy("ADMIN");

        auditLogRepository.save(log);

        return updatedBooking;
    }

    public List<Booking> getUserBookings(User user) {
        return bookingRepository.findByUser(user);
    }

    public long countApprovedBookings() {
        return bookingRepository.countByStatus(
                BookingStatus.APPROVED
        );
    }

    public long countRejectedBookings() {
        return bookingRepository.countByStatus(
                BookingStatus.REJECTED
        );
    }

    public long countPendingBookings() {
        return bookingRepository.countByStatus(
                BookingStatus.PENDING
        );
    }
}