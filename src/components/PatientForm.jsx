import React, { useState, useEffect } from "react";
import { usePGlite } from "@electric-sql/pglite-react";
import { toast, ToastContainer } from "react-toastify";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    symptoms: "",
  });

  const db = usePGlite();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db) return alert("Database not ready yet.");

    const { name, email, age, symptoms } = formData;

    await db.exec(`
      INSERT INTO patients(name, email, age, symptoms) 
      VALUES ('${name}', '${email}', ${age}, '${symptoms}')
    `);
    toast.success("Patient registered successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
    setFormData({ name: "", email: "", age: "", symptoms: "" }); //Reset form
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className=" flex items-center justify-center mt-1">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col bg-white gap-4 p-6 rounded-xl shadow-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center ">
          Patient Registration
        </h2>
        <label className="mb-1 text-sm font-medium text-gray-700">
          Full Name
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none  focus:bg-[#f4f2fa] focus:ring-2 focus:ring-primary"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="user@example.com"
            className=" w-full p-3 border rounded-lg mb-4 focus:outline-none focus:bg-[#f4f2fa] focus:ring-2 focus:ring-primary"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            min={0}
            max={100}
            placeholder="Enter your age"
            className=" w-full p-3 border rounded-lg mb-4 focus:outline-none  focus:bg-[#f4f2fa] focus:ring-2 focus:ring-primary"
            required
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Symptoms
          </label>
          <textarea
            value={formData.symptoms}
            name="symptoms"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg mb-4 text-sm focus:bg-[#f4f2fa] focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="bg-primary w-full p-3 text-white rounded-lg hover:bg-[#a98fef]"
          disabled={!db}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
