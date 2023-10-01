import Logo from "../components/Logo";
import Profile from "../components/Profile";
import SearchBar from "../components/SearchBar";
import PreviewPost from "../components/PreviewPost";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchPosts = () => {
    fetch(`${apiUrl}/posts`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data.data);
      })
      .catch((err) => {
        alert(`Error fetching posts: ${err.message}`);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full h-full">
      <nav className="flex justify-between items-center py-2 px-2">
        <Logo />
        <SearchBar />
        <div className="flex items-center">
          <Link className="text-white">New post</Link>
          <Profile className="bg-red-300" />
        </div>
      </nav>
      <section className="m-20">
        {posts.map((post, index) => (
          <PreviewPost key={index} title={post.title} text={post.text} />
        ))}
      </section>
    </div>
  );
}
