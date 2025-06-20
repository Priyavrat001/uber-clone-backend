# Uber Clone Server

This is the backend server for the Uber Clone project. It is built with Node.js, Express, MongoDB, and Socket.IO, and provides RESTful APIs and real-time features for users, captains (drivers), and map-related services.

## Features
- User authentication (register, login, logout, get profile)
- Captain (driver) authentication (register, login, logout, get profile)
- Ride creation, fare calculation, and confirmation
- Real-time ride requests and captain location updates via Socket.IO
- Get coordinates, driving distance, and duration for addresses
- Location suggestions using geocoding APIs
- Secure cookies and JWT-based authentication
- Modular controllers, routes, and middleware
- Robust error handling

## Real-Time Features (Socket.IO)
- Socket.IO server is initialized and used for all real-time communication.
- When a user creates a ride, a real-time event is sent to available captains.
- Captains join rooms and send live location updates to the server.
- Utility (`utils/socketHelper.js`) for sending messages to specific socket IDs.
- All socket events are documented in the codebase for easy extension.

## API Routes

### User Routes (`/api/v1/user`)
- `POST /new` — Register a new user
  - **Output:**
    ```json
    {
      "success": true,
      "message": "User created successFully"
    }
    ```
- `POST /login` — Login user
  - **Output:**
    ```json
    {
      "success": true,
      "message": "Login successfully"
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
      "message": "Captain created successfully"
    }
    ```
- `POST /login` — Login captain
  - **Output:**
    ```json
    {
      "success": true,
      "message": "Captain login successully"
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
      "coordinates": { /* lat, lng */ }
    }
    ```
- `GET /get-distance?origin=ADDRESS&destination=ADDRESS` — Get driving distance and duration (requires authentication)
  - **Output:**
    ```json
    {
      "success": true,
      "origin": "...",
      "destination": "...",
      "distanceInKm": "...",
      "durationInMin": "..."
    }
    ```
- `GET /get-suggested-locations?address=ADDRESS` — Get location suggestions (requires authentication)
  - **Output:**
    ```json
    {
      "success": true,
      "data": { /* suggestions from geocoding API */ }
    }
    ```

### Ride Routes (`/api/v1/ride`)
- `POST /new-ride` — Create a new ride (user books a ride, triggers real-time event)
  - **Request Body:**
    ```json
    {
      "pickUp": "Pickup Address",
      "destination": "Destination Address",
      "vechicleType": "car"
    }
    ```
  - **Output:**
    ```json
    {
      "success": true,
      "message": "Ride created successfully",
      "ride": { /* ride object */ }
    }
    ```
- `GET /get-fare-price?pickUp=ADDRESS&destination=ADDRESS` — Get fare prices for all vehicle types
  - **Output:**
    ```json
    {
      "success": true,
      "fare": { /* fare object by vehicle type */ }
    }
    ```
- `POST /confirm-ride` — Captain confirms a ride (requires authentication)
  - **Request Body:**
    ```json
    {
      "rideId": "ride_id"
    }
    ```
  - **Output:**
    ```json
    {
      "success": true,
      "message": "Ride confirmed successfully",
      "ride": { /* ride object */ },
      "captain": { /* captain object */ }
    }
    ```
- `POST /start-ride` — Captain starts a ride (requires authentication)
  - **Request Body:**
    ```json
    {
      "rideId": "ride_id",
      "captain": "captain_id",
      "otp": "1234"
    }
    ```
  - **Output:**
    ```json
    {
      "success": true,
      "message": "Ride started successfully",
      "ride": { /* ride object */ }
    }
    ```

## Project Structure

```
server/
  app.js                  # Main server file, initializes Express and Socket.IO
  controller/             # Route controllers (user, captain, ride, map)
  middleware/             # Auth and error middleware
  models/                 # Mongoose models (User, Captain, Ride)
  routes/                 # Express routers for all API endpoints
  utils/                  # Utility functions (DB, features, socketHelper)
  package.json            # Project metadata and dependencies
  README.md               # Project documentation
```

## Environment Variables
- `PORT` — Server port (default: 4000)
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT tokens
- `ORS_API_KEY` — API key for OpenRouteService geocoding

## Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev` — Start the server with nodemon for development
- `npm start` — Start the server in production mode

## Dependencies
- express, mongoose, dotenv, cors, cookie-parser, bcryptjs, jsonwebtoken, axios, nodemon, socket.io

---

For more details, see the codebase and inline comments in each file.
