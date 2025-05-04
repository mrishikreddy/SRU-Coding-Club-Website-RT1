"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./authContext";
import { app } from "../firebase/firebase";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

const CACHE_KEY = "dataCache";
const CACHE_TTL = 3 * 60 * 60 * 1000; 

export const DataProvider = ({ children }) => {
  const db = getFirestore(app);
  const { userLoggedIn, currentUser } = useAuth();

  const [userData, setUserData] = useState({});
  const [userPoints, setUserPoints] = useState({});
  const [examDetails, setExamDetails] = useState(null);
  const [dashboardData, setDashboardData] = useState([]);
  const [combinedUserData, setCombinedUserData] = useState({
    Name: "Loading...",
    HTNO: "Loading...",
    Year: "Loading...",
    Points: "Loading...",
  });

  
  const fetchAggregateData = useCallback(async () => {
    if (!currentUser?.email) return;
  
    const now = Date.now();
    const cached = localStorage.getItem(CACHE_KEY);
  
    if (cached) {
      const parsed = JSON.parse(cached);
      if (now - parsed.timestamp < CACHE_TTL) {
        await processAggregateData(parsed.aggregateData);
        return;
      }
    }
  
    const aggregateRef = doc(db, "Admin", "aggregateDoc");
    const snapshot = await getDoc(aggregateRef);
  
    if (snapshot.exists()) {
      let data = snapshot.data();
      data = await processAggregateData(data);
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: now,
          aggregateData: data,
        })
      );
    } else {
      console.warn("⚠️ aggregateDoc does not exist");
    }
  }, [currentUser, db, processAggregateData]);
  
  useEffect(() => {
    if (userLoggedIn) {
      fetchAggregateData();
    }
  }, [userLoggedIn, currentUser, fetchAggregateData]);
  

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && userLoggedIn) {
        fetchAggregateData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userLoggedIn, fetchAggregateData]);

  useEffect(() => {
    if (!userLoggedIn) {

      localStorage.removeItem(CACHE_KEY);
      setUserData({});
      setUserPoints({});
      setExamDetails(null);
      setDashboardData([]);
      setCombinedUserData({
        Name: "Loading...",
        HTNO: "Loading...",
        Year: "Loading...",
        Points: "Loading...",
      });
    }
  }, [userLoggedIn]);

  useEffect(() => {
    if (!currentUser || !userData || !userPoints) return;
    const htno = currentUser.email.split("@")[0];
    const currentUserInfo = userData[htno];
    const currentUserPoints = userPoints[htno];
  }, [currentUser, userData, userPoints]);

  useEffect(() => {
    const merged = Object.entries(userData)
      .filter(([_, user]) => user.Verified === true)
      .map(([htno, user]) => {
        const points = userPoints[htno]?.Points ?? 0;
        if (points < 0) return null;
        return {
          HallTicketNumber: htno,
          Name: user.Name || "Unknown",
          Year: user.Year || "N/A",
          Points: points,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.Points - a.Points);

    setDashboardData(ranked);
  }, [userData, userPoints]);

  return (
    <DataContext.Provider
      value={{
        userData,
        userPoints,
        examDetails,
        dashboardData,
        combinedUserData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;