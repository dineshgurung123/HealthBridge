import { useEffect, useState } from "react";
import {
  getAllAppointments,
  updateAppointmentStatus,
} from "../services/appointmentService";

import { createDoctor } from "../services/doctorService";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  // doctor form state
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAllAppointments();
        setAppointments(data.appointments || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, []);

  // handle appointment status
  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);

      const updated = appointments.map((app) =>
        app._id === id ? { ...app, status } : app
      );

      setAppointments(updated);
    } catch (error) {
      console.log(error);
    }
  };

  // doctor form change
  const handleChange = (e) => {
    setDoctorForm({
      ...doctorForm,
      [e.target.name]: e.target.value,
    });
  };

  // create doctor
  const handleCreateDoctor = async (e) => {
    e.preventDefault();

    try {
      await createDoctor(doctorForm);
      alert("Doctor created successfully!");

      setDoctorForm({
        name: "",
        email: "",
        password: "",
        specialization: "",
        experience: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to create doctor");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* ================= HEADER ================= */}
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Admin Dashboard
      </h1>

      {/* ================= CREATE DOCTOR ================= */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Create Doctor
        </h2>

        <form
          onSubmit={handleCreateDoctor}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            value={doctorForm.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded"
          />

          <input
            name="email"
            value={doctorForm.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
          />

          <input
            name="password"
            type="password"
            value={doctorForm.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 rounded"
          />

          <input
            name="specialization"
            value={doctorForm.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="border p-2 rounded"
          />

          <input
            name="experience"
            value={doctorForm.experience}
            onChange={handleChange}
            placeholder="Experience"
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded col-span-1 md:col-span-2 hover:bg-green-700"
          >
            Create Doctor
          </button>
        </form>
      </div>

      {/* ================= APPOINTMENTS ================= */}
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        All Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found</p>
      ) : (
        <div className="grid gap-4">

          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white shadow-md rounded-xl p-5"
            >

              <h2 className="text-xl font-semibold">
                Patient: {appointment.patientId?.userId?.name}
              </h2>

              <p>
                Doctor: {appointment.doctorId?.userId?.name}
              </p>

              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>

              <p>
                Specialization:{" "}
                {appointment.doctorId?.specialization}
              </p>

              <p className="mt-2">
                Status:{" "}
                <span className="font-bold text-blue-600">
                  {appointment.status}
                </span>
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-2 mt-4">

                <button
                  onClick={() =>
                    handleStatusUpdate(appointment._id, "approved")
                  }
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate(appointment._id, "completed")
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Complete
                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate(appointment._id, "cancelled")
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
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