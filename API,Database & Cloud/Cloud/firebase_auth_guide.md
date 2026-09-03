# Firebase Authentication & FastAPI Backend Integration

This guide details how to integrate Firebase Authentication on the client side (React / Next.js) and securely verify tokens on the FastAPI backend with SQL database synchronization.

---

## 🔁 Complete Authentication Flow

```
[ Client (React / Next.js) ]
       │
       │ 1. User signs in via Google / Email-Password
       ▼
[ Firebase Auth Service ]
       │
       │ 2. Returns Firebase ID Token (JWT)
       ▼
[ Client (React / Next.js) ]
       │
       │ 3. Sends API Request: GET /api/v1/profile
       │    Header: Authorization: Bearer <ID_TOKEN>
       ▼
[ FastAPI Backend ]
       │
       │ 4. Verifies Token via firebase_admin.auth.verify_id_token()
       │    Extracts uid, email, name
       ▼
[ PostgreSQL / AWS RDS Database ]
       │
       │ 5. Checks if firebase_uid exists in 'users' table
       │    - If new: Inserts user into 'users' & creates initial 'user_profiles'
       │    - If existing: Fetches full profile (bio, skills, batch)
       ▼
[ FastAPI Backend ]
       │
       │ 6. Returns complete User Profile JSON to Frontend
       ▼
[ Client (React / Next.js) ]
```

---

## 🛠️ Step 1: Firebase Project Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project: `Full-Stack-Training`.
3. Under **Authentication** -> **Sign-in method**, enable **Email/Password** and **Google**.
4. Go to **Project Settings** -> **Service accounts** -> **Generate new private key**.
5. Save the downloaded JSON file securely as `firebase_credentials.json` (do NOT commit to git).

---

## 💻 Step 2: Frontend Implementation (Next.js / React)

```javascript
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Function to sign in and fetch profile from FastAPI
export async function loginAndGetProfile() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  
  // Get JWT idToken from Firebase
  const idToken = await result.user.getIdToken();

  // Call FastAPI backend
  const response = await fetch("http://localhost:8000/profile", {
    headers: {
      "Authorization": `Bearer ${idToken}`
    }
  });
  
  return await response.json();
}
```

---

## 🐍 Step 3: FastAPI Backend Verification

Install Firebase Admin SDK in Python:
```bash
pip install firebase-admin
```

Implementation in FastAPI (`app/core/firebase.py`):
```python
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException, Header, status

# Initialize Firebase Admin with Service Account
cred = credentials.Certificate("path/to/firebase_credentials.json")
firebase_admin.initialize_app(cred)

def verify_firebase_token(authorization: str = Header(...)) -> dict:
    try:
        token = authorization.split(" ")[1]
        decoded_token = auth.verify_id_token(token)
        # decoded_token contains: uid, email, name, picture
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid Firebase Token: {str(e)}"
        )
```

Endpoint usage:
```python
@router.get("/profile")
def get_user_profile(user_token: dict = Depends(verify_firebase_token)):
    firebase_uid = user_token["uid"]
    email = user_token.get("email")
    # Query SQL Database using firebase_uid
    return {"status": "success", "uid": firebase_uid, "email": email}
```
