import { Button } from "flowbite-react";
const CallToAction = () => {
  return (
    <div className="flex items-center max-w-4xl flex-col border border-teal-500 p-4 rounded-tl-2xl rounded-bl-none rounded-tr-none rounded-br-2xl  text-center  mx-auto gap-6 lg:flex-row">
      <div className="flex flex-col max-auto gap-2 flex-1 item-center ">
        <h1 className=" text-2xl self-start ">
          Want to learn more about Javascript?
        </h1>
        <p className=" text-gray-500 my-2  self-start  ">
          Checkout these resources with 100 Javascript Projects
        </p>
        <Button
          type="button"
          gradientDuoTone="purpleToPink"
          className="w-full rounded-tl-2xl rounded-bl-none rounded-tr-none  rounded-br-2xl"
        >
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            100 JavaScript Projects
          </a>
        </Button>
      </div>
      <div className="flex flex-1">
        <img
          src="https://topmate-staging.s3.ap-south-1.amazonaws.com/kYJhUW2i3Z9dNYKXuv7ymJ.png"
          className=" h-60 w-full "
          alt="javascript_img"
        />
      </div>
    </div>
  );
};

export default CallToAction;
