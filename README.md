# SRU Coding Club Website

This is a full-stack web application built to empower the SRU coding community. Designed with modern tools like Next.js, React.js, Firebase, JavaScript, and Generative AI, it supports over 10,000 users with a fast, secure, and feature-rich experience. Whether you're a student, a developer, or just curious, this README will guide you through the project’s purpose, features, setup, and more.

- **Original Link** (SRU students only): [srucodingclub.live](https://www.srucodingclub.live/)
- **Guest Link** (open to all): [rtsrucc-demo-web.vercel.app](https://rtsrucc-demo-web.vercel.app/)

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Note on Code Removal](#note-on-code-removal)
- [Acknowledgments](#acknowledgments)

## About the Project
The SRU Coding Club Website is a dynamic platform created to connect students, host coding competitions, and provide resources—all while keeping things fast and user-friendly. Here’s what makes it special:
- **Scalability**: Handles 10,000+ users and 30,000 concurrent connections, onboarding 500+ users in its first week.
- **Speed**: Achieves load times under 200ms with optimized Firestore reads and localStorage caching.
- **Efficiency**: Cuts redundant Firestore reads by 80%, doubling UI navigation speed.
- **Smart Features**: Features Ciao AI, a chatbot automating 3000+ queries per day, and a real-time contact form with unlimited submissions.

## Features
Here’s a rundown of what the SRU Coding Club Website offers:

### Authentication
- **Sign-In**: Log in with Firebase Authentication in real time (`/src/app/(auth)/SignIn/`).
- **Sign-Up**: Register with full name, email, password, and college email verification (`/src/app/(auth)/SignUp/`).
- **Forgot Password**: Reset your password using your hall ticket number; a link is sent to your college Gmail (`/src/app/(auth)/ForgotPassword/`).

### Side Menu Contents
Accessible via a hamburger menu on the homepage:
- **About**: Learn all about SRU Coding Club (`/src/app/(sb)/about/`).
- **Connect**: Find social links (Instagram, LinkedIn, Email, Medium, Facebook, Twitter) (`/src/app/(sb)/connect/`).
- **Contact**: Submit suggestions or queries without logging in; messages reach club authorities via email (`/src/app/(sb)/contact/`).
- **FAQs**: Answers to common questions (`/src/app/(sb)/faq/`).
- **Meet Our Team**: Profiles of our 10 core team members (`/src/app/(sb)/MeetOurTeam/`).
- **Rules**: Competition-specific rules, updated per event (`/src/app/(sb)/rules/`).

### Ciao AI Chatbot
- An AI-powered chatbot on the homepage (`/src/app/aicb/`) that answers club-related questions and handles off-topic queries with clever replies.

### Exam Info
- Displays details of quizzes and exams hosted by the club (`/src/app/exam/`).

### Admin Dashboard
- A secure page for admins (`/src/app/admin/`) to:
  - Upload/update points.
  - Set exam/event details (name, date, time, links).
  - Manage learning resources.

### Leaderboard & Event Timer
- Real-time leaderboard and countdown timer for upcoming events on the homepage (`/src/app/page.js`). Links activate when the timer hits zero.

## Tech Stack
- **Frontend**: Next.js, React.js, JavaScript, CSS Modules
- **Backend**: Firebase (Authentication, Firestore, Analytics)
- **AI**: Generative AI (powers Ciao AI chatbot)
- **APIs**: Custom-built for points, user management, exam details, and feedback
- **Optimization**: localStorage caching, indexed Firestore design

## Project Structure
Here’s how the codebase is organized:
```
├── src
│   ├── app
│   │   ├── (auth)
│   │   │   ├── SignIn
│   │   │   ├── ForgotPassword
│   │   │   └── SignUp
│   │   ├── (sb)
│   │   │   ├── about
│   │   │   ├── connect
│   │   │   ├── contact
│   │   │   ├── faq
│   │   │   ├── MeetOurTeam
│   │   │   └── rules
│   │   ├── aicb
│   │   ├── exam
│   │   ├── contexts
│   │   ├── firebase
│   │   ├── Navbar.js
│   │   ├── page.js
│   │   ├── layout.js
│   │   └── admin
│   ├── api
│   │   ├── addpoints
│   │   ├── adduser
│   │   ├── aiEndPoint
│   │   ├── feedback
│   │   ├── getExamDetails
│   │   ├── setDateTime
│   │   ├── setExamName
│   │   ├── setlink
│   │   └── setResourcesLink
├── public
├── styles
└── package.json
```

## Installation
Want to run this locally? Here’s how:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/sru-coding-club-website.git
   cd sru-coding-club-website
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Firebase**:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
   - Add your Firebase config to `/src/app/firebase/firebase.js`.
   - Enable Email/Password Authentication and Firestore.
4. **Add environment variables**:
   Create a `.env.local` file in the root:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```
5. **Start the server**:
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- **For Users**: Sign up with your college email, verify it, and explore the leaderboard, exams, and chatbot.
- **For Admins**: Log in, access the admin page with a secondary password, and manage points, events, or resources.
- **Contact Form**: Submit queries anytime—no login required.
- **Ciao AI**: Chat with the bot on the homepage for instant answers.

## Note on Code Removal
**Heads up**: Some code has been intentionally removed from this repo for security and copyright reasons. This version is here to showcase how the SRU Coding Club operates. For the full codebase, contact me (Rishik) via email or the contact form!

## Acknowledgments
- Thanks to the SRU Coding Club community for inspiration and support.
- Shoutout to Firebase and Next.js for making development a breeze.
- Built with ❤️ by Rishik for SRU Coding Club.
