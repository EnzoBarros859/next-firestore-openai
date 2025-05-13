# Next.js Firebase Authentication

A modern authentication system built with Next.js and Firebase, featuring email/password, Google, and GitHub authentication methods.

## Features

- 🔐 Email/Password Authentication
- 🌐 Google Sign-in Integration
- 🐙 GitHub Sign-in Integration
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive Design
- 🔄 Automatic Session Management
- 🛡️ Protected Routes
- ⚡ Fast Page Loads with Loading States

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Firebase account
- Google Cloud Console account
- GitHub account (for GitHub authentication)

## Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY= 
```

## Firebase Configuration

### 1. Firebase Project Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication in Firebase Console
3. Add your web application to the Firebase project
4. Copy the Firebase configuration to your `.env.local` file

### 2. Google Authentication Setup

1. Go to Firebase Console > Authentication > Sign-in methods
2. Enable Google Sign-in
3. Configure OAuth consent screen in Google Cloud Console
4. Add authorized domains in Firebase Console

### 3. GitHub Authentication Setup

1. Go to GitHub Developer Settings
2. Create a new OAuth App
3. Set the following URLs:
   - Homepage URL: `http://localhost:3000` (development)
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github` (development)
   - For production, replace `localhost:3000` with your domain
4. Copy Client ID and Client Secret
5. Add these credentials to Firebase Console > Authentication > Sign-in methods > GitHub

## Important Technical Notes

### Session Management

- After signing out, users must wait 30 seconds before logging in with the same email address
- This is a security measure to prevent rapid re-authentication attempts
- The session timeout is enforced on both client and server side

### Google Authentication

- When using Chrome with special Gmail accounts:
  - Custom Gmail names will be used instead of default Gmail names
  - This is handled automatically by the Google OAuth flow
  - The display name will be updated in Firebase Auth

### GitHub Authentication

- Ensure correct redirect URL configuration:
  - Development: `http://localhost:3000/api/auth/callback/github`
  - Production: `https://your-domain.com/api/auth/callback/github`
- The redirect URL must match exactly in both GitHub OAuth App settings and Firebase configuration

## Installation

```bash
# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   ├── sign-in/
│   └── loading.tsx
├── components/
│   ├── auth/
│   └── ui/
├── lib/
│   └── firebase/
└── styles/
```

## Security Considerations

1. Environment Variables
   - Never commit `.env.local` to version control
   - Use `.env.example` for reference
   - Keep Firebase credentials secure

2. Authentication
   - Implement proper session management
   - Handle token refresh
   - Secure API routes

3. Rate Limiting
   - Implement rate limiting for authentication attempts
   - Monitor for suspicious activities

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
