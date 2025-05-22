# Uber Clone Server

This is the backend server for the Uber Clone project. It is built with Node.js, Express, and MongoDB, and provides RESTful APIs for user, captain (driver), and map-related features.

## Table of Contents
- [Features](#features)
- [API Routes](#api-routes)
- [Map APIs Used](#map-apis-used)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)

---

## Features
- User authentication (register, login, logout, get profile)
- Captain (driver) authentication (register, login, logout, get profile)
- Get coordinates for a given address
- Calculate driving distance and duration between two locations
- Secure cookies and JWT-based authentication
- Error handling middleware

## API Routes

### User Routes (`/api/v1/user`)
- `POST /new` — Register a new user
  - **Output:**
    ```json
    {
      "success": true,
      "user": { /* user object */ },
      "token": "jwt_token"
    }
    ```
- `POST /login` — Login user
  - **Output:**
    ```json
    {
      "success": true,
      "user": { /* user object */ },
      "token": "jwt_token"
    }
    ```
- `GET /me` — Get current user profile (requires authentication)
  - **Output:**
    ```json
    {
      "success": true,
      "user": { /* user object */ }
    }
    ```
- `GET /logout` — Logout user (requires authentication)
  - **Output:**
    ```json
    {
      "success": true,
      "message": "Logout successfully"
    }
    ```

### Captain Routes (`/api/v1/captain`)
- `POST /new` — Register a new captain
  - **Output:**
    ```json
    {
      "success": true,
      "captain": { /* captain object */ },
      "token": "jwt_token"
    }
    ```
- `POST /login` — Login captain
  - **Output:**
    ```json
    {
      "success": true,
      "captain": { /* captain object */ },
      "token": "jwt_token"
    }
    ```
- `GET /me` — Get current captain profile (requires authentication)
  - **Output:**
    ```json
    {
      "success": true,
      "captain": { /* captain object */ }
    }
    ```
- `GET /logout` — Logout captain (requires authentication)
  - **Output:**
    ```json
    {
      "success": true,
      "message": "Logout successfully"
    }
    ```

### Map Routes (`/api/v1/map`)
- `GET /get-cordinates?address=ADDRESS` — Get latitude and longitude for an address (requires authentication)
  - **Output:**
    ```json
    {
      "success": true,
      "coordinates": {
        "lat": 12.9716,
        "lng": 77.5946
      }
    }
    ```
- `GET /get-distance?origin=ADDRESS&destination=ADDRESS` — Get driving distance (km) and duration (min) between two addresses (requires authentication)
  - **Output:**
    ```json
    {
      "success": true,
      "origin": "origin address",
      "destination": "destination address",
      "distanceInKm": "12.34",
      "durationInMin": "25.67"
    }
    ```
- `GET /get-suggested-locations` — (Reserved for future use)
  - **Output:**
    ```json
    {
      "success": true,
      "locations": [ /* suggested locations */ ]
    }
    ```

### Ride Routes (`/api/v1/ride`)
- `POST /new` — Create a new ride (user books a ride)
  - **Request Body:**
    ```json
    {
      "pickup": "Pickup Address",
      "destination": "Destination Address",
      "vechicleType": "car"
    }
    ```
  - **Output:**
    ```json
    {
      "success": true,
      "message": "Ride created successfully",
      "ride": {
        "_id": "ride_id",
        "user": "user_id",
        "pickup": "Pickup Address",
        "destination": "Destination Address",
        "fare": "₹123"
      }
    }
    ```

## Map APIs Used
- **Geocode API**: [maps.co Geocoding API](https://geocode.maps.co/) — Converts address to coordinates.
  - Endpoint: `https://geocode.maps.co/search`
  - Features used: Address lookup, returns latitude and longitude.
- **OpenRouteService API**: [openrouteservice.org](https://openrouteservice.org/) — Calculates driving distance and time.
  - Endpoint: `https://api.openrouteservice.org/v2/directions/driving-car`
  - Features used: Route calculation, returns distance (meters) and duration (seconds).

## Environment Variables
Create a `.env` file in the `server/` directory with the following variables:
```
PORT=4000
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
GEOCLOUD_API=your_mapsco_api_key
ORS_API_KEY=your_openrouteservice_api_key
NODE_ENV=development
```

## Installation
1. Navigate to the `server/` directory:
   ```powershell
   cd f:\uberclone\server
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the server:
   ```powershell
   npm run dev
   ```

## Scripts
- `npm run dev` — Start server with nodemon (development)
- `npm start` — Start server with Node.js

## Dependencies
- express
- mongoose
- dotenv
- axios
- bcryptjs
- jsonwebtoken
- cookie-parser
- cors
- nodemon

---

For more details, see the source code in the `controller/`, `routes/`, and `utils/` folders.
