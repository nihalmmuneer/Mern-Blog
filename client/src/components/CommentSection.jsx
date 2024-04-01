import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [postComment, setPostComment] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  const details = useSelector((state) => state.user.user);
  console.log(postComment, "postComment");
  useEffect(() => {
    const getPostComment = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setPostComment(data);
          setCommentError(null);
        }
        if (!res.ok) {
          setCommentError(data.message);
        }
      } catch (error) {
        setCommentError(error.message);
      }
    };
    getPostComment();
  }, [postId]);
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
        setPostComment([data.newComment, ...postComment]);
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
  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setPostComment((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
        setShowModal(false);
      }
      if (!res.ok) {
        console.log(data);
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLikes = async (commentId) => {
    console.log(commentId, "commentId");
    if (!details?.currentUser) {
      navigate("/sign-in");
      return;
    }
    try {
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      const data = await res.json();
      setPostComment(
        postComment.map((comment) => {
          console.log(comment, "comment");
          console.log(comment._id, "comment._id");
          console.log(commentId, "commentId");
          if (comment._id === commentId) {
            return {
              ...comment,
              likes: data?.likes,
              numberOfLikes: data.likes?.length,
            };
          } else {
            return comment;
          }
        })
      );
      console.log(data, "comment-section-data");
      if (res.ok) {
        console.log(data, "comment-section-data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditedSave = (comments, editedContent) => {
    console.log(comments, "comments");
    console.log(editedContent, "editedContent");
    console.log(comments[0]._id, "comments[0]._id");
    {
      setPostComment(
        postComment.map((comment) => {
          console.log(comment._id, "comment.id-map");
          if (comment._id === comments[0]._id) {
            console.log("succees");
            return {
              ...comment,
              content: editedContent,
            };
          } else {
            return comment;
          }
        })
      );
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
      {postComment && postComment?.length === 0 ? (
        <div className="my-4">No Comments Yet !!!!</div>
      ) : (
        <div className="my-4 flex gap-1 mx-auto max-w-2xl w-full items-center">
          <p className="text-sm font-medium">Comments</p>
          <div className="text-sm border border-gray-400 py-1 font-medium px-2 ">
            {postComment && postComment?.length}
          </div>
        </div>
      )}
      <Modal
        show={showModal}
        size="md"
        popup
        onClose={() => setShowModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <AiOutlineExclamationCircle className="h-14 w-14 text-gray-500 mx-auto dark:text-gray-200 mb-1" />
            <h3 className="text-gray-500 text-lg dark:text-gray-200 mb-6 mt-4">
              Are You sure you want to delete your comment?
            </h3>
            <div className="flex justify-center gap-4 mb-4">
              <Button
                color="failure"
                onClick={() => handleDeleteComment(commentToDelete)}
              >
                Yes, I&apos;m sure{" "}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {postComment &&
        postComment.map((posts) => (
          <Comments
            key={posts._id}
            posts={[posts]}
            onLike={handleLikes}
            onEditSave={handleEditedSave}
            onDelete={(commentId) => {
              setShowModal(true);
              setCommentToDelete(commentId);
            }}
          />
        ))}
    </>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
};
export default CommentSection;
