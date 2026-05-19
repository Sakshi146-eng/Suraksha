# SURAKSHA - The Safety Guardian


## Overview
Suraksha is a personal safety application designed to help users feel secure by providing real-time monitoring and emergency alert services. The Website allows users to quickly notify their emergency contacts with their current location in case of danger.

## Features
- **User Account Management**: Simple sign-up and login process 
- **Emergency Contacts**: Store primary and secondary emergency contacts
- **Alert System**: Send alerts with different risk levels (Low, Medium, High)
- **Location Tracking**: Option to include real-time location data with alerts
- **Alert History**: Track all previous safety alerts in one place
- **Responsive Design**: Works seamlessly on both mobile and desktop devices

## Technology Stack
- **Frontend**: React (v19), Vite, Tailwind CSS, Framer Motion (for smooth micro-animations & premium glassmorphism), Axios, React Icons, React Router DOM
- **Backend**: FastAPI (Python), Uvicorn (ASGI web server), Pymongo (MongoDB driver), python-dotenv, PyJWT (Token-based authentication), Twilio (SMS-based safety alerts), Passlib (Bcrypt hashing)
- **Database**: MongoDB Atlas

## Screenshots
<img width="1449" alt="S1" src="https://github.com/user-attachments/assets/2278b162-1174-4b15-bf29-cee6a79f56cf" />
<img width="1438" alt="S6" src="https://github.com/user-attachments/assets/cd4258ee-404c-469a-8aa5-546017fc1037" />
<img width="1445" alt="S2" src="https://github.com/user-attachments/assets/b26bd99f-d47f-49ad-be9b-35c43911654c" />
<img width="1434" alt="S3" src="https://github.com/user-attachments/assets/27c989bf-792e-49bd-a387-80b67abb5ba6" />
<img width="1440" alt="S4" src="https://github.com/user-attachments/assets/c05093a8-c5cb-423e-bf80-6d922fb806e3" />
<img width="1030" alt="S5" src="https://github.com/user-attachments/assets/97a4af4a-7006-4ff4-9166-a3a72de805c3" />

## Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **Python** (v3.8+ recommended)
- **MongoDB** (Atlas connection URI or local community server)

---

### 1. Backend Setup (`core/` directory)

The backend is built with FastAPI. It handles API requests, user auth, safety alerts, and database interactions.

1. **Navigate to the core directory**:
   ```bash
   cd core
   ```

2. **Create and activate a virtual environment**:
   - **macOS/Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - **Windows**:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```

3. **Install the required packages**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure your environment variables**:
   Create a `.env` file in the `core/` directory (you can copy `.env.example` if available, or create it from scratch) and populate:
   ```env
   ENV_STATE=dev
   
   DEV_MONGO_URI=your_mongodb_connection_uri
   DEV_DB_NAME=safety_guardian
   
   DEV_EMAIL_SENDER=your_gmail_sender@gmail.com
   DEV_EMAIL_PASSWORD=your_gmail_app_password
   
   DEV_TWILIO_ACCOUNT_SID=your_twilio_sid
   DEV_TWILIO_AUTH_TOKEN=your_twilio_token
   DEV_TWILIO_PHONE_NUMBER=your_twilio_phone_number
   
   DEV_JWT_SECRET_KEY=your_jwt_secret_key
   DEV_ACCESS_TOKEN_EXPIRE_MINUTES=60
   ```

5. **Start the FastAPI server**:
   ```bash
   uvicorn main:app --reload
   ```
   The backend server will run at `http://localhost:8000`.

---

### 2. Frontend Setup (`frontend/` directory)

The frontend is a modern React application built with Vite and Tailwind CSS. It is configured to automatically proxy API requests to the backend server.

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`. Open this URL in your web browser to use the application!


## Usage

### First-time Users
1. Click "Sign Up" to create a new account
2. Enter your personal details
3. Set up your emergency contacts
4. You're ready to use the alert system

### Using the Alert System
1. Press the "ALERT NOW" button
2. Select the appropriate risk level
3. Choose whether to include your location
4. Press "Send Alert" to notify your emergency contacts

## API Endpoints
The frontend makes calls to the following API endpoints:

- **POST /login**: User authentication
- **POST /register**: New user registration
- **POST /emergency**: Save emergency contacts
- **GET /contacts**: Retrieve user's emergency contacts
- **POST /alerts**: Create a new alert
- **GET /alerts**: Retrieve user's alert history


## Mobile Enhancements
- Pull-to-refresh functionality for alert history
- Vibration feedback on alert button (when supported)
- Adaptive UI elements optimized for touch interfaces
- Offline detection with appropriate user notifications

## Security Features
- Token-based authentication
- Token expiry and refresh mechanism
- No storage of raw passwords
- Session management

## Future Enhancements
- Push notifications for alerts
- Voice-activated emergency mode
- Integration with emergency services
- Advanced location tracking with journey sharing
- Custom emergency protocols
- Geofencing safety zones

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments
- Font Awesome for icons
- Tailwind CSS for styling
- The browser Geolocation API
- All contributors who have helped enhance this safety application

## Contact
Project Link: [https://github.com/Sakshi146-eng/Suraksha](https://github.com/Sakshi146-eng/Suraksha)

## Live API 
[https://suraksha-safety.vercel.app/](https://suraksha-safety.vercel.app/)

