import { Spinner, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
const PostPage = () => {
  const { postSlug } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(postSlug);
    setLoading(true);
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/get-posts?slug=${postSlug}`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
          console.log(data, "data");
        }
      } catch (error) {
        console.log(error.message);
        setError(true);
      }
    };
    fetchPost();
  }, [postSlug]);
  console.log(post, "post");
  console.log(error);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  return (
    <div className="flex flex-col text-center p-3 mx-auto">
      <h1 className="text-3xl font-serif max-w-2xl mt-10   mx-auto lg: text-4xl">
        {post && post?.title}
      </h1>
      <Link to={`/search?category=${post && post.category}`}>
        <Button size="xs" color="gray" className="mx-auto text-sm mt-5" pill>
          {post && post.category}
        </Button>
      </Link>
      <img
        className="mt-10 mx-auto max-h-[400px]  w-[700px] object-cover"
        src={post && post.image}
        alt={post && post.title}
      />
      <div className=" flex justify-between mx-auto border-b pb-3 border-slate-300 w-full text-sm pt-3 max-w-2xl lg:max-w-3xl lg:px-8">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div className="mx-auto max-w-2xl p-3 w-full post-content" dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
      <CallToAction/>
    </div>
  );
};

export default PostPage;
