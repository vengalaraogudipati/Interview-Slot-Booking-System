package com.sbapp04.InterviewSlotBooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sbapp04.InterviewSlotBooking.entity.Slot;
import com.sbapp04.InterviewSlotBooking.repository.SlotRepository;

@Service
public class SlotService {

    @Autowired
    private SlotRepository slotRepository;

    
    // SAVE SLOT
    
    public Slot saveSlot(Slot slot) {

        boolean exists = slotRepository.existsByDateAndTime(
                slot.getDate(),
                slot.getTime()
        );

        if (exists) {
            throw new RuntimeException("Slot already exists");
        }

        return slotRepository.save(slot);
    }

    
    // TOTAL SLOTS
    
    public long countSlots() {
        return slotRepository.count();
    }

    
    // AVAILABLE SLOTS
    
    public long countAvailableSlots() {
        return slotRepository.countByAvailableTrue();
    }

    
    // GET AVAILABLE SLOTS
    
    public List<Slot> getAvailableSlots() {
        return slotRepository.findByAvailableTrue();
    }

    
    // GET BOOKED SLOTS
    
    public List<Slot> getBookedSlots() {
        return slotRepository.findByAvailableFalse();
    }
 
 // GET ALL SLOTS
 
 public List<Slot> getAllSlots() {

     return slotRepository.findAll();
 }
 public void deleteSlot(Long id) {
	    slotRepository.deleteById(id);
	}
}