import { useEffect, useState } from "react";
import {
  getAllAppointments,
  updateAppointmentStatus,
} from "../services/appointmentService";

const AdminDashboard = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const fetchAppointments = async () => {

      try {

        const data = await getAllAppointments();

        console.log(data);

        setAppointments(data.appointments);

      } catch (error) {

        console.log(error);

      }

    };

    fetchAppointments();

  }, []);

  const handleStatusUpdate = async (id, status) => {

    try {

      await updateAppointmentStatus(id, status);

      const updatedAppointments = appointments.map((appointment) => {

        if (appointment._id === id) {

          return {
            ...appointment,
            status,
          };

        }

        return appointment;

      });

      setAppointments(updatedAppointments);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        All Appointments
      </h1>

      {appointments.length === 0 ? (

        <p>No appointments found</p>

      ) : (

        <div className="space-y-4">

          {appointments.map((appointment) => (

            <div
              key={appointment._id}
              className="bg-white shadow p-4 rounded"
            >

              <h2 className="text-xl font-semibold">
                Patient: {appointment.patientId?.userId?.name}
              </h2>

              <p>
                Doctor: {appointment.doctorId?.userId?.name}
              </p>

              <p>
                Date: {appointment.date}
              </p>

              <p>
                Time: {appointment.time}
              </p>

              <p>
                Specialization: {appointment.doctorId?.specialization}
              </p>

              <p className="mt-2">
                Status:{" "}
                <span className="font-semibold">
                  {appointment.status}
                </span>
              </p>

              <div className="flex gap-2 mt-4">

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      appointment._id,
                      "approved"
                    )
                  }
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      appointment._id,
                      "completed"
                    )
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Complete
                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      appointment._id,
                      "cancelled"
                    )
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default AdminDashboard;