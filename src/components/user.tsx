import React, { FC } from "react";
import { IUserModel } from "../model/users";
import "./App.css";

export interface UserProps {
  user: IUserModel;
  callback: (id: string) => void;
}

const User: FC<UserProps> = ({ user, callback }) => {
  return (
    <tr key={user.id} onClick={() => callback(user.id)}>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.gender}</td>
    </tr>
  );
};

export default User;
