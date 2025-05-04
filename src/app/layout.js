import "./globals.css";
import Navbar from "./Navbar";
import { AuthProvider } from "./contexts/authContext";
import { DataProvider } from "./contexts/dataContext";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "SRU Coding Club",
  description: "An initiative by SR University Coding Club to foster coding, collaboration, and creativity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>
        <AuthProvider>
        <DataProvider>
            <Navbar />
            {children}
        </DataProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
