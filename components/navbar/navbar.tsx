import Image from "next/image";
import LINK from "next/link";
import ScoreButton from "./buttons/scoreButton";

export const Navbar = () => {
  const navbar = () => {
    return (
      <nav className="max-w-[1536px] flex items-center justify-between py-7 z-[999]">
        <LINK href="/">
            <Image
              src="/avobankless-logo.png"
              alt="avobankless logo"
              width="150px"
              height="36px"
            />
        </LINK>
        <ScoreButton/>
      </nav>
    );
  };

  return <>{navbar()}</>;
};