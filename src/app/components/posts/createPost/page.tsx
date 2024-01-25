import { useState } from 'react';
import Image from 'next/image';

const demoUser = {
  id: '6276d0c602ce122f7b8b11ec',
  name: 'Emil Schultz',
  nickname: 'Totti',
  picture: 'https://picsum.photos/id/200/50/50',
};

export default function CreatePost({ setPosts }: any) {
  const [postText, setPostText] = useState('');
  const [disabledInput, setDisabledInput] = useState(false);
  const user = demoUser;

  const onSubmitPost = async (event: any) => {
    event.preventDefault();
    setDisabledInput(true);

    setDisabledInput(true);
    const post = {
      postedAt: Date.now(),
      body: postText,
      likes: [],
      user: {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
      },
    };
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application.json',
        },
        body: JSON.stringify(post),
      });

      const responseJson = await response.json();

      setPosts((posts: any) => [
        {
          _id: response.insertedId,
          ...post,
        },
        ...posts,
      ]);
      setPostText('');
      setDisabledInput(false);
      alert('Success - Your post was created 🌻');
    } catch (error) {
      console.error('Error submitting your post:', error);
      setDisabledInput(false);
    }
  };

  return (
    <div
      style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}
    >
      <Image
        src={user.picture}
        alt={user.name}
        style={{ borderRadius: '50%', width: '50px', height: '50px' }}
      />
      <form onSubmit={onSubmitPost}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <textarea
            required
            placeholder='Create a post...'
            style={{ width: '50vw', maxWidth: '500px', minHeight: '100px' }}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <button type='submit' disabled={disabledInput}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
