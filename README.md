# Cab Booking System - LLD Practice

A minimal cab booking platform built for machine coding interview practice.

## Tech Stack
- Node.js + Express
- In-memory storage (Maps)
- No database, no authentication

## Project Structure
```
src/
├── app.js              # Express server entry point
├── routes/
│   ├── riderRoutes.js
│   ├── driverRoutes.js
│   └── rideRoutes.js
├── controllers/
│   ├── riderController.js
│   ├── driverController.js
│   └── rideController.js
└── services/
    ├── riderService.js
    ├── driverService.js
    └── rideService.js
```

## Low Level Design

### Entities
```
Rider
├── id: number
└── name: string

Driver
├── id: number
├── name: string
├── location: { x, y }
└── available: boolean

Ride
├── id: number
├── rider: Rider
├── driver: Driver
├── startLocation: { x, y }
├── endLocation: { x, y }
└── status: "ONGOING" | "COMPLETED"
```

### Class Diagram
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Rider     │     │   Driver    │     │    Ride     │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │     │ id          │     │ id          │
│ name        │     │ name        │     │ rider       │──→ Rider
└─────────────┘     │ location    │     │ driver      │──→ Driver
                    │ available   │     │ startLoc    │
                    └─────────────┘     │ endLoc      │
                                        │ status      │
                                        └─────────────┘
```

### Core Logic
- **Driver Matching**: Nearest available driver using Euclidean distance
- **Distance Formula**: `sqrt((x1-x2)² + (y1-y2)²)`

## API Endpoints

### Riders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/riders` | Register a rider |
| POST | `/riders/:id/book` | Book a cab |
| GET | `/riders/:id/rides` | Get ride history |

### Drivers
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/drivers` | Register a driver |
| PUT | `/drivers/:id/location` | Update location |
| PUT | `/drivers/:id/availability` | Toggle availability |

### Rides
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/rides/:id/end` | End a ride |

## Run Locally

```bash
npm install
npm start
# Server runs on http://localhost:3000
```

## Sample API Calls

```bash
# Register rider
curl -X POST http://localhost:3000/riders \
  -H "Content-Type: application/json" \
  -d '{"name": "John"}'

# Register driver
curl -X POST http://localhost:3000/drivers \
  -H "Content-Type: application/json" \
  -d '{"name": "Driver A", "location": {"x": 10, "y": 5}}'

# Book a ride
curl -X POST http://localhost:3000/riders/1/book \
  -H "Content-Type: application/json" \
  -d '{"x": 12, "y": 8}'

# End ride
curl -X POST http://localhost:3000/rides/1/end \
  -H "Content-Type: application/json" \
  -d '{"x": 30, "y": 25}'

# Get ride history
curl http://localhost:3000/riders/1/rides
```

## Features Implemented
- [x] Register a rider
- [x] Register a driver/cab
- [x] Update cab's location
- [x] Driver can toggle availability
- [x] Rider can book a cab (nearest driver matching)
- [x] Driver can end a ride
- [x] Fetch ride history for a rider

## Possible Extensions
- Distance-based fare calculation
- Multiple cab types with different rates
- Driver ratings
- Maximum pickup distance limit
