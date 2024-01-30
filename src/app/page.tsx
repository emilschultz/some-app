'use client';
import { useEffect, useState } from 'react';
import CreatePost from './components/posts/createPost/page';
import Posts from '../app/components/posts/posts/page';
import styles from './page.module.css';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const getPosts = await fetch('/api/posts');
      const getPostsJson = await getPosts.json();
      setPosts(getPostsJson);
    })();
  }, []);

  return (
    <main className={styles.main}>
      <CreatePost setPosts={setPosts} />
      <Posts posts={posts} setPosts={setPosts} />
    </main>
  );
}
