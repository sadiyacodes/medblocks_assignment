
# MedBlocks App

A full-stack React application using [PGlite](https://electric-sql.com/docs/usage/pglite) to manage patient records through SQL queries and form-based registration. It allows both **inserting new patients** and **executing `SELECT` queries** to retrieve data — all in a local-first, real-time synchronized environment.
## Live [Link](https://medblocks-assignment-rho.vercel.app/)
---

## 🚀 Features

- **Register New Patients** using a form interface.
- **Query Patient Records** using SQL `SELECT` statements.
- **Persist Patient Data** across page refreshes using embedded PGlite.
- **Multi-tab Support** with live updates across browser tabs via ElectricSQL.
- **Restricts Queries** to `SELECT` only (for safety).
- **Table View** of SQL query results with dynamic rendering.
- Built with **React**, **TailwindCSS**, and **React Toastify**.


---

## Tech Stack

- **React**
- **Tailwind CSS**
- **PGlite**
- **React Toastify**

---

## ⚙️ Setup & Usage

### 1. Clone the repository

```bash
git clone https://github.com/sadiyacodes/medblocks_assignment.git
cd medblocks_assignment
```
### 2. Install dependencies
```bash
npm install
```
### 3. Start the development server
```bash
npm run dev
```
### 4.  Usage 
- Open your browser at localhost port
- Use the form to register a new patient
- Type a valid SQL query (e.g., SELECT * FROM patients;) in the textarea
- Submit to view dynamic results in table format

## Challenges Faced
- **SQL Validation**: Preventing unsafe query types while giving meaningful feedback
- **Cross-tab Sync**: Leveraging PGlite to persist and reflect changes across open browser tabs as it was a new tool for me.
- **Rendering Dynamic Results**: Safely displaying fields from dynamic query results with fallback values for NULLs.
- **State Persistence**: Persisting both the SQL query and its result across browser reloads using `localStorage` and `useEffect` for data continuity.
- **Deployment Issue**: Encountered a browser support issue with PGlite during deployment. Resolved by adjusting the Vite configuration to ensure compatibility across all supported browsers.



