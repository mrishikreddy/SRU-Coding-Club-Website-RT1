import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   "Code Removed due to Security Issues",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { app, auth };