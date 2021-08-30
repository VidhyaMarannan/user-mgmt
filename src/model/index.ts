import users, { IUsersModel} from "./users";

export interface IStoreModel {
  users: IUsersModel;
};

const model: IStoreModel = {
  users
};

export default model;