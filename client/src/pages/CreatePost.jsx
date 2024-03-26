import { Select, TextInput, Button, FileInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className=" p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className=" text-3xl font-semibold text-center my-7">
        Create a post
      </h1>
      <div className="">
        <form className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <TextInput required type="text" id="title" placeholder="Title" className="flex-1" />
            <Select>
              <option value="select">Select a category</option>
              <option value="reactjs">React.js</option>
              <option value="javaScript">javaScript</option>
              <option value="redux">Redux</option>
            </Select>
          </div>
          <div className=" border-teal-500 border-4 p-3 border-dotted ">
            <div className="flex justify-between items-center">
              <FileInput type="file" accept="image/*" required/>
              <Button type="button" gradientDuoTone="purpleToBlue" outline>
                Upload image
              </Button>
            </div>
          </div>
          <ReactQuill theme="snow" placeholder="write something.." className="h-72 mb-12" required />
        <Button type="submit" gradientDuoTone="purpleToPink"className="w-full">
          Publish
        </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
