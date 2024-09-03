"use client";

import { UserButton } from "@clerk/nextjs";
import { BriefcaseBusiness } from "lucide-react";

const UserMenu = () => {
  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.post("/api/user", {
  //       sessionId,
  //     });

  //     console.log(data);
  //   })();
  // }, []);

  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="My Jobs"
          labelIcon={<BriefcaseBusiness size={15} />}
          href="/my-jobs"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserMenu;
