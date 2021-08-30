import { Action, action } from "easy-peasy";
import { v4 as uuidv4} from "uuid";

export type genderType = 'M' | 'F';
 
export interface IUserModel {
  id: string;
  name: string;
  age: number;
  gender: genderType;
}

export interface IUsersModel {
  newUser: IUserModel;
  users: IUserModel[];
  add: Action<IUsersModel, IUserModel>;
  update: Action<IUsersModel, IUserModel>;
  remove: Action<IUsersModel, string>;
}

const users: IUsersModel = {
  newUser: { id: '', name: '', age: 10, gender: 'M' },
  users: [ 
    { id: '1', name: 'user1', age: 30, gender: 'M' },
    { id: '2', name: 'user2', age: 35, gender: 'M' },
    { id: '3', name: 'user3', age: 33, gender: 'F' }
  ],
  add: action((state, user) => {
    user.id = uuidv4()
    state.users = [...state.users, user]
  }),
  remove: action((state, id: string) => { 
    state.users = state.users.filter(mem => mem.id !== id) 
  }),
  update: action((state, user: IUserModel) => {
    state.users.map((mem: IUserModel) => {
      if (mem.id === user.id) {
        mem.name = user.name;
        mem.age = user.age;
        mem.gender = user.gender;
      }
      return state.users
    })
  })
};

export default users;