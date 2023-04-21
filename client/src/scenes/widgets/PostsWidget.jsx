import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
      const response = await fetch(process.env.REACT_APP_POST_SERVER_URL, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    }

    const getUserPosts = async () => {
      const response = await fetch(process.env.REACT_APP_POST_SERVER_URL+`/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      dispatch(setPosts({ posts: data }));
  }

  useEffect(() => {
    if (isProfile){
      getUserPosts();
    }
    else {
      getPosts();
    }
  }, [])   //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.length>0 && posts.map((post) => (
        <PostWidget
          key={post._id}
          postId={post._id}
          postUserId={post.userId}
          name={`${post.firstName} ${post.lastName}`}
          description={post.description}
          location={post.location}
          userPicturePath={post.userPicturePath}
          picturePath={post.picturePath}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </>
  )
}

export default PostsWidget;