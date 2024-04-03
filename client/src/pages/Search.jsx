import { Select, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  console.log(sidebarData, "sidebarData");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSideBarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    try {
      const fetchPosts = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/get-posts?${searchQuery}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          setShowMore(false);
          return;
        }
        if (res.ok) {
          setPosts(data.posts);
          setLoading(false);
          if (data.posts?.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      };
      fetchPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, [location.search]);
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSideBarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSideBarData({ ...sidebarData, category: category });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const handleShowMore = async () => {
    try {
      const startIndex = posts.length;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("startIndex", startIndex);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/get-posts?${searchQuery}`);
      const data = await res.json();
      if (!res.ok) {
        return;
      }
      if (res.ok) {
        setPosts([...posts, ...data.posts]);
        if (data.post?.length === 0) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" flex flex-col md:flex-row">
      <div className=" md:min-h-screen border-b border-gray-500 p-7 md:border-r">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="font-bold text-sm">SearchTerm:</label>
            <TextInput
              placeholder="select something.."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold">Sort:</label>
            <Select id="sort" value={sidebarData.sort} onChange={handleChange}>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold">Category:</label>
            <Select
              value={sidebarData.category}
              onChange={handleChange}
              id="category"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="redux">Redux</option>
              <option value="javascript">Javascript</option>
            </Select>
          </div>
          <Button type="submit" gradientDuoTone="purpleToPink" outline>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl text-gray-600 font-semibold border-b border-gray-600 p-4">
          Posts Results:
        </h1>
        <div className="text-xl p-7 flex flex-wrap">
          {!loading && posts?.length === 0 && <p>No Posts Found</p>}
          {loading && <Spinner size="md" />}
          {!loading &&
            posts &&
            posts.map((post) => (
              <>
                <PostCard key={post._id} article={post} />
              </>
            ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              type="button"
              className="text-teal-500 text-lg w-full hover:underline p-7"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
