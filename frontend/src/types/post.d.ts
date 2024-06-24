interface PostData {
  _id: string;
  author: { username: string };
  community: { name: string };
  title: string;
  contents: string;
  picturePath?: string;
  upvoters: { username: string }[];
  downvoters: { username: string }[];
  createdAt: string;
  updatedAt: string;
}

export default PostData;
