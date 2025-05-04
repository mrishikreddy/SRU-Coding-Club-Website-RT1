import admin from "firebase-admin";
import { NextResponse } from "next/server";


if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  } catch (error) {
    console.error("Firebase Admin Initialization Error:", error);
  }
}

const db = admin.firestore();
const AGG_REF = db.collection("Admin").doc("aggregateDoc");

export async function POST(req) {
  try {
    const { name, year, htno, email } = await req.json();
    if (!name || !year || !htno || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const formattedHTNO = htno.trim().toLowerCase();
    const formattedEmail = email.toLowerCase();

    
    const aggregateUserData = aggregateData.UserData || {};
    const aggregateUserPoints = aggregateData.UserPoints || {};


    aggregateUserData[formattedHTNO] = {
      HTNO: formattedHTNO,
      Name: name,
      Year: year,
      Email: formattedEmail,
      Verified: false,
    };

    aggregateUserPoints[formattedHTNO] = { Points: finalPoints };

    return NextResponse.json({ message: "User registered successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Firestore Write Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
