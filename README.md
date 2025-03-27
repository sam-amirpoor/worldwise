# 🌍 WorldWise - Travel Tracking App

**WorldWise** is a React-based travel application that allows users to mark visited cities on an interactive map and add notes about their trips. Built as part of Jonas Schmedtmann's **React - The Complete Guide** course.

<div align="center">
  <img src="./preview.gif" />
</div>

## 🚀 Features

✔️ Interactive Map (Leaflet.js)  
✔️ City Tracking - Add/Delete destinations  
✔️ User (Fake) Authentication     
✔️ State Management with Context API  
✔️ Responsive UI with CSS Modules

## 🛠 Tech Stack

- **Frontend**: React 18, React Router 6
- **Mapping**: Leaflet.js + React-Leaflet
- **DataBase**: Json-Server
- **Styling**: CSS Modules
- **Build**: Vite

## 📦 Installation And Run

1. Clone repo:

```bash
git clone https://github.com/sam-amirpoor/worldwise.git
cd worldwise
```

<br />

2. Install dependencies:

```bash
npm install
```

<br />

3. Run json-server

```bash
npm run server
```

<br />

4. Run application

```bash
npm run dev
```

<br />

5. Open user browser and enter `http://localhost:5173`

<br />

## 🔧 Customization

Edit `src/data/cities.json` to modify initial data:

```json
{
  "cities": []
}
```

<br />

## 📂 Project Structure

```
📦src
 ┣ 📂components
 ┣ 📂contexts
 ┣ 📂data
 ┣ 📂hooks
 ┣ 📂pages
 ┣ 📜index.css
 ┗ 📜main.jsx
```

---

<em>
Note:

`If geolocation not works, turn on your VPN`
</em>
