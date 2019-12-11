import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from "reactstrap";

const Usersdropdown = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        id="addOnlineFriend"
        tag="i"
        className={`toolbar-button ion-ios-add-circle-outline`}
      ></DropdownToggle>
      <UncontrolledTooltip placement="right" target="addOnlineFriend">
        Select a person to chat with
      </UncontrolledTooltip>
      <DropdownMenu>
        {props.usersOnline.map(users =>
          props.currentUsername != users ? (
            <DropdownItem
              onClick={() => props.setSelectedUser(users)}
              key={users}
            >
              {users}
            </DropdownItem>
          ) : null
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Usersdropdown;
