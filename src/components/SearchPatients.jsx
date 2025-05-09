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
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <ToastContainer />

      <form
        onSubmit={queryHandler}
        className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
      >
        <label htmlFor="textbox" className="font-semibold text-gray-700">
          Enter your SQL query for searching patients
        </label>
        <textarea
          id="textbox"
          className="w-full border border-gray-300 rounded-md p-2 font-mono min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-[#a98fef] transition"
          >
            SUBMIT
          </button>
        </div>
      </form>

      {results && results.rows?.length > 0 ? (
        <div className="mt-8 w-full max-w-4xl overflow-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                {results.fields?.map((field, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 bg-gray-100 uppercase"
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
        results.rows?.length === 0 && (
          <p className="mt-4 text-red-600 font-medium">No Results Found! :(</p>
        )
      )}
    </div>
  );
};

export default SearchPatients;
