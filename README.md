# Haupcar Car Management System

ระบบจัดการข้อมูลรถยนต์ของบริษัท — Full-Stack Web Application สำหรับโจทย์ Software Developer Test ของบริษัท ฮ้อปคาร์

## Tech Stack

- **Frontend**: React.js + Vite (JavaScript)
- **Backend**: Node.js + Express
- **Database**: SQLite (better-sqlite3)
- **Version Control**: Git + GitHub

> โปรเจคนี้พัฒนาภายในเวลา 2-3 วัน โดยผมมี ประสบการณ์ทำแอพ Flutter มาก่อน
> จึงใช้โจทย์นี้เป็นโอกาสเรียน React + Node.js ตั้งแต่ต้น พยายาม commit เป็นขั้นๆ
> เพื่อให้เห็น learning path ชัดเจน

## Features

### Core CRUD (4/4)
- ✅ **เพิ่มรถ** — Form กรอกข้อมูล (ทะเบียน, ยี่ห้อ, รุ่น, หมายเหตุ)
- ✅ **ดูรถทั้งหมด** — ตารางแสดงรายการรถ (เรียงใหม่สุดขึ้นก่อน)
- ✅ **แก้ไขรถ** — Inline edit ในตาราง (กดปุ่ม " แก้ไข" แก้ในแถวได้เลย)
- ✅ **ลบรถ** — พร้อม confirm dialog กันกดผิด

### Extra
- Loading state ระหว่าง fetch
- Error handling พร้อม alert เมื่อ API ล้มเหลว
- Immutable state updates ตามหลัก React best practice
- Prepared statements กัน SQL injection

## 📁 Project Structure

\`\`\`
react-test/
├── frontend/              # React app (port 5173)
│   ├── src/
│   │   ├── App.jsx        # Root component + state management
│   │   ├── main.jsx       # Entry point
│   │   └── components/
│   │       ├── CarList.jsx  # ตาราง + inline edit
│   │       └── CarForm.jsx  # Form เพิ่มรถ
│   └── package.json
├── backend/               # Express API (port 3001)
│   ├── server.js          # Entry point + middleware
│   ├── routes/
│   │   └── cars.js        # CRUD endpoints
│   ├── database/
│   │   └── database.js    # SQLite setup + schema
│   └── package.json
├── .gitignore
└── README.md
\`\`\`

##  Setup & Run

### 1. Clone repository

\`\`\`bash
git clone https://github.com/songponjay/react-test.git
cd react-test
\`\`\`

### 2. Start Backend (Terminal ที่ 1)

\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

Backend รันที่ **http://localhost:3001**

SQLite database (`cars.db`) จะถูกสร้างอัตโนมัติในโฟลเดอร์ `backend/database/` ตอนรันครั้งแรก

### 3. Start Frontend (Terminal ที่ 2)

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Frontend รันที่ **http://localhost:5173**

เปิดเบราว์เซอร์เข้า http://localhost:5173 เพื่อใช้งาน

##  API Endpoints

| Method | URL | Description | Body |
|---|---|---|---|
| GET | `/api/cars` | ดูรถทั้งหมด | - |
| POST | `/api/cars` | เพิ่มรถใหม่ | `{ registration, brand, model, notes }` |
| PUT | `/api/cars/:id` | แก้ไขรถ | `{ registration, brand, model, notes }` |
| DELETE | `/api/cars/:id` | ลบรถ | - |

### Car Data Model

\`\`\`json
{
  "id": 1,
  "registration": "1กก 1234",
  "brand": "Toyota",
  "model": "Camry",
  "notes": "รถผู้จัดการ",
  "created_at": "2026-07-10 12:00:00"
}
\`\`\`

##  Database Schema

\`\`\`sql
CREATE TABLE IF NOT EXISTS cars (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  registration TEXT NOT NULL,
  brand        TEXT NOT NULL,
  model        TEXT NOT NULL,
  notes        TEXT,
  created_at   TEXT DEFAULT (datetime('now'))
);
\`\`\`

##  Development Notes

- ใช้ **`node --watch`** สำหรับ backend hot-reload (ไม่ต้องลง nodemon)
- **CORS** เปิดสำหรับทุก origin ตอน development (production ควร restrict)
- **WAL mode** เปิดใน SQLite เพื่อ concurrent read/write ที่ดีขึ้น
- **Prepared statements** ใช้ทุก query เพื่อกัน SQL injection

## Known Limitations & Future Improvements

สิ่งที่ยังไม่ได้ทำแต่คิดว่าน่าใส่ถ้ามีเวลาเพิ่ม:
- Search/Filter รถตามยี่ห้อ
- Pagination เมื่อรถเยอะ
- Toast notification แทน alert()
- แยก validation logic เป็น middleware

## Author

Songpon Jay — [github.com/songponjay]
(https://github.com/songponjay)