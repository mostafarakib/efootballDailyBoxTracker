import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/UI/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/UI/popover";

function UserInfoDropdown({ children, user }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="w-8 h-8 cursor-pointer border">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-64">{children}</PopoverContent>
    </Popover>
  );
}

export default UserInfoDropdown;
