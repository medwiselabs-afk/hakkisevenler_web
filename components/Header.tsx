import { getSession } from "@/lib/auth";
import TopTicker from "./TopTicker";
import UtilityBar from "./UtilityBar";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const session = await getSession();
  return (
    <>
      <TopTicker />
      <UtilityBar loggedIn={!!session} />
      <HeaderClient loggedIn={!!session} />
    </>
  );
}
