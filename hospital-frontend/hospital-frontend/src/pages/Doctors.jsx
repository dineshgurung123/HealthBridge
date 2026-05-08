import { useEffect, useState } from "react";
import { getDoctors } from "../services/doctorService";

const Doctors = () => {

  const [doctors, setDoctors] = useState([]);

  // fetch doctors when page loads
  useEffect(() => {

    const fetchDoctors = async () => {
      try {

        const data = await getDoctors();

        console.log(data);

        setDoctors(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctors();

  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Doctors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {doctors.map((doctor) => (

          <div
            key={doctor._id}
            className="border p-4 rounded shadow bg-white"
          >

            <h2 className="text-xl font-semibold">
              {doctor.userId?.name}
            </h2>

            <p>
              {doctor.specialization}
            </p>

            <p>
              Experience: {doctor.experience} years
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Doctors;