import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const DashPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const details = useSelector((state) => state.user.user);
  console.log(userPosts, "userPosts");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/post/get-posts?userId=${details.currentUser?._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (details.currentUser?.isAdmin) {
      fetchData();
    }
  }, [details.currentUser?._id]);
  return (
    <div className="p-3 md:overflow-auto  overflow-x-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-500">
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
                      <Link className="text-gray-900 dark:text-white" to={`posts/${post.slug}`}>{post.title}</Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span className="text-red-700 hover:underline">Delete</span>
                    </Table.Cell>
                    <Table.Cell className="hover:underline">
                      <Link to={`/update-posts/${post._id}`}>
                        <span className=" text-teal-500">Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </>
            ))}
          </Table>
        </>
      ) : (
        "No Posts Yet !!"
      )}
    </div>
  );
};

export default DashPosts;
