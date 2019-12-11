import React, { useState, useEffect } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Usersdropdown from "./Usersdropdown";

import "./ConversationList.css";

export default function ConversationList(props) {
  const currentUsername = props.currentUser.username;

  let messagesWithCurrentUser = props.messages.filter(
    message => message.to == currentUsername || message.from == currentUsername
  );

  let allUsersInteractedWith = {};

  messagesWithCurrentUser.forEach(message => {
    const otherUsername =
      message.to == currentUsername ? message.from : message.to;

    if (
      allUsersInteractedWith[otherUsername] &&
      message.timeStamp > allUsersInteractedWith[otherUsername].timeStamp
    ) {
      allUsersInteractedWith[otherUsername].text = message.text;
      allUsersInteractedWith[otherUsername].name = otherUsername;
      allUsersInteractedWith[otherUsername].photo =
        "https://randomuser.me/api/portraits/women/29.jpg";
    } else {
      allUsersInteractedWith[otherUsername] = {};
      allUsersInteractedWith[otherUsername].text = message.text;
      allUsersInteractedWith[otherUsername].name = otherUsername;
      allUsersInteractedWith[otherUsername].photo =
        "https://randomuser.me/api/portraits/women/29.jpg";
    }
  });

  const sortedRecentMessages = Object.values(allUsersInteractedWith).sort(
    (a, b) => b.timeStamp - a.timeStamp
  );

  return (
    <div className="conversation-list">
      <div className="toolbar">
        <div className="left-items"></div>
        <h1 className="toolbar-title">Messenger</h1>
        <div className="right-items">
          <Usersdropdown
            setSelectedUser={props.setSelectedUser}
            usersOnline={props.usersOnline}
            currentUsername={currentUsername}
          />
        </div>
      </div>
      <ConversationSearch />
      {sortedRecentMessages.map(conversation => (
        <ConversationListItem
          key={conversation.name}
          data={conversation}
          usersOnline={props.usersOnline}
          setSelectedUser={props.setSelectedUser}
        />
      ))}
      {/* sortedRecentMessages.length > 0 ? (
        sortedRecentMessages.map(conversation => (
          <ConversationListItem
            key={conversation.name}
            data={conversation}
            setSelectedUser={this.props.setSelectedUser}
          />
        ))
      ) : this.props.selectedUser ? (
        <ConversationListItem
          key={this.props.selectedUser.username}
          data={null}
          setSelectedUser={this.props.setSelectedUser}
        />
      ) : null */}
    </div>
  );
}
