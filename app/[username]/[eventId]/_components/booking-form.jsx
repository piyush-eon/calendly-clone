"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/actions/bookings";
import { bookingSchema } from "@/app/lib/validators";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/style.css";

export default function BookingForm({ event, availability }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  console.log(availability, isSubmitting);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      time: selectedTime || "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);

    if (!selectedDate || !selectedTime) {
      console.error("Date or time not selected");
      return;
    }

    setIsSubmitting(true);
    try {
      const startTime = new Date(
        `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
      );
      const endTime = new Date(startTime.getTime() + event.duration * 60000);

      const bookingData = {
        eventId: event.id,
        name: data.name,
        email: data.email,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        additionalInfo: data.additionalInfo,
      };

      const result = await createBooking(bookingData);

      if (result.success) {
        setBookingConfirmation({
          message: "Booking successful!",
          meetLink: result.meetLink,
        });
      } else {
        throw new Error(result.error || "Booking failed");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      setBookingConfirmation({
        message: `Booking failed: ${error.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableDays = availability.map((day) => new Date(day.date));

  const timeSlots = selectedDate
    ? availability.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];

  if (bookingConfirmation) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          {bookingConfirmation.message}
        </h2>
        {bookingConfirmation.meetLink && (
          <p>
            Join the meeting:{" "}
            <a
              href={bookingConfirmation.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {bookingConfirmation.meetLink}
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date);
            setSelectedTime(null); // Reset selected time when date changes
          }}
          disabled={[
            { before: new Date() },
            // (date) =>
            //   !availableDays.some((d) => d.getTime() === date.getTime()),
          ]}
          modifiers={{ available: availableDays }}
          modifiersStyles={{
            available: {
              background: "lightblue",
              borderRadius: 100,
            },
          }}
          components={{
            IconLeft: ({ ...props }) => (
              <ChevronLeft className="h-4 w-4" {...props} />
            ),
            IconRight: ({ ...props }) => (
              <ChevronRight className="h-4 w-4" {...props} />
            ),
          }}
        />
      </div>
      <div className="w-full md:w-1/2">
        {selectedDate && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedTime === slot ? "default" : "outline"}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        )}
        {selectedTime && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="hidden"
              {...register("date")}
              value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
            />
            <Input type="hidden" {...register("time")} value={selectedTime} />
            <div>
              <Input {...register("name")} placeholder="Your Name" />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Your Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Textarea
                {...register("additionalInfo")}
                placeholder="Additional Information"
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Scheduling..." : "Schedule Event"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
