import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  console.log(posts, "posts");
  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch("/api/post/get-posts");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      };
      fetchPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-xs lg:text-sm text-gray-500">
          Here you&apos;ll find a variety of articles and tutorials on topics
          such as web development, software engineering, and programming
          languages.
        </p>
        <Link
          to="/search"
          className="text-teal-500 text-xs sm:text-sm font-bold hover:underline"
        >
          view all
        </Link>
      </div>
      <div className="bg-amber-100  dark:bg-slate-700 p-3 lg:max-w-6xl lg:mx-auto">
        <CallToAction />
      </div>
      <div>
        {posts.length > 0 && (
          <div className="flex flex-col  max-w-6xl items-center p-8  mx-auto">
            <p className="text-center font-semibold text-xl">Recents</p>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
              {posts &&
                posts.map((post) => <PostCard key={post._id} article={post} />)}
            </div>
            <Link to="/search" className="hover:underline text-teal-500 text-sm ">
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
