import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Table } from "flowbite-react";
import { Modal, Button } from "flowbite-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ModalHeader } from "flowbite-react";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const DashUsers = () => {
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const details = useSelector((state) => state.user.user);
  const handleShowMore = async () => {
    const startIndex = users.length;

    try {
      const res = await fetch(`api/user/get-users?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.getUserDetails]);
        if (data.getUserDetails.length <= 9) {
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
        const res = await fetch("/api/user/get-users");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.getUserDetails);
          if (data.getUserDetails.length < 9) {
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
    try {
      const res = await fetch(`/api/user/delete/${deleteUserId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== deleteUserId));
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
      {details.currentUser?.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>
                <span>Delete</span>
              </Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <>
                <Table.Body key={user._id} className="">
                  <Table.Row className="bg-white dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="h-10 w-10 bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </Table.Cell>
                    <Table.Cell className="hover:underline">
                      <span
                        className=" cursor-pointer text-red-500"
                        onClick={() => {
                          setShowModal(true), setDeleteUserId(user._id);
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

export default DashUsers;
