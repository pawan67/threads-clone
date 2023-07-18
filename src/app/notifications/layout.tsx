import NotificationsNav from "@/components/notifications/NotificationsNav";
import { buttonVariants } from "@/components/ui/button";

import React from "react";

function NotificationsLayout({ children }: { children: React.ReactNode }) {
    
  return (
    <>
      <NotificationsNav />
      {children}
    </>
  );
}

export default NotificationsLayout;
