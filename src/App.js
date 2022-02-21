import React from 'react';
import { useState, useEffect } from 'react';
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/Loader/Loader";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import {useFetching} from "./hooks/useFetching";

function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const posts = await PostService.getAll();
        setPosts(posts)
    })

    useEffect(() => {
        fetchPosts()
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const deletePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="app">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>Добавить пост</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            { posts.length ?
                <PostFilter
                    filter={filter}
                    setFilter={setFilter}
                />
                : ''
            }
            { postError &&
                <h1 className="h1__title">Произошла ошибка {postError}</h1>
            }
            { isPostsLoading
                ? <Loader/>
                : <PostList remove={deletePost} posts={sortedAndSearchedPosts} title="Список постов"/>
            }
        </div>
    );
}

export default App;