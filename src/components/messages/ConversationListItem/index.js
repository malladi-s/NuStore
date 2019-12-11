import React, { useEffect } from "react";
import shave from "shave";

import "./ConversationListItem.css";

export default function ConversationListItem(props) {
  useEffect(() => {
    shave(".conversation-snippet", 25);
  });

  const { photo, name, text } = props.data;
  const { selectedUser } = props;

  const IsUserOnline = props.usersOnline.indexOf(name) >= 0;

  let conversationClass = "";

  if (name == selectedUser) {
    conversationClass = "selected";
  }

  return (
    <div
      className={`conversation-list-item ${conversationClass}`}
      onClick={() => props.setSelectedUser(name)}
    >
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">
          {name}
          {IsUserOnline && (
            <span
              style={{
                background: "rgb(66, 183, 42)",
                borderRadius: "50%",
                display: "inline-block",
                height: "6px",
                marginLeft: "4px",
                width: "6px"
              }}
            ></span>
          )}
        </h1>
        <p className="conversation-snippet">{text || ``}</p>
      </div>
    </div>
  );
}
