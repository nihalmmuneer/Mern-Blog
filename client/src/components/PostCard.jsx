import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const PostCard = ({ article }) => {
  return (
    <div className="group flex flex-col relative h-[400px] border overflow-hidden border-teal-500 mx-auto rounded-lg sm:w-[300px] max-w-sm  shadow-lg  my-4">
      <Link to={`/posts/${article.slug}`}>
        <img
          src={article.image}
          alt={article.title}
          className=" h-[300px] w-[500px] lg:w-full object-cover  group-hover:h-[260px] transition-all duration-300"
        />
      </Link>
      <div className=" flex flex-col gap-2 p-2 ">
        <p className="text-lg font-semibold line-clamp-1">{article.title}</p>
        <span className="italic text-sm">{article.category}</span>
        <Link
          to={`/posts/${article.slug}`}
          className="absolute border border-teal-500 transition-all duration-300 py-2 text-center rounded-md m-2 text-teal-500 hover:bg-teal-500 hover:text-white group-hover:bottom-0 z-10 bottom-[150px] left-0 right-0"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  article: PropTypes.object,
};
export default PostCard;
