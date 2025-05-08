import React, { useEffect, useState } from "react";
import { PGlite } from "@electric-sql/pglite";
import { usePGlite, useLiveQuery } from "@electric-sql/pglite-react";

const SearchPatients = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const db = usePGlite();

  const queryHandler = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    // ALLOWING ONLY SELECT QUERIES
    if (!query.trim().toUpperCase().startsWith("SELECT")) {
      alert("Error: Only SELECT queries are allowed.");
      return;
    }
    const response = await db.query(query);
    setResults(response);
    console.log(response);
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-black">
      <form
        className="flex flex-row gap-2 MAX-W-MD items-center justify-center"
        onSubmit={queryHandler}
      >
        <label htmlFor="textbox">
          Enter your SQL query for searching patients
        </label>
        <textarea
          className="flex-2/3 border-2 font-thin font-mono cursor-crosshair"
          name="textbox"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></textarea>
        <button
          className="flex-1/3 font-normal bg-primary text-white"
          type="submit"
        >
          SUBMIT
        </button>
      </form>

      {/* TABLE TO SHOW RESULTS OBTAINED */}
      {results && results.rows?.length > 0 ? (
        <div className="max-w-md">
          <table className="table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                {results.fields?.map((field, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 bg-gray-100"
                  >
                    {field.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.rows.map((row, colIndex) => (
                <tr>
                  {results.fields?.map((field, index) => (
                    <td
                      key={colIndex}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {row[field.name] ?? "NULL"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        results && <p>No Results Found! :{`(`}</p>
      )}
    </div>
  );
};

export default SearchPatients;
