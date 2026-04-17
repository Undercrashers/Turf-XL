# Turf XL Baisakhi – Turf Management System

A full-stack MVP for booking and managing turfs at **Turf XL Baisakhi**.
This repository contains the base project skeleton only (no advanced business
logic yet) and is structured to be portfolio / interview / demo ready.

---

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- React Router
- Axios
- Context API (auth + global state)

**Backend**
- Spring Boot (Java 17)
- Maven
- MySQL
- Spring Data JPA / Hibernate
- Spring Security + JWT
- Hibernate Validator
- Email OTP based authentication

---

## Repository Structure

```
Turf XL/
├── frontend/      # React + Vite client
├── backend/       # Spring Boot REST API
├── .gitignore
└── README.md
```

See `frontend/README.md` and `backend/README.md` for module level details.

---

## Authentication Flow (Email OTP Only)

1. User enters email on `LoginPage`
2. Backend sends OTP to email
3. User submits OTP on `VerifyOtpPage`
4. Backend verifies OTP and returns JWT
5. If user is **existing** → redirect to `UserDashboardPage`
6. If user is **new** → redirect to `CompleteProfilePage` (name + phone)
7. Profile saved → redirect to dashboard

There is no separate signup page and no password login.

---

## Running Locally

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

---

## Branch Naming Convention

| Prefix      | Purpose                          | Example                       |
|-------------|----------------------------------|-------------------------------|
| `main`      | Stable release                   | `main`                        |
| `develop`   | Integration branch               | `develop`                     |
| `feature/`  | New features                     | `feature/otp-login`           |
| `bugfix/`   | Non-critical bug fixes           | `bugfix/slot-time-overlap`    |
| `hotfix/`   | Production hotfixes              | `hotfix/jwt-expiry`           |
| `chore/`    | Tooling / config / docs          | `chore/update-readme`         |

---

## Development Phases

### Phase 1 (MVP base — this repo)
- Project skeleton + routing + layouts
- Email OTP login flow (wiring only)
- Placeholder pages and controllers
- DB entity planning
- JWT + Spring Security config

### Phase 2 (Feature build-out)
- Real OTP service + email integration
- Turf / Slot / Booking CRUD
- Payment integration (Razorpay / Stripe stub)
- Admin dashboard with real data
- Reviews, amenities, analytics

---

## License

For educational and portfolio use.
