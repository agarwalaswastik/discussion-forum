interface PostData {
  _id: string;
  author: string;
  community: string;
  title: string;
  contents: string;
  picturePath?: string;
  upvoters: string[];
  downvoters: string[];
  createdAt: string;
  updatedAt: string;
}

export default PostData;
