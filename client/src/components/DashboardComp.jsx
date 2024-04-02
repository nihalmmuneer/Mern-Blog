import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Link } from "react-router-dom";
const DashboardComp = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/get-users?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.getUserDetails);
          setLastMonthUsers(data.lastMonthUsers);
          setTotalUsers(data.totalUser);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/get-posts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setLastMonthPosts(data.lastMonthPosts);
          setTotalPosts(data.totalPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setLastMonthComments(data.lastMonthComments);
          setTotalComments(data.totalComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
    fetchPosts();
    fetchUsers();
  }, []);
  return (
    <div className=" flex flex-wrap p-3 mx-auto justify-center">
      <div className="flex gap-4 flex-wrap justify-center">
        <div className="flex flex-col w-full md:w-72 flex-wrap gap-4 p-3 rounded-md dark:bg-slate-800 shadow-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="uppercase text-gray-500">Total Users</h1>
              <p className="text-xl text-gray-500">{totalUsers}</p>
            </div>
            <div className="bg-teal-500 text-white text-2xl shadow-lg rounded-full p-3">
              <HiOutlineUserGroup />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-green-400 flex items-center">
              <HiArrowNarrowUp />
              <p>{lastMonthUsers}</p>
            </div>
            <div className="text-gray-500 text-sm">Last month</div>
          </div>
        </div>
        <div className="flex flex-col gap-4  w-full md:w-72 flex-wrap p-3 rounded-md dark:bg-slate-800 shadow-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="uppercase text-gray-500">Total Comments</h1>
              <p className="text-xl text-gray-500">{totalComments}</p>
            </div>
            <div className="bg-indigo-500 shadow-lg text-white text-2xl rounded-full p-3">
              <HiAnnotation />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-green-400 flex items-center">
              <HiArrowNarrowUp />
              <p>{lastMonthComments}</p>
            </div>
            <div className="text-gray-500 text-sm">Last month</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4  md:w-72 flex-wrap p-3 rounded-md dark:bg-slate-800 shadow-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="uppercase text-gray-500">Total Posts</h1>
              <p className="text-xl text-gray-500">{totalPosts}</p>
            </div>
            <div className="bg-lime-500 shadow-lg text-white text-2xl rounded-full p-3">
              <HiDocumentText />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-green-400 flex items-center">
              <HiArrowNarrowUp />
              <p>{lastMonthPosts}</p>
            </div>
            <div className="text-gray-500 text-sm">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center  w-full flex-wrap gap-4">
        <div className="shadow-md w-full   dark:bg-slate-800 rounded-md p-3 md:w-auto flex-wrap my-5">
          <div className="flex justify-between p-3 items-center ">
            <h1 className="text-center font-semibold">Recent users</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=users">See all</Link>
            </Button>
          </div>
          <Table className="w-full">
            <Table.Head>
              <Table.HeadCell className="uppercase">User Image</Table.HeadCell>
              <Table.HeadCell className="uppercase">username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id}>
                  <Table.Row>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="h-10 w-10 object-cover bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="shadow-md w-full md:w-auto flex-wrap dark:bg-slate-800 p-3 rounded-md my-5">
          <div className="flex justify-between p-3 items-center">
            <h1 className="text-center font-semibold">Recent comments</h1>
            <Button outline gradientDuoTone="purpleToPink">
              {" "}
              <Link to="/dashboard?tab=comments">See all</Link>
            </Button>
          </div>
          <Table className="w-full">
            <Table.Head>
              <Table.HeadCell className="uppercase !w-96">
                Comment Content
              </Table.HeadCell>
              <Table.HeadCell className="uppercase">Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id}>
                  <Table.Row>
                    <Table.Cell className="!w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell className="">
                      {comment.numberOfLikes}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="shadow-md w-full md:w-auto flex-wrap  dark:bg-slate-800 p-3 rounded-md my-5">
          <div className="flex justify-between p-3 items-center">
            <h1 className="text-center font-semibold">Recent posts</h1>
            <Button outline gradientDuoTone="purpleToPink">
              {" "}
              <Link to="/dashboard?tab=posts">See all</Link>
            </Button>
          </div>
          <Table className="w-full">
            <Table.Head>
              <Table.HeadCell className="uppercase">Posts Image</Table.HeadCell>
              <Table.HeadCell className="uppercase">Post Title</Table.HeadCell>
              <Table.HeadCell className="uppercase">Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id}>
                  <Table.Row>
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-10 w-10 object-cover bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{post.title}</Table.Cell>
                    <Table.Cell className=" w-5">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
