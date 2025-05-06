import { useState } from "react";
import "./App.css";
import PatientForm from "./components/PatientForm";
import SearchPatients from "./components/SearchPatients";

function App() {
  const [selectedTab, setSelectedTab] = useState("register");

  return (
    <div className="bg-bg w-full h-screen flex flex-col items-center ">
      <div className="w-full mt-8 ">
        <nav className="flex max-w-xl mx-auto border-b-4 justify-center border-primary ">
          <ul className="flex flex-row gap-8">
            <li
              className={`text-lg cursor-pointer px-4 py-2 ${
                selectedTab === "register"
                  ? "text-bg  border-primary bg-primary rounded-t-lg"
                  : "text-gray-600 hover:text-primary"
              }`}
              onClick={() => setSelectedTab("register")}
            >
              Patient Registration
            </li>
            <li
              className={`text-lg cursor-pointer px-4 py-2 ${
                selectedTab === "search"
                  ? "text-bg  border-primary bg-primary rounded-t-lg"
                  : "text-gray-600 hover:text-primary"
              }`}
              onClick={() => setSelectedTab("search")}
            >
              Search Patients using Query
            </li>
          </ul>
        </nav>
        {selectedTab === "register" && <PatientForm />}
        {!selectedTab === "search" && <SearchPatients />}
      </div>
    </div>
  );
}

export default App;
