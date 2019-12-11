import React from "react";
import Compose from "../Compose";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Message from "../Message";
import moment from "moment";

import "./MessageList.css";

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.renderMessages = this.renderMessages.bind(this);
  }

  renderMessages() {
    let i = 0;
    let messageCount = this.props.currentMessages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = this.props.currentMessages[i - 1];
      let current = this.props.currentMessages[i];
      let next = this.props.currentMessages[i + 1];
      let isMine = current.author === this.props.currentUser.username;
      let currentMoment = moment(current.timeStamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timeStamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false;
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timeStamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  render() {
    return this.props.selectedUser ? (
      <div className="message-list">
        <div className="toolbar">
          <div className="left-items"></div>
          <h1 className="toolbar-title">{`Conversation with ${this.props.selectedUser}`}</h1>
          <div className="right-items">
            <i
              className={`toolbar-button ion-ios-information-circle-outline`}
            />
          </div>
        </div>
        <div className="message-list-container">{this.renderMessages()}</div>

        <Compose submitMessage={this.props.submitMessage} />
      </div>
    ) : null;
  }
}
