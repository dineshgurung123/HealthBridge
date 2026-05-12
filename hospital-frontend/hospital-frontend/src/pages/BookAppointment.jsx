import { useState } from "react";
import { useParams } from "react-router-dom";
import { bookAppointment } from "../services/appointmentService";

const BookAppointment = () => {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // get doctorId from URL
  const { doctorId } = useParams();

  const handleBook = async (e) => {

    e.preventDefault();

    try {

      const data = await bookAppointment({
        doctorId,
        date,
        time,
      });
      
      console.log(data);

      alert("Appointment booked successfully!");

    } catch (error) {

      console.log(error);

      alert("Booking failed");

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleBook}
        className="bg-white p-8 rounded shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Book Appointment
        </h2>

        {/* Date */}
        <input
          type="date"
          className="w-full p-2 mb-4 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Time */}
        <input
          type="time"
          className="w-full p-2 mb-4 border rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Confirm Booking
        </button>

      </form>

    </div>
  );
};

export default BookAppointment;