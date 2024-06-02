import Avatar from "@/components/Avatar";
import React from "react";

export default function AvatarWithName({ username }) {
  return (
    <div className="flex flex-row items-center space-x-2">
      <Avatar username={username} />
      <span>{username}</span>
    </div>
  );
}
