"use client";
import { FC } from "react";

interface AllNotificationsProps {
  notifications: any;
}

const AllNotifications: FC<AllNotificationsProps> = ({ notifications }) => {
  console.log(notifications);
  return <div>AllNotifications</div>;
};

export default AllNotifications;
