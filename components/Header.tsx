import { getSession } from "@/lib/auth";
import AnnouncementBar from "./AnnouncementBar";
import UtilityBar from "./UtilityBar";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const session = await getSession();
  return (
    <>
      <AnnouncementBar />
      <UtilityBar loggedIn={!!session} />
      <HeaderClient loggedIn={!!session} />
    </>
  );
}
