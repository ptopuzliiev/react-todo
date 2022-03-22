import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../../API/PostService';
import { useFetching } from '../../hooks/useFetching';
import Loader from '../UI/Loader/Loader';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isCommentsLoading, commentsError] = useFetching(
    async (id) => {
      const response = await PostService.getPostComments(id);
      setComments(response.data);
    }
  );
  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);
  return (
    <div className="container">
      <h1>Post page with ID = {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h2>Comments</h2>
      {isCommentsLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comment) => (
            <div style={{ marginTop: 15 }} key={comment.id}>
              <h5>{comment.email}</h5>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
