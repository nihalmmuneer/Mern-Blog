import { TextInput, Button, Alert, Modal, ModalHeader } from "flowbite-react";
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
import {
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const DashProfile = () => {
  const fileUpload = useRef();
  const dispatch = useDispatch();
  const [selectedImage, SetSelectedImage] = useState(null);
  const [selectedImageUrl, SetSelectedImageUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(null);
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
    setImageFileUploading(true);
    setUpdateError("image is uploading...");
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
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          SetSelectedImageUrl(downloadUrl);
          setFormData({ ...formData, profilePicture: downloadUrl });
          setImageFileUploading(false);
          setUpdateError(null);
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData, "formData");
  };
  const handleSubmission = async (e) => {
    console.log("hello");
    setErrorMessage(null);
    setUpdateError(null);
    setUpdateSuccess(null);
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateError("No changes made");
      setUpdateSuccess(null);
      return;
    }
    if (imageFileUploading) {
      setUpdateError("Image is Loading...");
      return;
    }
    try {
      dispatch(userUpdateStart());
      const res = await fetch(
        `/api/user/user-update/${details.currentUser?._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(userUpdateFailure(data.message));
        setUpdateError(data.message);
        setUpdateSuccess(null);
        return;
      } else {
        dispatch(userUpdateSuccess(data));
        setUpdateSuccess("Uploading the User is successful");
        setUpdateError(null);
      }
    } catch (error) {
      console.log(error);
      dispatch(userUpdateFailure(error.message));
      setUpdateError(error.message);
      setUpdateSuccess(null);
    }
  };
  const handleDelete = async () => {
  
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${details.currentUser._id}`, {
        method: "delete",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
 const handleSignout = async () => {
  try{

    const res = await fetch("/api/user/signout", {
      method:"POST"
    })
    const data = await res.json();
    if(res.ok){
      dispatch(signOutSuccess(data))
    } else {
      console.log(data.message)
    }
  } 
  catch(error){
    console.log(error)
  }
 }
  console.log(selectedImage, selectedImageUrl);
  return (
    <div className="  flex flex-col items-center justify-center md:max-w-lg md: mx-auto p-3">
      <h1 className="text-center font-semibold text-3xl py-7 ">Profile</h1>
      <form onSubmit={handleSubmission} className="flex flex-col gap-4 w-full">
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
          onChange={handleChange}
          autoComplete="current-username"
        />
        <TextInput
          id="email"
          type="email"
          placeholder="email"
          defaultValue={details.currentUser?.email}
          onChange={handleChange}
          autoComplete="current-email"
        />
        <TextInput
          id="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <Button gradientDuoTone="purpleToBlue" type="submit">
          Update
        </Button>
      </form>
      <div className="text-red-700 text-sm w-full flex flex-row justify-between mt-3">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete
        </span>
        <span className="cursor-pointer" onClick={() =>handleSignout()}>Sign Out</span>
      </div>
      {updateSuccess && <Alert color="success">{updateSuccess}</Alert>}
      {updateError && <Alert color="failure">{updateError}</Alert>}

      <Modal
        show={showModal}
        size="md"
        popup
        onClose={() => setShowModal(false)}
      >
        <ModalHeader />
        <Modal.Body>
          <div className="text-center">
            <AiOutlineExclamationCircle className="h-14 w-14 text-gray-500 mx-auto dark:text-gray-200 mb-1" />
            <h3 className="text-gray-500 text-lg dark:text-gray-200 mb-6 mt-4">
              Are You sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4 mb-4">
              <Button color="failure" onClick={() => handleDelete()}>
                Yes, I&apos;m sure{" "}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
