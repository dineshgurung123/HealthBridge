import { useEffect, useState } from "react";
import { getMyAppointments } from "../services/appointmentService";

const MyAppointments = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const data = await getMyAppointments();

        setAppointments(data.appointments);

      } catch (error) {
        console.log(error);
      }

    };

    fetchData();

  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Appointments
      </h1>

      <div className="space-y-4">

        {appointments.map((app) => (

          <div
            key={app._id}
            className="border p-4 rounded shadow bg-white"
          >

            <h2 className="text-xl font-semibold">
              Doctor: {app.doctorId?.userId?.name}
            </h2>

            <p>
              Specialization: {app.doctorId?.specialization}
            </p>

            <p>
              Date: {app.date}
            </p>

            <p>
              Time: {app.time}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MyAppointments;