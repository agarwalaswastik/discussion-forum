interface UserData {
  email: string;
  username: string;
  picturePath?: string | null | undefined;
  about?: string | null | undefined;
  karma: number;
  createdAt: string;
  updatedAt: string;
}

export default UserData;
