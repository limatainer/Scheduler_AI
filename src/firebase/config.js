import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Define variables that will be exported
let projectFirestore;
let projectAuth;
let timestamp;
let firebaseApp;

// Check if all required environment variables are present
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
];

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !import.meta.env[varName]
);

if (missingEnvVars.length > 0) {
  console.error(
    `Missing required Firebase environment variables: ${missingEnvVars.join(
      ', '
    )}`
  );
  throw new Error('Firebase configuration incomplete. Check .env file.');
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

try {
  // Initialize Firebase if not already initialized
  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
  } else {
    firebaseApp = firebase.app();
  }

  // Initialize Firestore with cache settings
  const firestoreSettings = {
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
    merge: true, // Merge local documents with server versions
  };

  // init services
  projectFirestore = firebase.firestore();
  projectFirestore.settings(firestoreSettings);

  projectAuth = firebase.auth();

  // Set persistence to LOCAL (persists even when browser is closed)
  projectAuth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch((error) => {
      console.error('Error setting auth persistence:', error);
    });

  // timestamp
  timestamp = firebase.firestore.Timestamp;

  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw new Error('Failed to initialize Firebase. See console for details.');
}

// Export the variables after they've been properly initialized
export { projectFirestore, projectAuth, timestamp, firebaseApp };
