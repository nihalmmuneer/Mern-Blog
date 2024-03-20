import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";
const FooterComponent = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex ">
          <div className="">
            <Link
              to="/"
              className=" self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white"
            >
              <span className=" mr-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg px-5 py-1 text-white">
                Nihal&apos;s
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3  sm:gap-6 ">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  100 JS Projects
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Nihal&apos; Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="sm:flex justify-between sm:items-center">
          <div>
            <Footer.Copyright
              href="#"
              by="Nihal's Blog"
              year={new Date().getFullYear()}
            />
          </div>
          <div className="flex gap-6 sm:justify-center  sm:mt-0 mt-4">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon gref="#" icon={BsInstagram} />
            <Footer.Icon gref="#" icon={BsGithub} />
            <Footer.Icon gref="#" icon={BsTwitter} />
          </div>
        </div>
      </div>
    </Footer>
  );
};
export default FooterComponent;
