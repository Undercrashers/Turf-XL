# Turf XL

Turf booking app. React + Spring Boot + H2 (in-memory).

## Run

**Backend** (Java 17, Maven):

```bash
cd backend
MAIL_USERNAME=<gmail> MAIL_PASSWORD=<gmail-app-password> mvn spring-boot:run
```

Listens on `http://localhost:8080/api/v1`. If the mail env vars are omitted, OTPs are logged to the console instead of emailed.

**Frontend** (Node 18+):

```bash
cd frontend
npm install
npm run dev
```

Listens on `http://localhost:5173`.

## User flow

1. Open `http://localhost:5173`
2. Click **Get Started** → enter email → enter the 6-digit OTP from your inbox (or backend console in dev)
3. First-time users: fill name + phone, then you're on the dashboard
4. Browse venues → **Book Now** on any turf → pick sport, date, time → booking is saved
5. **My Bookings** shows all confirmed/cancelled bookings. Cancel button frees the slot.

## Admin flow

Go to `http://localhost:5173/admin/login`. Seeded credentials:

| Role              | Email                    | Password   | Scope                    |
| ----------------- | ------------------------ | ---------- | ------------------------ |
| Super Admin       | `super.admin@turfxl.com` | `super123` | All bookings, every turf |
| Salt Lake Admin   | `salt.admin@turfxl.com`  | `admin123` | Salt Lake Arena only     |
| Elite Admin       | `elite.admin@turfxl.com` | `admin123` | Elite Sports Hub only    |
| Park Circus Admin | `park.admin@turfxl.com`  | `admin123` | Park Circus Pitch only   |

The admin dashboard shows bookings with customer name/email/phone, time, sport, amount, and status. Field admins see only their venue; super admin sees everything.

## Notes

- H2 is in-memory — restart wipes all data (users, bookings). Seed turfs + admin accounts are recreated on startup.
- Backend API base path: `/api/v1`. CORS allows `http://localhost:5173`.
