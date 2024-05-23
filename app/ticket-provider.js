"use client";
import { createContext, useState } from "react";

const tickets = [
  {
    id: 1,
    requester: "Joey",
    title: "Printer is jammed",
    description:
      "Every time I try and print, I get error messages saying that printer is jammed.",
    date: "20/05/2024",
    status: "Open",
    priority: "Medium",
    resolutionDate: "",
    assignedAgent: "Admin",
    comments: [
      {
        id: 1,
        author: "Admin",
        date: "20/05/2024",
        text: "Issue noted, will check the printer soon.",
      },
      {
        id: 2,
        author: "Admin",
        date: "21/05/2024",
        text: "Paper jam cleared, testing the printer now.",
      },
      {
        id: 3,
        author: "Joey",
        date: "21/05/2024",
        text: "Still getting error messages, please check again.",
      },
      {
        id: 4,
        author: "Admin",
        date: "22/05/2024",
        text: "Replaced paper, testing again.",
      },
      {
        id: 5,
        author: "Joey",
        date: "22/05/2024",
        text: "Working fine now, thanks!",
      },
    ],
  },
  {
    id: 2,
    requester: "Rachel",
    title: "Cannot access email",
    description:
      "I am unable to access my email account. It keeps asking for a password reset.",
    date: "18/05/2024",
    status: "In Progress",
    priority: "High",
    resolutionDate: "",
    assignedAgent: "Monica",
    comments: [
      {
        id: 6,
        author: "Monica",
        date: "18/05/2024",
        text: "Investigating the password reset issue.",
      },
      {
        id: 7,
        author: "Rachel",
        date: "18/05/2024",
        text: "This is urgent, I need access ASAP.",
      },
      {
        id: 8,
        author: "Monica",
        date: "19/05/2024",
        text: "Requested password reset from IT admin.",
      },
      {
        id: 9,
        author: "Admin",
        date: "19/05/2024",
        text: "Reset done, please try logging in now.",
      },
      {
        id: 10,
        author: "Rachel",
        date: "19/05/2024",
        text: "Access restored, thank you!",
      },
    ],
  },
  {
    id: 3,
    requester: "Chandler",
    title: "Computer running slow",
    description:
      "My computer has been running extremely slow for the past week.",
    date: "15/05/2024",
    status: "Open",
    priority: "Low",
    resolutionDate: "",
    assignedAgent: "Ross",
    comments: [
      {
        id: 11,
        author: "Ross",
        date: "16/05/2024",
        text: "Scheduled a check-up for the computer.",
      },
      {
        id: 12,
        author: "Chandler",
        date: "16/05/2024",
        text: "It's getting worse, need a fix soon.",
      },
      {
        id: 13,
        author: "Ross",
        date: "17/05/2024",
        text: "Running diagnostic tests.",
      },
      {
        id: 14,
        author: "Ross",
        date: "18/05/2024",
        text: "Found some malware, starting cleanup.",
      },
      {
        id: 15,
        author: "Chandler",
        date: "18/05/2024",
        text: "Thanks, it's running better now.",
      },
    ],
  },
  {
    id: 4,
    requester: "Monica",
    title: "Software installation required",
    description:
      "I need the latest version of Photoshop installed on my workstation.",
    date: "17/05/2024",
    status: "Resolved",
    priority: "Medium",
    resolutionDate: "19/05/2024",
    assignedAgent: "Chandler",
    comments: [
      {
        id: 16,
        author: "Chandler",
        date: "17/05/2024",
        text: "Started Photoshop installation.",
      },
      {
        id: 17,
        author: "Monica",
        date: "18/05/2024",
        text: "Any update on the installation?",
      },
      {
        id: 18,
        author: "Chandler",
        date: "18/05/2024",
        text: "Almost done, will notify you shortly.",
      },
      {
        id: 19,
        author: "Chandler",
        date: "19/05/2024",
        text: "Installation completed successfully.",
      },
      {
        id: 20,
        author: "Monica",
        date: "19/05/2024",
        text: "Great, it's working perfectly now.",
      },
    ],
  },
  {
    id: 5,
    requester: "Phoebe",
    title: "Unable to connect to VPN",
    description: "I can't connect to the VPN when working from home.",
    date: "19/05/2024",
    status: "Open",
    priority: "High",
    resolutionDate: "",
    assignedAgent: "Joey",
    comments: [
      {
        id: 21,
        author: "Joey",
        date: "19/05/2024",
        text: "Checking VPN settings and configuration.",
      },
      {
        id: 22,
        author: "Phoebe",
        date: "19/05/2024",
        text: "This is urgent, I have a meeting soon.",
      },
      {
        id: 23,
        author: "Joey",
        date: "20/05/2024",
        text: "Restarted VPN server, please try connecting again.",
      },
      {
        id: 24,
        author: "Phoebe",
        date: "20/05/2024",
        text: "Still can't connect, need further assistance.",
      },
      {
        id: 25,
        author: "Admin",
        date: "20/05/2024",
        text: "Checking network settings from our end.",
      },
    ],
  },
  {
    id: 6,
    requester: "Ross",
    title: "Forgotten password",
    description: "I forgot the password to my computer. Need a reset.",
    date: "20/05/2024",
    status: "Resolved",
    priority: "Low",
    resolutionDate: "20/05/2024",
    assignedAgent: "Phoebe",
    comments: [
      {
        id: 26,
        author: "Phoebe",
        date: "20/05/2024",
        text: "Password reset completed.",
      },
      {
        id: 27,
        author: "Ross",
        date: "20/05/2024",
        text: "Thanks, I can log in now.",
      },
      { id: 28, author: "Phoebe", date: "20/05/2024", text: "You're welcome!" },
    ],
  },
  {
    id: 7,
    requester: "Gunther",
    title: "Coffee machine not working",
    description:
      "The coffee machine in the break room is not working. Displays an error code.",
    date: "18/05/2024",
    status: "Open",
    priority: "Medium",
    resolutionDate: "",
    assignedAgent: "Rachel",
    comments: [
      {
        id: 29,
        author: "Rachel",
        date: "18/05/2024",
        text: "Noted the error code, looking up the manual.",
      },
      {
        id: 30,
        author: "Gunther",
        date: "18/05/2024",
        text: "This is urgent, the team needs coffee!",
      },
      {
        id: 31,
        author: "Rachel",
        date: "19/05/2024",
        text: "Contacted the service company for repair.",
      },
      {
        id: 32,
        author: "Service Tech",
        date: "19/05/2024",
        text: "Scheduled repair for tomorrow.",
      },
      {
        id: 33,
        author: "Rachel",
        date: "20/05/2024",
        text: "Repair completed, coffee machine is working.",
      },
    ],
  },
  {
    id: 8,
    requester: "Janice",
    title: "Phone line issues",
    description:
      "There's a lot of static on the office phone line. Hard to hear clients.",
    date: "16/05/2024",
    status: "In Progress",
    priority: "High",
    resolutionDate: "",
    assignedAgent: "Chandler",
    comments: [
      {
        id: 34,
        author: "Chandler",
        date: "16/05/2024",
        text: "Investigating the phone line issue.",
      },
      {
        id: 35,
        author: "Janice",
        date: "16/05/2024",
        text: "Please fix this ASAP, it's affecting my work.",
      },
      {
        id: 36,
        author: "Chandler",
        date: "17/05/2024",
        text: "Contacted phone service provider for support.",
      },
      {
        id: 37,
        author: "Service Provider",
        date: "17/05/2024",
        text: "Technician scheduled to visit tomorrow.",
      },
      {
        id: 38,
        author: "Chandler",
        date: "18/05/2024",
        text: "Technician fixed the line, should be clear now.",
      },
    ],
  },
  {
    id: 9,
    requester: "Mike",
    title: "Projector bulb needs replacement",
    description:
      "The bulb in the conference room projector needs to be replaced.",
    date: "15/05/2024",
    status: "Resolved",
    priority: "Low",
    resolutionDate: "16/05/2024",
    assignedAgent: "Monica",
    comments: [
      {
        id: 39,
        author: "Monica",
        date: "15/05/2024",
        text: "Ordered new projector bulb.",
      },
      {
        id: 40,
        author: "Mike",
        date: "15/05/2024",
        text: "Thanks, we need it for tomorrow's meeting.",
      },
      {
        id: 41,
        author: "Monica",
        date: "16/05/2024",
        text: "Replaced projector bulb, tested successfully.",
      },
      {
        id: 42,
        author: "Mike",
        date: "16/05/2024",
        text: "Great, it's working perfectly.",
      },
    ],
  },
  {
    id: 10,
    requester: "Emily",
    title: "Access to shared drive",
    description: "I need access to the shared drive for the marketing team.",
    date: "19/05/2024",
    status: "Open",
    priority: "Medium",
    resolutionDate: "",
    assignedAgent: "Ross",
    comments: [
      {
        id: 43,
        author: "Ross",
        date: "19/05/2024",
        text: "Requesting access permissions from IT.",
      },
      {
        id: 44,
        author: "Emily",
        date: "19/05/2024",
        text: "Need this access to complete my tasks.",
      },
      {
        id: 45,
        author: "Admin",
        date: "20/05/2024",
        text: "Permissions granted, access should be available now.",
      },
      {
        id: 46,
        author: "Emily",
        date: "20/05/2024",
        text: "Confirmed, I have access now. Thank you!",
      },
    ],
  },
];

export const TicketContext = createContext();

export default function TicketProvider({ children }) {
  const [ticketsState, setTicketsState] = useState(tickets);
  return (
    <TicketContext.Provider value={[ticketsState, setTicketsState]}>
      {children}
    </TicketContext.Provider>
  );
}
