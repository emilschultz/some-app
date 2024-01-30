import Post from '../post/page';

export default function Posts({ posts, setPosts }) {
  return (
    <>
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} setPosts={setPosts} />
        </div>
      ))}
    </>
  );
}
