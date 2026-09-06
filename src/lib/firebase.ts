import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider =
  new GoogleAuthProvider(); /* Connection test as per instructions */
async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
    console.log("Firebase Connection Successful");
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("the client is offline")
    ) {
      console.error(
        "Please check your Firebase configuration. Client is offline.",
      );
    }
  }
}
if (import.meta.env.MODE !== "test") {
  testConnection();
}
/** * Interface for custom error handling as per guidelines */ export interface FirestoreErrorInfo {
  error: string;
  operationType: "create" | "update" | "delete" | "list" | "get" | "write";
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string }[];
  };
}
export function handleFirestoreError(
  error: any,
  operation: FirestoreErrorInfo["operationType"],
  path: string | null,
): never {
  const user = auth.currentUser;
  const errorInfo: FirestoreErrorInfo = {
    error: error.message || "Unknown Firestore error",
    operationType: operation,
    path,
    authInfo: {
      userId: user?.uid || "anonymous",
      email: user?.email || "",
      emailVerified: user?.emailVerified || false,
      isAnonymous: user?.isAnonymous || true,
      providerInfo:
        user?.providerData.map((p) => ({
          providerId: p.providerId,
          displayName: p.displayName || "",
          email: p.email || "",
        })) || [],
    },
  };
  throw new Error(JSON.stringify(errorInfo));
}
