import React from "react";
import "./ConversationSearch.css";

export default function ConversationSearch(props) {
  console.log(props);
  return (
    <div className="conversation-search">
      <input
        type="search"
        className="conversation-search-input"
        placeholder="Filter users"
        onChange={e => props.textChange(e.target.value)}
        value={props.searchText}
      />
    </div>
  );
}
