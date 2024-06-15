import { TimeStamp } from "./global";

// create namespace to avoid crowding the global namespace
namespace UserTypes {
  // essential attributes of a user
  export interface Keys {
    email: string;
    username: string;
    password: string;
  }

  // additional information about a user
  export interface Info {
    picturePath: string;
    about: string;
    karma: number;
  }

  // representation of shape of data stored in the database
  export type Model = Keys & Partial<Info> & Partial<TimeStamp>;

  // password is no longer needed if the user has been verified/logged in
  // any response that sends user data should also not contain the password
  export type ModelWithoutPassword = Omit<Model, "password">;
}

export default UserTypes;