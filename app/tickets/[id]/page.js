"use client";
import { TicketContext } from "@/app/ticket-provider";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2 } from "lucide-react";
import Avatar from "@/components/Avatar";
import { Separator } from "@/components/ui/separator";

function Page({ params }) {
  const [ticketsState, setTicketsState] = useContext(TicketContext);

  const [ticket] = ticketsState.filter((ticket) => ticket.id === +params.id);
  console.log(ticket);

  if (!ticket) return <div>Not found</div>;
  const deleteComment = (id) => {
    ticket.comments = ticket.comments.filter((comment) => comment.id !== id);
    setTicketsState([...ticketsState]);
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col p-5 space-y-4 justify-center ">
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

        <div className="flex flex-row space-x-7">
          {/* LEFT SIDE */}
          <div className="">
            <Card className="w-[500px] mb-12">
              <CardHeader className="flex flex-row justify-between">
                <div className="flex flex-row items-center space-x-1">
                  <Avatar />
                  <span>{ticket.requester}</span>
                </div>

                <Pencil size={20} />
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Textarea value={ticket.description} />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <p className="font-bold p-3">{ticket.comments.length} comments</p>

            <div className="space-y-5">
              {ticket.comments.map((comment) => (
                <Card className="w-[500px]" key={comment.id}>
                  <CardHeader className="flex flex-row justify-between">
                    <div className="flex flex-row items-center space-x-1">
                      <Avatar />
                      <span>{comment.author}</span>
                    </div>

                    <div className="flex flex-row space-x-2">
                      <Pencil size={20} />
                      <Trash2
                        size={20}
                        onClick={() => deleteComment(comment.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Textarea value={comment.text} />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col w-72 space-y-3">
            <Button className="w-full">Assign Me</Button>
            <Card className="divide-y divide-solid">
              <CardContent>
                <div className="space-y-2 p-2">
                  <div>
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={ticket.priority}
                          defaultValue={ticket.priority}
                        />
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
                  <Select>
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
    </div>
  );
}

export default Page;
