import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import { useState } from "react";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  console.log(postId);
  const details = useSelector((state) => state.user.user);
  console.log(comment);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comment?.length > 200) {
        return;
      }
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId: postId,
          userId: details.currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        console.log(data);
      }
      if (!res.ok) {
        setCommentError(data?.message);
        return;
      }
    } catch (error) {
      setCommentError(error?.message);
      return;
    }
  };
  return (
    <>
      {details?.currentUser ? (
        <div className="flex items-center gap-1 mx-auto p-3  my-3 max-w-2xl text-sm w-full ">
          <p>Signed in as:</p>
          <img
            src={details.currentUser.profilePicture}
            alt={details.currentUser.username}
            className="h-5 w-5 rounded-full object-cover"
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-cyan-600 text-sm hover:underline"
          >
            @{details.currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm flex gap-1 p-3 text-red-700 font-normal">
          You must be signed in to comment:
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            sign-in
          </Link>
        </div>
      )}
      {details.currentUser && (
        <form
          className="max-w-2xl mx-auto w-full p-3  border border-teal-500 rounded-md"
          onSubmit={handleSubmit}
        >
          <Textarea
            maxLength={200}
            rows={3}
            value={comment}
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="w-full max-w-2xl mx-auto  mt-5 flex justify-between items-center">
            <p className="text-xs ">
              {200 - comment.length} characters remaining
            </p>
            <Button
              type="submit"
              outline
              gradientDuoTone="purpleToBlue"
              size="md"
            >
              Submit
            </Button>
          </div>
          {commentError && <Alert color="failure"> {commentError}</Alert>}
        </form>
      )}
    </>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.node.isRequired, //ensures that postId is provided and is React node
};
export default CommentSection;
