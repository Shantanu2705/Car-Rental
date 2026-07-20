import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(readFileSync("./car-rental-d799a-firebase-adminsdk-fbsvc-ac93a927a8.json", "utf8"));

const app = initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth(app);

auth.createUser({
  email: "admin@apextravel.com",
  password: "ApexAdmin123!",
  displayName: "Admin User",
})
.then(user => {
  console.log("Successfully created new user:", user.uid);
  process.exit(0);
})
.catch(error => {
  console.error("Error creating user:", error);
  process.exit(1);
});
