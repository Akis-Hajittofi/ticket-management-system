"use client";
import Avatar from "@/components/Avatar";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

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
  },
];

function Table() {
  const [ticketsState, setTicketsState] = useState(tickets);
  const handleDelete = (index) => {
    ticketsState.splice(index, 1);
    setTicketsState([...ticketsState]);
  };
  return (
    <div>
      <TableUI>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Requester</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Resolution Date</TableHead>
            <TableHead>Assigned Agent</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ticketsState.map((ticket, index) => (
            <TableRow key={index}>
              <TableCell className="font-extrabold">{ticket.id}</TableCell>
              <TableCell className="w-48">
                <div className="flex flex-row items-center space-x-2">
                  <Avatar username={ticket.requester} />
                  <span>{ticket.requester}</span>
                </div>
              </TableCell>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>
                <div className="w-48">
                  <TooltipProvider>
                    <Tooltip delayDuration={90}>
                      <TooltipTrigger className="text-left">
                        {ticket.description.substring(0, 60)}
                        {ticket.description.length > 60 && "..."}
                      </TooltipTrigger>
                      <TooltipContent>{ticket.description}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
              <TableCell>{ticket.date}</TableCell>
              <TableCell
                className={`font-extrabold w-28 ${
                  ticket.status === "Open"
                    ? "text-blue-500"
                    : ticket.status === "In Progress"
                    ? "text-amber-500"
                    : ticket.status === "Resolved"
                    ? "text-green-500"
                    : ""
                } `}
              >
                {ticket.status}
              </TableCell>
              <TableCell
                className={`font-extrabold ${
                  ticket.priority === "Low"
                    ? "text-blue-500"
                    : ticket.priority === "Medium"
                    ? "text-amber-500"
                    : ticket.priority === "High"
                    ? "text-red-500"
                    : ""
                }`}
              >
                {ticket.priority}
              </TableCell>
              <TableCell>{ticket.resolutionDate}</TableCell>
              <TableCell>
                <div className="flex flex-row items-center space-x-2">
                  <Avatar username={ticket.assignedAgent} />
                  <span>{ticket.assignedAgent}</span>
                </div>
              </TableCell>
              <TableCell>
                <div
                  className="hover:cursor-pointer"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 size={17} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableUI>
    </div>
  );
}

export default Table;
