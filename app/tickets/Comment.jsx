import Avatar from "@/components/Avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

function Comment({ comment }) {
  const handleDelete = (id) => {
    ticket.comments = ticket.comments.filter((comment) => comment.id !== id);
    setTicketsState([...ticketsState]);
  };
  return (
    <Card className="w-[500px]">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-1">
          <Avatar />
          <span>{comment.author}</span>
        </div>

        <div className="flex flex-row space-x-2">
          <Pencil size={20} />
          <Trash2 size={20} onClick={() => handleDelete(comment.id)} />
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
  );
}

export default Comment;
