# 🧭 Smart Campus Navigation System – Army Institute of Technology, Pune

A full-stack web application that helps students, faculty, and visitors navigate the AIT campus with ease. Built with **React.js**, **Node.js**, **MongoDB**, and the **Google Maps API**, this system provides real-time directions across 50+ campus locations.

🚀 **Live route directions** • 📍 **Interactive map** • 🔍 **Searchable locations**

---

## 📌 Features

- 🔎 **Autocomplete search** for both "From" and "To" fields using a custom list of campus locations.
- 🗺️ **Google Map integration** for live rendering and route display.
- 📍 **Markers** for key campus locations: departments, grounds, library, hostels, etc.
- ➡️ **Route generation** with walking mode using Google Maps Directions API.
- 📦 **RESTful API** for fetching and managing location data stored in MongoDB.

---

## 🧑‍💻 Tech Stack

| Layer      | Technology            | Description                        |
|------------|------------------------|------------------------------------|
| Frontend   | **React.js**           | User interface and map interaction |
| Maps API   | **Google Maps API**    | Maps, markers, and directions      |
| Backend    | **Node.js + Express.js** | API to serve campus data          |
| Database   | **MongoDB + Mongoose** | Stores campus coordinates & names |

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm
- MongoDB running locally or in the cloud
- Google Maps API Key with Maps and Directions APIs enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ait-campus-navigation.git
cd ait-campus-navigation

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

 
 
