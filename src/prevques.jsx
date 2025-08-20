import React from "react";

// =====================
// Very Short Questions
// =====================
export const VeryShortQuestions = [
  {
    question: "What is Android Operating System?",
    answer:
      "Android Operating System is a Linux-based open-source operating system developed by Google for smartphones, tablets, and other mobile devices.",
    years: [2023, 2025],
  },
  {
    question: "What is Object?",
    answer:
      "An object is an instance of a class that contains data (attributes) and functions (methods) to represent and manipulate real-world entities.",
    years: [2024, 2025],
  },
  {
    question: "When does the on create() activity occur?",
    answer: "The onCreate() activity occurs when an activity is first created in Android.",
    years: [2024, 2025],
  },
  {
    question: "What is the function of relative layout?",
    answer:
      "The function of RelativeLayout is to arrange UI elements relative to each other or to the parent layout in Android.",
    years: [2023, 2025],
  },
  {
    question: "What does Grid View mean?",
    answer:
      "GridView is a layout in Android that displays items in a two-dimensional scrollable grid of rows and columns.",
    years: [2025],
  },
  {
    question: "What does API mean?",
    answer:
      "API (Application Programming Interface) is a set of rules and tools that allows different software applications to communicate with each other.",
    years: [2023, 2024, 2025],
  },
  {
    question: "What is XML layout?",
    answer:
      "An XML layout is a file in Android that defines the user interface (UI) design of an app using XML tags (like TextView, Button, LinearLayout).",
    years: [2024, 2025],
  },
];

// =====================
// Short Questions
// =====================
export const ShortQuestions = [
  {
    question: "Describe the native apps.",
    answer:
      "Native apps are mobile applications developed specifically for a particular operating system (like Android or iOS) using its own programming languages and tools. They provide high performance, better user experience, and can directly access device features like camera, GPS, or contacts.",
    years: [2023, 2025],
  },
  {
    question: "Describe the Activity Lifecycle.",
    answer:
      "The Activity Lifecycle in Android describes the stages an activity goes through from creation to destruction. The main stages are:\n" +
      "1. onCreate() – Activity is created.\n" +
      "2. onStart() – Activity becomes visible.\n" +
      "3. onResume() – Activity comes to the foreground and interacts with the user.\n" +
      "4. onPause() – Activity is partially hidden, user can’t interact fully.\n" +
      "5. onStop() – Activity is completely hidden.\n" +
      "6. onDestroy() – Activity is destroyed and removed from memory.",
    years: [2024, 2025],
  },
  {
    question: "Write the navigation elements.",
    answer:
      "The main navigation elements in Android are:\n" +
      "1. Buttons – To move between screens.\n" +
      "2. Menus – Options for navigation (Options Menu, Context Menu).\n" +
      "3. Navigation Drawer – Side panel for app-wide navigation.\n" +
      "4. Tabs – Switch between different sections.\n" +
      "5. Action Bar / Toolbar – Provides back button and navigation actions.\n" +
      "6. Bottom Navigation – Quick access to top-level destinations.",
    years: [2023, 2025],
  },
  {
    question: "What do HTTP and HTTPS mean?",
    answer:
      "HTTP (HyperText Transfer Protocol): A protocol used by browsers and servers to transfer data over the internet.\n\n" +
      "HTTPS (HyperText Transfer Protocol Secure): The secure version of HTTP, encrypting data to protect it from hackers and unauthorized access.",
    years: [2024, 2025],
  },
];

// =====================
// Broad Questions
// =====================
export const BroadQuestions = [
  {
    question: "Write about Intent and Intent Filter.",
    answer:
      "Intents and Intent Filters are key components in Android for communication between app components.\n\n" +
      "Intent: A message object carrying a request for an action.\n" +
      "Intent Filter: Declares which types of intents a component can handle, defined in the manifest.",
    years: [2023, 2025],
  },
  {
    question: "What is JSON Parsing and why is it important?",
    answer:
      "JSON parsing is the process of converting JSON data into usable objects in programming languages. It allows apps to exchange data with servers and APIs efficiently.",
    years: [2024, 2025],
  },
  {
    question: "What is the Android Activity Lifecycle?",
    answer:
      "The Android Activity Lifecycle describes how an activity is created, displayed, paused, stopped, and destroyed. Key methods include onCreate(), onStart(), onResume(), onPause(), onStop(), and onDestroy(). Understanding it ensures stable and memory-efficient apps.",
    years: [2025],
  },
  {
    question: "Give a brief description of Image View and Image Switcher.",
    answer:
      "ImageView: Displays a single image, supports scaling and adjustments.\n" +
      "ImageSwitcher: Switches between images with animations using two ImageViews internally. Useful for slideshows and galleries.",
    years: [2023, 2025],
  },
];

export default {
  VeryShortQuestions,
  ShortQuestions,
  BroadQuestions,
};