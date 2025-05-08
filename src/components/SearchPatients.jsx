import React, { useEffect, useState } from "react";
import { usePGlite, useLiveQuery } from "@electric-sql/pglite-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchPatients = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const db = usePGlite();

  // Restore last query from localStorage on mount
  useEffect(() => {
    const savedQuery = localStorage.getItem("lastQuery");
    if (savedQuery) {
      setQuery(savedQuery);
      runQuery(savedQuery);
    }
  }, []);

  // Run query and update state
  const runQuery = async (queryToRun) => {
    let response;
    try {
      const response = await db.query(queryToRun);
      setResults(response);
      localStorage.setItem("lastQuery", queryToRun); // Save query
    } catch (error) {
      toast.error(`Query error: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
      });
    }
    console.log(response);
  };

  const queryHandler = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    // ALLOWING ONLY SELECT QUERIES
    if (!query.trim().toUpperCase().startsWith("SELECT")) {
      toast.error("Only SELECT queries are allowed.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    runQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-black">
      <ToastContainer />

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
          value={query}
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
                <tr key={colIndex}>
                  {results.fields?.map((field, index) => (
                    <td
                      key={index}
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
        results != undefined &&
        results.rows?.length === 0 && <p>No Results Found! :{`(`}</p>
      )}
    </div>
  );
};

export default SearchPatients;
