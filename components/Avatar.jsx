import React from "react";
import { Avatar as AvatarUI, AvatarFallback } from "@/components/ui/avatar";

function Avatar({ username }) {
  return (
    <div>
      <AvatarUI>
        <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
      </AvatarUI>
    </div>
  );
}

export default Avatar;
