import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa6";
import { useSelector } from "react-redux";
export default function Header() {
  const path = useLocation().pathname;
  const details = useSelector((state) => state.user.user);
  console.log(details,'details')
  if(!details){
    console.log("no details")
  }
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className=" self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg px-5 py-1 text-white">
          Nihal&apos;s
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button color="gray" className="w-12 h-10 lg:hidden" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 lg:order-2">
        <Button color="gray" className="w-12 h-10 hidden sm:inline" pill>
          <FaMoon />
        </Button>

        {details.currentUser? (
          <Dropdown
          inline
            arrowIcon={false}
            label={<Avatar rounded img={details.currentUser?.profilePicture} />}
          >
            <Dropdown.Header>
              <span className=" block text-sm dark:text-white">
                {details.currentUser?.username}
              </span>
              <span className="text-sm font-medium dark:text-white">
                {details.currentUser?.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider/>
            <DropdownItem>
              Sign Out
            </DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue">Sign In</Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
