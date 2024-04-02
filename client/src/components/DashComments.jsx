import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Table } from "flowbite-react";
import { Modal, Button } from "flowbite-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ModalHeader } from "flowbite-react";

const DashComments = () => {
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState("");
  const details = useSelector((state) => state.user.user);
  console.log(comments, "comments");
  const handleShowMore = async () => {
    const startIndex = comments.length;
    console.log(startIndex, "startIndex");

    try {
      const res = await fetch(
        `api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length <= 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(comments, "users");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/comment/getcomments");
        const data = await res.json();
        console.log(data.comments, "get-comments");
        if (res.ok) {
          setComments(data.comments);
          console.log(data.comments.length, "data-length");
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (details.currentUser?.isAdmin) {
      fetchData();
    }
  }, [details.currentUser?._id]);
  const handleDelete = async () => {
    console.log(deleteCommentId, "deleteUserId");
    try {
      const res = await fetch(`/api/comment/deleteComment/${deleteCommentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== deleteCommentId)
        );
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className="p-3 md:overflow-auto  overflow-x-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-500"
    >
      {details.currentUser?.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>postId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>
                <span>Delete</span>
              </Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <>
                <Table.Body key={comment._id} className="">
                  <Table.Row className="bg-white dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{comment.content}</Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    <Table.Cell>{comment.postId}</Table.Cell>
                    <Table.Cell>{comment.userId}</Table.Cell>
                    <Table.Cell className="hover:underline">
                      <span
                        className=" cursor-pointer text-red-500"
                        onClick={() => {
                          setShowModal(true), setDeleteCommentId(comment._id);
                        }}
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </>
            ))}
          </Table>
          {showMore && (
            <button
              type="button"
              onClick={handleShowMore}
              className="py-3 w-full mx-auto text-teal-500"
            >
              show more
            </button>
          )}
        </>
      ) : (
        "No Posts Yet !!"
      )}
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

export default DashComments;
