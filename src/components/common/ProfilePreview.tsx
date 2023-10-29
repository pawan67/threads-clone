import React from "react";

interface ProfilePreviewProps {
  username: string;
}

const ProfilePreview = ({ username }: ProfilePreviewProps) => {
  console.log(username);
  return <div>ProfilePreview</div>;
};

export default ProfilePreview;
