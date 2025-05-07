import React, { useEffect, useState } from "react";
import { PGlite } from "@electric-sql/pglite";
import { useLiveQuery } from "@electric-sql/pglite-react";

const SearchPatients = () => {
  const patients = useLiveQuery("SELECT * FROM patients", []);
  console.log(patients);

  return (
    <div className="min-h-screen flex items-center justify-center text-black">
      Search patient component goes here
    </div>
  );
};

export default SearchPatients;
