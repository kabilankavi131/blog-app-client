import React from "react";

const BlogNav: React.FC = () => {
  return (
    <>
      <nav>
        <button className="tab active">Featured</button>
        <button className="tab">Latest</button>
        <button className="tab">Trending</button>
      </nav>
    </>
  );
};

export default BlogNav;
