"use client";
import { TicketContext } from "@/app/ticket-provider";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import Comment from "../Comment";
import ComposeComment from "../ComposeComment";
import AvatarWithName from "../AvatarWithName";

function Page({ params }) {
  const [ticketsState, setTicketsState] = useContext(TicketContext);
  const [activeTextareaId, setActiveTextareaId] = useState(null);
  const [ticket] = ticketsState.filter((ticket) => ticket.id === +params.id);
  const [text, setText] = useState(ticket?.description);

  if (!ticket) return <div>Not found</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    ticket.description = text;
    setActiveTextareaId(null);
    setTicketsState([...ticketsState]);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setActiveTextareaId(null);
    setText(ticket.description);
  };

  const updatePriority = (value) => {
    ticket.priority = value;
    setTicketsState([...ticketsState]);
  };

  const updateStatus = (value) => {
    ticket.status = value;
    setTicketsState([...ticketsState]);
  };

  const assignMe = (username) => {
    ticket.assignedAgent = username; // Placeholder until login is implemented
    setTicketsState([...ticketsState]);
  };

  return (
    <div className="flex flex-col p-4 space-y-4 justify-center mx-auto w-fit">
      <div className="p-2">
        <div className="">
          <h1 className="text-2xl font-bold ">
            {ticket.title} <span className="font-thin">#{ticket.id}</span>
          </h1>
        </div>
        <p className="">
          <span className="italic font-bold">{ticket.requester}</span> Started
          this conversation
        </p>
      </div>

      <div className="flex sm:flex-row md:flex-nowrap flex-wrap space-y-7 md:space-y-0 md:space-x-7">
        {/* LEFT SIDE */}
        <div className="w-full md:w-[740px]">
          <Card className="w-full mb-12">
            <CardHeader className="flex flex-row justify-between">
              <AvatarWithName username={ticket.requester} />

              <Pencil
                size={20}
                onClick={() => setActiveTextareaId("description")}
                className="hover:cursor-pointer"
              />
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Textarea
                      className="text-base"
                      value={text}
                      disabled={activeTextareaId !== "description"}
                      id={"description"}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <div
                      className={`flex flex-row justify-end space-x-2 ${
                        activeTextareaId !== "description" ? "hidden" : ""
                      }`}
                    >
                      <Button
                        className="h-fit"
                        variant="outline"
                        onClick={(e) => cancelEdit(e)}
                      >
                        Cancel
                      </Button>{" "}
                      <Button
                        onClick={(e) => handleSubmit(e)}
                        className="h-fit "
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="font-bold p-3">
            {ticket.comments ? ticket.comments?.length : "0"} Comments
          </p>

          <div className="space-y-5">
            {ticket.comments?.map((comment) => (
              <Comment comment={comment} ticket={ticket} key={comment.id} />
            ))}
          </div>
          <ComposeComment ticket={ticket} />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col w-full min-w-72 md:w-72 space-y-3">
          {ticket.assignedAgent !== "Admin" ? (
            <Button
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                assignMe("Admin");
              }}
            >
              Assign Me
            </Button>
          ) : (
            <Button
              className="w-full"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                assignMe("");
              }}
            >
              Unassign Me
            </Button>
          )}

          <Card className="divide-y divide-solid">
            <CardContent>
              <div className="space-y-2 p-2">
                <div>
                  <Label>Priority</Label>
                  <Select
                    value={ticket.priority}
                    onValueChange={(value) => updatePriority(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>

            <CardContent>
              <div className="space-y-2 p-2">
                <Label>Status</Label>
                <Select
                  value={ticket.status}
                  onValueChange={(value) => updateStatus(value)}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={ticket.status}
                      defaultValue={ticket.status}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardContent>
              <div className="flex flex-col space-y-2 p-2">
                <Label>Assigned Agent</Label>
                <span className="font-bold">{ticket.assignedAgent}</span>
              </div>
            </CardContent>
            <CardContent>
              <div className="flex flex-col space-y-2 p-2">
                <Label>Created On</Label>
                <span className="font-bold">
                  {ticket.date} @ {ticket.time}
                </span>
              </div>
            </CardContent>
            <CardContent>
              <div className="flex flex-col space-y-2 p-2">
                <Label>Resolved On</Label>
                {ticket.resolutionDate ? (
                  <span className="font-bold">{ticket.resolutionDate}</span>
                ) : (
                  <span className="italic text-sm text-gray-600">N/A</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
