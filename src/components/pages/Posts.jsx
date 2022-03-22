import React, { useEffect, useState } from 'react';
import MyButton from '../UI/button/MyButton';
import MyModal from '../UI/modal/MyModal';
import PostForm from '../PostForm';
import PostList from '../PostList';
import PostFilter from '../PostFilter';
import Pagination from '../UI/pagination/Pagination';
import Loader from '../UI/Loader/Loader';
import { useFetching } from '../../hooks/useFetching';
import { usePosts } from '../../hooks/usePosts';
import PostService from '../../API/PostService';
import { getPageCount } from '../../utils/pages';
function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useEffect(() => {
    fetchPosts(limit, page);
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const deletePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
  };

  return (
    <div className="app">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Добавить пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      {posts.length ? <PostFilter filter={filter} setFilter={setFilter} /> : ''}
      {postError && <h1 className="h1__title">Произошла ошибка {postError}</h1>}
      {isPostsLoading ? (
        <Loader />
      ) : (
        <PostList
          remove={deletePost}
          posts={sortedAndSearchedPosts}
          title="Список постов"
        />
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
