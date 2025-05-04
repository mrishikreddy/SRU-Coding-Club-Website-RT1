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

export async function POST(req) {
  try {
    const body = await req.text();
    const { data } = JSON.parse(body);

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

  
    const aggRef = db.collection("Admin").doc("aggregateDoc");
    const aggSnap = await aggRef.get(); 
    let aggregate = aggSnap.exists ? aggSnap.data() : {};


    if (!aggregate.UserPoints) {
      aggregate.UserPoints = {};
    }

    const results = [];

    for (const entry of data) {
      let { hallticket, points } = entry;

      if (!hallticket || typeof points !== "number") {
        results.push({ hallticket, status: "invalid entry" });
        continue;
      }

      const existingPoints = aggregate.UserPoints[hallticket] ? aggregate.UserPoints[hallticket].Points : 0;
      const newPoints = existingPoints + points;
      aggregate.UserPoints[hallticket] = { Points: newPoints };

      results.push({ hallticket, status: "updated", newPoints });
    }

    await aggRef.set({ UserPoints: aggregate.UserPoints }, { merge: true });

    return NextResponse.json({ message: "Points processed successfully", results }, { status: 200 });
  } catch (error) {
    console.error("Error processing points:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
