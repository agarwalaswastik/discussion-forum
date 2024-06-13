namespace User {
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
}

export default User;