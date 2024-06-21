interface CommunityData {
  owner: { username: string };
  name: string;
  description?: string;
  picturePath?: string;
  members: { username: string }[];
}

export default CommunityData;
