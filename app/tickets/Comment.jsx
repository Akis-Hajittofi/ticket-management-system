import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { TicketContext } from "../ticket-provider";
import { currentDate, currentTime } from "@/lib/utils";

function Comment({ comment, ticket }) {
  const [ticketsState, setTicketsState] = useContext(TicketContext);
  const [text, setText] = useState(comment.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    comment.text = text;
    setIsEditing(false);
    setTicketsState([...ticketsState]);
  };

  const handleDelete = (id) => {
    ticket.comments = ticket.comments.filter((comment) => comment.id !== id);
    setTicketsState([...ticketsState]);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setText(comment.text);
  };

  return (
    <Card className="w-[500px]">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-baseline space-x-1">
          <Avatar />
          <div className="flex flex-row items-baseline">
            <span>{comment.author}</span>
            <span className="pl-2 font-thin text-sm italic">
              - {comment.date} @ {comment.time}
            </span>
          </div>
        </div>

        <div className="flex flex-row space-x-2">
          <Pencil
            className="hover:cursor-pointer"
            size={20}
            onClick={() => setIsEditing(true)}
          />
          <Trash2
            className="hover:cursor-pointer"
            size={20}
            onClick={() => handleDelete(comment.id)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Textarea
                className="text-base"
                value={text}
                disabled={!isEditing}
                onChange={(e) => setText(e.target.value)}
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
  );
}

export default Comment;
