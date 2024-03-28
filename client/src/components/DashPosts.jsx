import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ModalHeader } from "flowbite-react";

const DashPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deletePostId, setDeletePostId] = useState("");
  const details = useSelector((state) => state.user.user);
  console.log(userPosts, "userPosts");
  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      const res = await fetch(
        `api/post/get-posts?userId=${details.currentUser?._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length <= 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/post/get-posts?userId=${details.currentUser?._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          console.log(data.posts.length, "data-length");
          if (data.posts.length <= 9) {
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
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/delete-post/${deletePostId}/${details.currentUser?._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(data, "data");

      if (res.ok) {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== deletePostId)
        );
      } else {
        console.log(data.message);
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
      {details.currentUser?.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <>
                <Table.Body className="">
                  <Table.Row className="bg-white dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`posts/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-10 w-20 object-fill"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="text-gray-900 dark:text-white"
                        to={`posts/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setDeletePostId(post._id);
                        }}
                        className="text-red-700 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell className="hover:underline">
                      <Link to={`/update-posts/${post._id}`}>
                        <span className=" cursor-pointer text-teal-500">
                          Edit
                        </span>
                      </Link>
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

export default DashPosts;
