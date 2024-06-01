import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { currentDate, currentDateTime, currentTime } from "@/lib/utils";
import React, { useContext, useState } from "react";
import { TicketContext } from "../ticket-provider";

function ComposeComment({ ticket }) {
  const [ticketsState, setTicketsState] = useContext(TicketContext);
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    ticket.comments.push({
      id: Math.floor(Math.random() * (1999 - 100 + 1)) + 100,
      author: "Admin",
      date: currentDate(),
      time: currentTime(),
      text: text,
    });

    setIsEditing(false);
    setTicketsState([...ticketsState]);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setText("");
  };

  return (
    <div className="mt-5">
      <span className="font-bold pb-5">Add Comment:</span>
      <Card className="w-[500px]">
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-row items-center space-x-1">
            <Avatar />
            {/* Placeholder until I implement login */}
            <span>Admin</span>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Textarea
                  className="text-base"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setIsEditing(true);
                  }}
                />
                <div
                  className={`flex flex-row justify-end space-x-2 ${
                    !isEditing ? "hidden" : ""
                  }`}
                >
                  <Button
                    className="h-fit"
                    variant="outline"
                    onClick={(e) => cancelEdit(e)}
                  >
                    Cancel
                  </Button>{" "}
                  <Button onClick={(e) => handleSubmit(e)} className="h-fit ">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ComposeComment;
