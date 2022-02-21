import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({ create }) => {
    const [post, setPost] = useState({ title: '', body: '' });

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost);
        setPost({ title: '', body: '' });
        e.target.setAttribute('disabled', true);
        setTimeout(() => {
            e.target.removeAttribute('disabled');
        }, 5000);
    }

    return (
        <form>
            <MyInput type="text" placeholder="Post title" onChange={(e) => setPost({...post, title: e.target.value})} value={post.title} />
            <MyInput type="text" placeholder="Post description" onChange={(e) => setPost({...post, body: e.target.value})} value={post.body} />
            <MyButton onClick={addNewPost}>Create post</MyButton>
        </form>
    );
};

export default PostForm;