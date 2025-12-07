# Cab Booking System – LLD (API Design)

## Assumptions
- Single city
- Single server instance
- In-memory storage
- No authentication or payments

## Core Entities
- Location { x, y }
- Rider { id, name }
- Driver { id, name, location, available }
- Ride { id, riderId, driverId, startLocation, endLocation, status }

### RideStatus
- ONGOING
- COMPLETED

---

## API Contracts

### Register Rider
POST /riders  
Body:
{
  "name": "John"
}

Response (201):
{
  "id": 1,
  "name": "John"
}

---

### Register Driver
POST /drivers  
Body:
{
  "name": "Driver A",
  "location": { "x": 10, "y": 5 }
}

Response (201):
{
  "id": 1,
  "name": "Driver A",
  "location": { "x": 10, "y": 5 },
  "available": true
}

---

### Update Driver Location
PUT /drivers/{driverId}/location  
Body:
{
  "x": 15,
  "y": 8
}

Response:
200 / 204

---

### Update Driver Availability
PUT /drivers/{driverId}/availability?available=true|false

Response:
200 / 204

---

### Book Ride
POST /riders/{riderId}/book  
Body:
{
  "x": 20,
  "y": 10
}

Response (201):
{
  "rideId": 1,
  "riderId": 1,
  "driverId": 2,
  "status": "ONGOING"
}

Behavior:
- Find nearest available driver
- Mark driver unavailable
- Create ongoing ride

---

### End Ride
POST /rides/{rideId}/end  
Body:
{
  "x": 30,
  "y": 25
}

Response (200):
{
  "rideId": 1,
  "status": "COMPLETED"
}

Behavior:
- Mark ride completed
- Mark driver available

---

### Get Rider Ride History
GET /riders/{riderId}/rides

Response (200):
[
  {
    "rideId": 1,
    "driverId": 2,
    "status": "COMPLETED"
  }
]

---

## Driver Matching
- Nearest available driver using Euclidean distance