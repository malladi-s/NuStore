import React from "react";
const io = require("socket.io-client");

import { incrementLoader, decrementLoader } from "../../../actions/loader";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import "./Messenger.css";

// import socket from "../../../socket";

function Message(from, to, text, timeStamp, id) {
  this.from = from;
  this.to = to;
  this.text = text;
  this.timeStamp = timeStamp;
  this.id = id || new Date().getTime();
}

export default class Messenger extends React.Component {
  constructor(props) {
    super(props);

    let username = props.history.location.state ? props.history.location.state.sellerName : null;

    this.state = {
      usersOnline: [],
      messages: [],
      currentMessages: [],
      selectedUser: username || null
    };

    this.setSelectedUser = this.setSelectedUser.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  async componentDidMount() {
    let selectedUser = this.state.selectedUser;
    await fetch("/api/messages/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then(json => {
        if (json == null || (json && json.error)) {
          toast.error("Failed to connect to chat api.");
        } else {
          this.socket = io.connect(`http://localhost:${process.env.port}`, {
            query: `username=${this.props.user.username}`
          });

          // Listen for messages from the server
          this.socket.on("server:message", message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          });

          this.socket.on("listOfOnlineUsers", listOfOnlineUsers => {
            this.setState({
              usersOnline: listOfOnlineUsers
            });
          });
          this.setState(
            {
              messages: [...json.messages],
              selectedUser: selectedUser || null
            },
            () => this.setSelectedUser(this.state.selectedUser)
          );
        }
      })
      .catch(error => {
        toast.error("Failed to connect to chat api.");
      })
      .finally(function () { });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages != this.state.messages) {
      if (this.state.selectedUser) {
        this.setSelectedUser(this.state.selectedUser);
      }
    }
  }

  submitMessage(message) {
    const messageObject = new Message(
      this.props.user.username,
      this.state.selectedUser,
      message,
      new Date().getTime()
    );

    this.socket.emit("client:message", messageObject);

    this.setState(
      {
        messages: [...this.state.messages, messageObject]
      },
      () => this.setSelectedUser(this.state.selectedUser)
    );
  }

  sendHandler(message) {
    const messageObject = new Message(
      this.props.user.username,
      "invictusmaneo",
      message,
      new Date().getTime()
    );

    // Emit the message to the server
    this.socket.emit("client:message", messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  componentWillUnmount() {
    this.socket.close();
  }

  setSelectedUser(userName) {
    this.setState({
      selectedUser: userName,
      currentMessages: this.state.messages
        .filter(
          message =>
            (message.to == userName &&
              message.from == this.props.user.username) ||
            (message.to == this.props.user.username && message.from == userName)
        )
        .map((message, index) => {
          return {
            ...message,
            id: index,
            author: message.from,
            message: message.text
          };
        })
    });
  }

  render() {
    const { user } = this.props;
    const { selectedUser } = this.state;
    return (
      <div className="messenger">
        {/* <Toolbar
            title="Messenger"
            leftItems={[
              <ToolbarButton key="cog" icon="ion-ios-cog" />
            ]}
            rightItems={[
              <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
            ]}
          /> */}
        {/* <Toolbar
            title="Conversation Title"
            rightItems={[
              <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
              <ToolbarButton key="video" icon="ion-ios-videocam" />,
              <ToolbarButton key="phone" icon="ion-ios-call" />
            ]}
          /> */}

        <div className="scrollable sidebar">
          <ConversationList
            setSelectedUser={this.setSelectedUser}
            selectedUser={selectedUser}
            currentUser={user}
            messages={this.state.messages}
            usersOnline={this.state.usersOnline}
          />
        </div>
        <div id="messages-list" className="scrollable content">
          <MessageList
            submitMessage={this.submitMessage}
            selectedUser={selectedUser}
            currentUser={user}
            currentMessages={this.state.currentMessages}
            usersOnline={this.state.usersOnline}
          />
        </div>
      </div>
    );
  }
}
