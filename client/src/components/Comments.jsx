import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Comments = ({ posts }) => {
  const [userComment, setUserComment] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${posts[0]?.userId}`, {
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          setUserComment(data);
        }
        if (!res.ok) {
          setUserComment(null);
          console.log(data.message, "user-error");
        }
      } catch (error) {
        console.log(error.message);
        setUserComment(null);
      }
    };
    if (posts && posts[0]?.userId) {
      getUser();
    }
  }, [posts[0]?.userId]);
  return (
    <div className="flex p-3 gap-2 mx-auto max-w-2xl w-full border-b dark:border-gray-600 mb-2">
      <div className="shrink">
        <img
          src={userComment && userComment?.profilePicture}
          alt={userComment && userComment?.username}
          className="rounded-full h-10 w-10 object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex text-xs gap-1 flex-1">
          <span className="font-bold">
            @{userComment ? userComment?.username : "anonymous-user"}
          </span>
          <span>
            {" "}
            {moment(userComment && userComment?.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-sm self-start">{posts && posts[0]?.content}</p>
      </div>
    </div>
  );
};

Comments.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Comments;
