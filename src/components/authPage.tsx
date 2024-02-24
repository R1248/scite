import Image from "next/image";
import Logo from "../../public/logo.png";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const AuthPage = () => {
  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center">
      <Image src={Logo} alt="logo" width={192} height={192} />
      <h1 className="mt-6 text-6xl">SCITE SIMULATOR</h1>
      <h2 className="mb-20 mt-1 text-2xl">START YOUR STOCK MARKET JOURNEY</h2>
      <button
        className="mb-4 flex flex-row items-center justify-center rounded bg-blue-500 p-4 text-left text-xl text-white hover:bg-blue-600"
        onClick={() => void signIn()}
      >
        <FaGoogle className="color-white text-2xl" />
        <p className="ml-4 text-2xl">Sign in with Google</p>
      </button>
    </div>
  );
};

export default AuthPage;
