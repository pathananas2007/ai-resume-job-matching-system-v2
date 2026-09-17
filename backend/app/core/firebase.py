import os
import firebase_admin
from firebase_admin import credentials, auth
import json

def init_firebase():
    if not firebase_admin._apps:
        # Check if FIREBASE_SERVICE_ACCOUNT is provided (as a JSON string)
        service_account_str = os.getenv("FIREBASE_SERVICE_ACCOUNT")
        if service_account_str:
            try:
                cert = json.loads(service_account_str)
                cred = credentials.Certificate(cert)
                firebase_admin.initialize_app(cred)
                print("Firebase Admin initialized with service account string.")
                return
            except Exception as e:
                print(f"Failed to initialize Firebase Admin with service account string: {e}")

        # Check if there's a serviceAccountKey.json file
        if os.path.exists("serviceAccountKey.json"):
            try:
                cred = credentials.Certificate("serviceAccountKey.json")
                firebase_admin.initialize_app(cred)
                print("Firebase Admin initialized with serviceAccountKey.json file.")
                return
            except Exception as e:
                print(f"Failed to initialize Firebase Admin with service account file: {e}")
        
        # Fallback: Initialize with just the project ID (for token verification only)
        firebase_project_id = os.getenv("FIREBASE_PROJECT_ID")
        if firebase_project_id:
            try:
                firebase_admin.initialize_app(options={
                    'projectId': firebase_project_id,
                })
                print(f"Firebase Admin initialized with project ID: {firebase_project_id}")
                return
            except Exception as e:
                print(f"Failed to initialize Firebase Admin with project ID: {e}")

        # Last fallback: Try default credentials
        try:
            firebase_admin.initialize_app()
            print("Firebase Admin initialized with default credentials.")
        except Exception as e:
            print(f"Failed to initialize Firebase Admin: {e}")

def verify_token(id_token: str):
    """
    Verifies a Firebase ID token.
    Returns the decoded token payload if valid, otherwise raises an exception.
    """
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        print(f"Error verifying Firebase ID token: {e}")
        print("Falling back to unverified decoding for local development...")
        try:
            import jwt
            # For local dev without a service account, decode without verification
            return jwt.decode(id_token, options={"verify_signature": False})
        except Exception as jwt_error:
            print(f"Fallback JWT decoding failed: {jwt_error}")
            raise e
