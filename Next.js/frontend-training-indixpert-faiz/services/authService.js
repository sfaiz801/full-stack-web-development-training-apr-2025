// Firebase Auth handles all authentication - no backend API needed for auth flows
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  sendEmailVerification,
  confirmPasswordReset,
  updateProfile,
  signOut
} from "@/lib/firebase";

export const authService = {
  // Primary Authentication via Firebase Auth (Single Source of Truth)
  login: async (credentials) => {
    return await authService.loginWithFirebase(credentials.email, credentials.password);
  },

  signup: async (userData) => {
    return await authService.signupWithFirebase(userData.email, userData.password, userData.full_name);
  },

  forgotPassword: async (emailData) => {
    return await authService.sendFirebasePasswordReset(emailData.email);
  },

  resetPassword: async (resetData) => {
    if (resetData.oobCode) {
      return await authService.confirmFirebasePasswordReset(resetData.oobCode, resetData.new_password);
    }
    throw new Error("Invalid or missing reset link code. Please use the link sent to your email.");
  },

  // Direct Firebase Auth SDK Methods
  loginWithFirebase: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        full_name: userCredential.user.displayName || userCredential.user.email.split("@")[0],
        emailVerified: userCredential.user.emailVerified,
      };
      return { token, access_token: token, user };
    } catch (firebaseErr) {
      let message = "Invalid email or password.";
      if (
        firebaseErr.code === "auth/invalid-credential" ||
        firebaseErr.code === "auth/user-not-found" ||
        firebaseErr.code === "auth/wrong-password"
      ) {
        message = "Invalid email or password. Please check your credentials or sign up.";
      } else if (firebaseErr.code === "auth/too-many-requests") {
        message = "Too many failed attempts. Please try again later.";
      } else if (firebaseErr.code === "auth/user-disabled") {
        message = "This user account has been disabled.";
      } else if (firebaseErr.message) {
        message = firebaseErr.message;
      }
      throw new Error(message);
    }
  },

  signupWithFirebase: async (email, password, fullName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (fullName) {
        await updateProfile(userCredential.user, { displayName: fullName });
      }
      // Send verification link to user's email address
      await sendEmailVerification(userCredential.user);

      const token = await userCredential.user.getIdToken();
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        full_name: fullName || userCredential.user.email.split("@")[0],
        emailVerified: userCredential.user.emailVerified,
      };
      return { token, access_token: token, user };
    } catch (firebaseErr) {
      let message = "Failed to create account.";
      if (firebaseErr.code === "auth/email-already-in-use") {
        message = "An account with this email address already exists.";
      } else if (firebaseErr.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      } else if (firebaseErr.message) {
        message = firebaseErr.message;
      }
      throw new Error(message);
    }
  },

  resendVerificationEmail: async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        return { message: "Verification email resent successfully!" };
      }
      throw new Error("No active user session found. Please try signing up again.");
    } catch (err) {
      throw new Error(err.message || "Failed to resend verification email.");
    }
  },

  sendFirebasePasswordReset: async (email) => {
    try {
      const actionCodeSettings = {
        url: `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/reset-password`,
        handleCodeInApp: true,
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      return { message: "Password reset link sent to your email address." };
    } catch (firebaseErr) {
      let message = "Failed to send password reset email.";
      if (firebaseErr.code === "auth/user-not-found") {
        message = "No account found with this email address.";
      } else if (firebaseErr.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (firebaseErr.message) {
        message = firebaseErr.message;
      }
      throw new Error(message);
    }
  },

  confirmFirebasePasswordReset: async (oobCode, newPassword) => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      return { message: "Password updated successfully in Firebase!" };
    } catch (firebaseErr) {
      let message = "Failed to reset password.";
      if (firebaseErr.code === "auth/expired-action-code") {
        message = "The password reset link has expired. Please request a new one.";
      } else if (firebaseErr.code === "auth/invalid-action-code") {
        message = "Invalid password reset link or it has already been used.";
      } else if (firebaseErr.message) {
        message = firebaseErr.message;
      }
      throw new Error(message);
    }
  },

  googleSignInWithFirebase: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const user = {
        uid: result.user.uid,
        email: result.user.email,
        full_name: result.user.displayName || result.user.email.split("@")[0],
      };
      return { token, access_token: token, user };
    } catch (firebaseErr) {
      throw new Error(firebaseErr.message || "Google Sign-In failed.");
    }
  },

  logoutFirebase: async () => {
    await signOut(auth);
  }
};
