# Turf XL – Backend

Spring Boot REST API for Turf XL Baisakhi.

## Requirements
- Java 17
- Maven 3.9+
- MySQL 8+

## Run Locally
```bash
# set your MySQL creds in src/main/resources/application.yml or application-local.yml
./mvnw spring-boot:run
```

Server: `http://localhost:8080`
Base path: `/api/v1`

## Package Layout

```
com.turfmanagement
├── config/         # CORS, AppConfig, beans
├── controller/     # REST endpoints (thin layer)
├── dto/
│   ├── request/    # inbound payloads (validated)
│   └── response/   # outbound payloads
├── entity/         # JPA @Entity classes (DB schema)
├── enums/          # Role, BookingStatus, SportType, etc.
├── exception/      # Custom exceptions + @ControllerAdvice
├── mapper/         # MapStruct entity <-> DTO mappers
├── repository/     # Spring Data JPA repositories
├── security/       # JWT filter, SecurityConfig, UserDetailsService
├── service/
│   ├── impl/       # Business logic implementations
│   └── *.java      # Service interfaces
└── util/           # Helpers (OtpGenerator, DateUtils, etc.)
```

## Modules (logical)
- **auth**     — `/auth/*` — OTP request, verify, complete-profile
- **user**     — `/users/*`
- **turf**     — `/turfs/*`
- **slot**     — `/turfs/{id}/slots`
- **booking**  — `/bookings/*`
- **payment**  — placeholder
- **admin**    — `/admin/*`

## Profiles
- `dev` — local development (H2 or local MySQL)
- `prod` — production MySQL

Activate with `-Dspring-boot.run.profiles=dev`.
