import styles from './PostPage.module.css'
import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Post } from '../../api/posts/types';
import { Template } from '../../components/Template';

export function PostPage() {
    const [post , setPost] = useState<Post | undefined>(undefined);
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            const response = await axios.get(
                `https://studapi.teachmeskills.by/blog/posts/${id}`
            )
            setPost(response.data);
        })();
    }, [id]);
    console.log(post);
    
    if(!post) return null;

    return (
        <Template>
            <div className={styles.postMenu}>
                <div className={styles.id}>{post.id}</div>
                <img className={styles.image} src={post.image} alt="cat" />
                <div className={styles.author}>{post.author}</div>
                <div className={styles.date}>{post.date}</div>
            </div>
        </Template>
    );
}