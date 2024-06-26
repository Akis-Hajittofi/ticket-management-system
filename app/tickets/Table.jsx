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
import React from "react";
import { useRouter } from "next/navigation";
import AvatarWithName from "./AvatarWithName";

function Table({ tickets, filter, handleDelete }) {
  const router = useRouter();

  const openTicket = (id) => {
    router.push(`/tickets/${id}`);
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
          {tickets
            .filter((ticket) => filter.priority.includes(ticket.priority))
            .filter((ticket) => filter.status.includes(ticket.status))
            .map((ticket, index) => (
              <TableRow key={ticket.id} onClick={() => openTicket(ticket.id)}>
                <TableCell className="font-extrabold">{ticket.id}</TableCell>
                <TableCell className="w-48">
                  <AvatarWithName username={ticket.requester} />
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
                        <TooltipContent
                          className={`${
                            ticket.description.length > 100 && "w-80"
                          }`}
                        >
                          {ticket.description.substring(0, 500)}
                          {ticket.description.length > 400 && "..."}
                        </TooltipContent>
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
                  {ticket.assignedAgent ? (
                    <div className="flex flex-row items-center space-x-2">
                      <Avatar username={ticket.assignedAgent} />
                      <span>{ticket.assignedAgent}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>
                  <Trash2
                    size={17}
                    className="hover:cursor-pointer"
                    onClick={(e) => {
                      handleDelete(ticket.id);
                      e.stopPropagation();
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </TableUI>
    </div>
  );
}

export default Table;
