import { TimeStamp } from "./global";

namespace UserTypes {
  export interface Keys {
    email: string;
    username: string;
    password: string;
  }

  export interface Info {
    picturePath: string;
    about: string;
    karma: number;
  }

  export type Model = Keys & Partial<Info> & Partial<TimeStamp>;

  export type ModelResponse = Omit<Model, "password">;
}

export default UserTypes;