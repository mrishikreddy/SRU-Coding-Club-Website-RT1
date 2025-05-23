import admin from "firebase-admin";
import { NextResponse } from "next/server";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const db = admin.firestore();
const AGG_REF = db.collection("Admin").doc("aggregateDoc");

export async function POST(req) {
  try {
    const { link } = await req.json();

    if (!link) {
      return NextResponse.json({ error: "Link is required" }, { status: 400 });
    }

    return NextResponse.json({ message: "Link updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
