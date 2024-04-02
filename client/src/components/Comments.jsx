import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

const Comments = ({ posts, onLike, onEditSave, onDelete }) => {
  const [userComment, setUserComment] = useState(null);
  const details = useSelector((state) => state.user.user);
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState(posts[0].content);

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

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = async() => {
        try{
            const res = await fetch(`/api/comment/editComment/${posts[0]?._id}`, {
                method: "PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    content: editContent
                })
            })
            // const data = await res.json()
            // console.log(data, 'data-save-update')
            if(res.ok){
                setEdit(false);
                onEditSave(posts,editContent)
            }
        }catch(error){
            console.log(error.message)
        }
  }
  return (
    <div className="flex p-3 gap-2 mx-auto max-w-2xl w-full border-b dark:border-gray-600 mb-2">
      <div className="shrink">
        <img
          src={userComment && userComment?.profilePicture}
          alt={userComment && userComment?.username}
          className="rounded-full h-10 w-10 object-cover"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex text-xs gap-1 flex-1">
          <span className="font-bold">
            @{userComment ? userComment?.username : "anonymous-user"}
          </span>
          <span>
            {" "}
            {moment(userComment && userComment?.createdAt).fromNow()}
          </span>
        </div>
        {edit ? (
            <>
          <Textarea
            value={editContent}
            className="mt-1 resize-none mb-2"
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className="flex justify-end gap-2 ">
            <Button size="md" className="rounded-md text-xs" gradientDuoTone="purpleToBlue" onClick={handleSave}>Save</Button>
            <Button outline size="md" className="rounded-md text-xs" gradientDuoTone="purpleToBlue" onClick={() =>setEdit(false)}>Cancel</Button>
          </div>
          </>
        ) : (
          <>
            <p className="text-sm self-start">{posts && posts[0]?.content}</p>
            <div className="flex my-1 px-1">
              <div className="flex text-sm gap-1 items-center border-t border-gray-400 max-w-fit dark:border-gray-500 mt-1 pt-2">
                <button
                  type="button"
                  className={`text-gray-500 hover:text-blue-500 ${
                    details?.currentUser &&
                    posts[0].likes.includes(details.currentUser._id) &&
                    "!text-blue-500"
                  }`}
                  onClick={() => onLike(posts[0]?._id)}
                >
                  <FaThumbsUp />
                </button>
                <div className="text-sm text-gray-400">
                  {/* {posts[0].numberOfLikers} {" "} 
              {posts[0].numberOfLikers.length > 1 ? "likes" : "like"} */}
                  {posts[0].numberOfLikes > 0 &&
                    posts[0].numberOfLikes +
                      " " +
                      (posts[0].numberOfLikes === 1 ? "like" : "likes")}
                </div>
                {(details.currentUser &&
                  details.currentUser._Id === posts[0].userId) ||
                  (details.currentUser.isAdmin && (
                    <>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-blue-500"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-red-500"
                      onClick={()=>onDelete(posts[0]._id)}
                    >
                      Delete
                    </button>
                    </>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Comments.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLike: PropTypes.func.isRequired,
  onEditSave: PropTypes.func.isRequired,
  onDelete:PropTypes.func.isRequired

};
export default Comments;
