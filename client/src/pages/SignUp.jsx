import { useState } from "react";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { OAuth } from "../components/OAuth";
export default function Signup() {
  const [formData, setFormData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData, "formData");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Fill all the fields");
    }
    try {
      setLoading(true);
      setErrorMessage("");
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      console.log(data, "data");
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
      // if (data.success === false) {
      //   setErrorMessage();
      // }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className=" flex p-3 mx-auto md:items-center max-w-3xl flex-col md:flex-row gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className=" font-bold text-4xl  dark:text-white">
            <span className=" mr-1 text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white px-2 py-1">
              Nihal&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 ">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1 justify-center items-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="">
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="text"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? <span>Loading...</span> : <span>Sign Up</span>}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link className="text-blue-500" to="/sign-in">
              {" "}
              Sign in
            </Link>
          </div>
          {errorMessage && (
            <>
              <Alert color="failure">{errorMessage}</Alert>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
