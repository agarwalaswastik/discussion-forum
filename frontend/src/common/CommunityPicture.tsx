interface CommunityPictureAttributes {
  className?: string;
  picturePath?: string | null | undefined;
}

export default function CommunityPicture({ className, picturePath }: CommunityPictureAttributes) {
  return <img src={`/${picturePath ?? "community.png"}`} alt="Community profile picture" className={className} />;
}
