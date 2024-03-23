import { TextInput, Button } from "flowbite-react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const details = useSelector((state) => state.user.user);
  return (
    <div className="  flex flex-col items-center justify-center md:max-w-lg md: mx-auto p-3">
      <h1 className="text-center font-semibold text-3xl py-7 ">Profile</h1>
      <form className="flex flex-col gap-4 w-full">
        <div className="w-32 h-32 bg-red-200 rounded-full self-center shadow-md cursor-pointer">
          <img
            src={details.currentUser.profilePicture}
            alt="user-logo"
            className="rounded-full object-cover border-8 border-[lightgray] w-full h-full"
          />
        </div>
        <TextInput
          id="username"
          type="text"
          placeholder="username"
          defaultValue={details.currentUser.username}
        />
        <TextInput
          id="email"
          type="email"
          placeholder="email"
          defaultValue={details.currentUser.email}
        />
        <TextInput id="password" type="password" placeholder="password" />
        <Button gradientDuoTone="purpleToBlue">Update</Button>
      </form>
        <div className="text-red-700 text-sm w-full flex flex-row justify-between mt-3">
          <span>Delete</span>
          <span>Sign Out</span>
        </div>
    </div>
  );
};

export default DashProfile;
