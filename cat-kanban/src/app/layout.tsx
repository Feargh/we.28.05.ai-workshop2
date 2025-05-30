import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TaskProvider } from "@/contexts/TaskContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cat Kanban - Task Management Board",
  description: "A simple Kanban board for managing tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TaskProvider>
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}