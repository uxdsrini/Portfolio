import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { X, Calendar, Clock, User, Mail, MessageSquare } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import "react-day-picker/dist/style.css";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({
  isOpen,
  onClose,
}: AppointmentModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !time) {
      toast.error("Please select both date and time");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "appointments"), {
        name,
        email,
        date: selectedDate,
        time,
        notes,
        status: "pending",
        createdAt: new Date(),
      });
      toast.success("Appointment booked successfully!");
      onClose();
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="bg-white rounded-lg max-w-md w-full p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Book Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 ease-in-out hover:border-secondary"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 ease-in-out hover:border-secondary"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* Day Dropdown */}
              <select
                value={selectedDate?.getDate() || ""}
                onChange={(e) =>
                  setSelectedDate(
                    new Date(
                      selectedDate?.getFullYear() || new Date().getFullYear(),
                      selectedDate?.getMonth() || new Date().getMonth(),
                      parseInt(e.target.value, 10)
                    )
                  )
                }
                className="py-2 px-4 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none"
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              {/* Month Dropdown */}
              <select
                value={selectedDate?.getMonth() + 1 || ""}
                onChange={(e) =>
                  setSelectedDate(
                    new Date(
                      selectedDate?.getFullYear() || new Date().getFullYear(),
                      parseInt(e.target.value, 10) - 1,
                      selectedDate?.getDate() || 1
                    )
                  )
                }
                className="py-2 px-4 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none"
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {new Date(0, month - 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>

              {/* Year Dropdown */}
              <select
                value={selectedDate?.getFullYear() || ""}
                onChange={(e) =>
                  setSelectedDate(
                    new Date(
                      parseInt(e.target.value, 10),
                      selectedDate?.getMonth() || new Date().getMonth(),
                      selectedDate?.getDate() || 1
                    )
                  )
                }
                className="py-2 px-4 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none"
              >
                <option value="">Year</option>
                {Array.from(
                  { length: 101 },
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none transition-all duration-200 ease-in-out hover:border-secondary"
              >
                <option value="">Select a time</option>
                {Array.from({ length: 8 }, (_, i) => i + 9).map((hour) => (
                  <option
                    key={hour}
                    value={`${hour}:00`}
                  >{`${hour}:00`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent min-h-[100px] resize-none transition-all duration-200 ease-in-out hover:border-secondary"
                placeholder="Add any additional notes..."
                rows={3}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Booking...</span>
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
