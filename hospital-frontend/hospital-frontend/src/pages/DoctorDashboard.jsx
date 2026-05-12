import { useEffect, useState } from "react";
import { getDoctorAppointments } from "../services/appointmentService";

const DoctorDashboard = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const fetchAppointments = async () => {

      try {

        const data = await getDoctorAppointments();

        setAppointments(data.appointments);

      } catch (error) {

        console.log(error);

      }

    };

    fetchAppointments();

  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Doctor Dashboard
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
                Email: {appointment.patientId?.userId?.email}
              </p>

              <p>
                Date: {appointment.date}
              </p>

              <p>
                Time: {appointment.time}
              </p>

              <p>
                Status: {appointment.status}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default DoctorDashboard;