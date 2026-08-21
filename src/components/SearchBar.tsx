import React, { useState, useEffect, useRef, useContext } from "react";
import { Blog, Categories } from "../interfaces/interface";
import client from "../client/client";
import { getBlogsByCategories, getBlogysbySearch } from "../services/services";
import { BlogContext, BlogContextType } from "../context/BlogListsProvider";
import toast, { Toaster } from "react-hot-toast";
import SearchBlogLottie from "./Lottie Files/SearchBlog";

const SearchBar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const context = useContext(BlogContext) as BlogContextType;
  const [query, setQuery] = useState<string>("");
  const [noBlogFound, setNoBlogFound] = useState<boolean>(false);
  const { setBlogs } = context;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showSearchloading, setShowSearchloading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Categories[]>([]);

  const getSearchedBlogs = async (blogTitle: string, startFrom: number) => {
    setShowSearchloading(true);
    const loadMore: HTMLElement | any =
      document.getElementById("loadMoreContainer");
    if (loadMore) {
      loadMore.style.display = "none";
    }

    const fetchedBlogs: Blog[] = await getBlogysbySearch(blogTitle, startFrom);
    if (fetchedBlogs.length === 0) {
      setBlogs([]);
      setNoBlogFound(true);
      setShowSearchloading(false);
      return;
    }
    setShowSearchloading(false);
    setBlogs(fetchedBlogs);
    setNoBlogFound(false);
  };

  // Fetch categories dynamically
  const getCategories = async () => {
    try {
      const response: Categories[] = await client(
        "https://blogspace-app-server.vercel.app/categories",
        "GET",
        {},
      );
      setCategories(response);
    } catch (err) {
      console.error("Error while getting categories:", err);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const resetFilters = () => {
    const filterArray: any = document.querySelectorAll(".filterCategories");
    filterArray.forEach((filter: HTMLInputElement) => {
      filter.checked = false;
    });
  };

  const selectAllCategories = () => {
    const filterArray: any = document.querySelectorAll(".filterCategories");
    filterArray.forEach((filter: HTMLInputElement) => {
      filter.checked = true;
    });
  };

  const setDefaultBlog = () => {
    const defaultBlog: Blog[] = [
      {
        blog_id: 404,
        username: "admin",
        blog_category_id: 5,
        blog_title: "Oops! No Blogs Here!",
        blog_description: "A lighthearted note on our empty category shelves.",
        blog_content:
          "Hey there, fellow blog explorer! 🌟  \n\nIt seems you've stumbled upon a rare phenomenon in the vast universe of our blog categories: the 'No Blog Available' event! Yes, it's as rare as finding a unicorn in a desert. Or, more likely, like trying to find your car keys when you're already late for work—utterly frustrating but entirely relatable!  \n\nPicture this: you’re at a buffet, and you’ve just discovered that the chocolate fountain is out of order. Devastating, right? You might as well be told that the Wi-Fi is down or that there’s a shortage of pizza.  \n\nWell, that’s how we feel right now! But fret not! Instead of dwelling on the empty shelves, let’s embrace this moment of nothingness with humor. Why not try a different category? Maybe the 'Cats in Space' section is calling your name! 🐱🚀  \n\nHere’s a thought: if you find a blog that perfectly suits your interests, it might just be hiding like a ninja—very skilled at dodging your clicks. But remember, if it’s not there, it’s not you; it’s the blog!  \n\nIn the meantime, let’s take a moment to ponder the deeper mysteries of life. Consider the following:  \n- Why do we park in driveways and drive on parkways?  \n- If a turtle doesn’t have a shell, is it homeless or naked?  \n- Why do we say “slept like a baby” when babies wake up every two hours?  \n\nAh, the philosophical questions that haunt us in the quiet moments!  \n\nWhile we wait for new blogs to appear (like magic, hopefully), why not get adventurous? Click around, explore other categories, and who knows, you might discover your next favorite blog or at least a good laugh!  \n\n**Here are some wild ideas to inspire your exploration:**  \n- **Category Swap:** Try selecting a category you’ve never considered. Who knows? You might find a hidden gem, like a blog on the secret life of garden gnomes.  \n- **Random Click:** Close your eyes and click on a random blog! It’s like a surprise party for your brain. Just remember to have a glass of water nearby in case you need to hydrate from all that excitement!  \n- **Ask a Friend:** Share your dilemma with friends. They might have great suggestions or at least a hilarious story to keep you entertained!  \n\nSo, dear reader, keep your spirits high and your blog explorations wide!  \n\nUntil next time, may your searches be fruitful, your laughter be loud, and your blogs be plentiful!  \n\nP.S. If you find that elusive blog, be sure to send it our way! We could use a good laugh too! 😂",
        blog_cover_image: null,
        blog_date: "2024-12-19",
        blog_read_time: "5 min",
        created_at: "2024-12-19T10:00:00Z",
        created_by: "admin",
        modified_at: "2024-12-19T10:00:00Z",
        modified_by: "admin",
        is_active: true,
        tags: ["funny", "blog", "exploration", "humor"],
        category: "General",
        likes: 404,
      },
    ];
    setBlogs(defaultBlog);
  };
  const showFilteredBlogs = () => {
    const filterArray: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".filterCategories");
    const selectedCategories: string[] = [];

    // Collect selected categories
    filterArray.forEach((filter: HTMLInputElement) => {
      if (filter.checked && filter.value !== "Select All") {
        selectedCategories.push(filter.value);
      }
    });
    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category to proceed!");
      return;
    }
    // console.log("Selected Categories:", selectedCategories);

    // Function to fetch filtered blogs
    const loader = toast.loading(
      "Loading Selected categories blogs, please wait...",
    );
    const getFilteredBlogs = async () => {
      try {
        const blogs: Blog[] | any =
          await getBlogsByCategories(selectedCategories);
        toast.dismiss(loader);
        if (blogs.length === 0) {
          toast.error("No blogs found with selected categories");
          setDefaultBlog();
        } else {
          setBlogs(blogs);
        }
      } catch (error: any) {
        console.error("Error fetching filtered blogs:", error.message);
      }
    };
    getFilteredBlogs();
    setShowDropdown(false); // Assuming this function handles dropdown visibility
  };

  useEffect(() => {
    getCategories();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar-container">
      <Toaster />
      <div className="search-bar">
        <div className="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            onClick={() => {
              if (query.trim() !== "") getSearchedBlogs(query, 0);
            }}
          >
            <path
              fill="currentColor"
              d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z"
            />
          </svg>
        </div>
        {showSearchloading && <SearchBlogLottie />}
        <input
          type="text"
          placeholder="Search... (Click the search icon to submit)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <div className="filter-icon" onClick={toggleDropdown}>
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="var(--primary-text)"
          >
            <path d="M1 3.75A.75.75 0 011.75 3h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 3.75zM3.5 7.75A.75.75 0 014.25 7h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM6.75 11a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" />
          </svg>
        </div>
      </div>

      {showDropdown && (
        <div className="dropdown" ref={dropdownRef}>
          <ul className="dropdown-list">
            <li className="dropdown-item">
              <label onClick={selectAllCategories}>
                <input
                  className="filterCategories"
                  type="checkbox"
                  value="Select All"
                />
                <span>Select All</span>
              </label>
            </li>
            {categories.map((category) => (
              <li className="dropdown-item" key={category.category_id}>
                <label>
                  <input
                    className="filterCategories"
                    type="checkbox"
                    value={category.category_id}
                  />
                  <span>{category.category_name}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="dropdownFooter">
            <div className="reset" onClick={resetFilters}>
              <img src="https://www.svgrepo.com/show/459103/reset.svg" alt="" />
              Reset
            </div>
            <div className="showResult" onClick={showFilteredBlogs}>
              Show Result
              <img
                src="https://www.svgrepo.com/show/376241/status-skipped.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      {noBlogFound && (
        <div className="noSearchedBlogFound">
          <h2>Stay Tuned, Blogs Coming Soon!</h2>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
