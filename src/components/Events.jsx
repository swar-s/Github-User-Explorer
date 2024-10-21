import React from "react";
import { format } from "timeago.js";

const Events = ({ events }) => {
  return (
    <>
      {events?.map((event, idx) => (
        <div key={idx} className="flex gap-4 items-center">
          <img src={event.actor?.avatar_url} className="w-16 rounded-full" />
          <h2 className="break-words">
            {event?.login} {event?.type}
            <br />
            {event?.repo_name}
            <br />
            <span className="text-sm">
              {format(event?.created_at)}
            </span>
          </h2>
        </div>
      ))}
    </>
  );
};

export default Events;
