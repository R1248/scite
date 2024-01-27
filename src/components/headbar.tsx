import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { useState, useEffect, useRef, type FC } from "react";
import { TbLogout } from "react-icons/tb";

const Headbar = () => {
  const [profileSettings, setProfileSettings] = useState(false);
  const profleButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative z-20 flex w-full min-w-full flex-row items-center border-b border-solid border-black bg-white">
      <Image src={Logo} alt="logo" width={64} height={64} />
      <h1 className="invisible mt-1 text-3xl sm:visible">SCITE SIMULATOR</h1>
      <button
        ref={profleButtonRef}
        className="ml-auto mr-2 text-5xl"
        onClick={() => setProfileSettings(!profileSettings)}
      >
        <HiOutlineUserCircle />
      </button>
      {profileSettings ? (
        <ProfileSettings
          setProfileSettings={setProfileSettings}
          safeRef={profleButtonRef}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

type ProfileSettingsProps = {
  setProfileSettings: (b: boolean) => void;
  safeRef: React.RefObject<HTMLButtonElement>;
};

const ProfileSettings: FC<ProfileSettingsProps> = ({
  setProfileSettings,
  safeRef,
}) => {
  const { data: sessionData } = useSession();
  const profileSettingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target instanceof Node) {
        if (
          !profileSettingsRef.current?.contains(e.target) &&
          !safeRef.current?.contains(e.target)
        ) {
          setProfileSettings(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      ref={profileSettingsRef}
      className="absolute right-2 top-14 w-60 rounded border border-solid border-gray-200 bg-white p-1 text-left text-base shadow-sm"
    >
      <button className="w-full rounded p-1 text-left hover:bg-gray-100">
        <IoSettingsOutline className="mx-1 mb-[2px] inline" />
        My Account
      </button>
      <button
        className="w-full rounded p-1 text-left hover:bg-gray-200"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        <TbLogout className="mx-1 mb-[2px] inline" />
        {sessionData ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
};

export default Headbar;
