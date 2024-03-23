import { TextInput, Button, Alert } from "flowbite-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { app } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getStorage,
  getDownloadURL,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const fileUpload = useRef();
  const [selectedImage, SetSelectedImage] = useState(null);
  const [selectedImageUrl, SetSelectedImageUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const details = useSelector((state) => state.user.user);
  console.log(imageUploadProgress, errorMessage);
  const handleFilePicker = (e) => {
    console.log(e.target.files[0], "image-file");
    const file = e.target.files[0];
    if (file) {
      SetSelectedImage(file);
      SetSelectedImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedImage) {
      console.log("upload image ...");
      uploadImage();
    }

    // rules written in the firebase storage
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
  }, [selectedImage]);
  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + selectedImage.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);
    setErrorMessage(null);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setErrorMessage("File Upload Failed (File must be < 2MB)", error);
        setImageUploadProgress(null);
        SetSelectedImage(null);
        SetSelectedImageUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          // console.log(downloadUrl, "download-url");
          // console.log(uploadTask, "upload-task");
          // console.log(uploadTask.snapshot, "uploadTask.snapshot");
          // console.log(uploadTask.snapshot.ref, "uploadTask.snapshot.ref");
          SetSelectedImageUrl(downloadUrl);
        });
      }
    );
  };

  console.log(selectedImage, selectedImageUrl);
  return (
    <div className="  flex flex-col items-center justify-center md:max-w-lg md: mx-auto p-3">
      <h1 className="text-center font-semibold text-3xl py-7 ">Profile</h1>
      <form className="flex flex-col gap-4 w-full">
        <input
          type="file"
          accept="/image/.*"
          onChange={handleFilePicker}
          hidden
          ref={fileUpload}
        />
        <div
          className="w-32 h-32 bg-red-200 rounded-full self-center shadow-md relative cursor-pointer"
          onClick={() => fileUpload.current.click()}
        >
          {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${
                imageUploadProgress >= 100 ? "" : imageUploadProgress + "%"
              }`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={selectedImageUrl || details.currentUser?.profilePicture}
            alt="user-logo"
            className={`rounded-full  ${
              imageUploadProgress && imageUploadProgress < 100 && "opacity-60"
            } border-8  border-[lightgray] w-full h-full`}
          />
        </div>
        {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
        <TextInput
          id="username"
          type="text"
          placeholder="username"
          defaultValue={details.currentUser?.username}
        />
        <TextInput
          id="email"
          type="email"
          placeholder="email"
          defaultValue={details.currentUser?.email}
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
