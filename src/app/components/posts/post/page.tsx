import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Modal = ({ opened, onClose, onSubmit, defaultValue }: any) => {
  const [editPost, setEditPost] = useState(defaultValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditPost(e.target.value);
  };

  return (
    <div
      style={{
        display: opened ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          background: 'white',
          borderRadius: '8px',
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ editPost });
          }}
        >
          <textarea
            required
            autoFocus
            placeholder='Edit your post.'
            value={editPost}
            onChange={handleInputChange}
          />
          <div>
            <button type='submit'>Update</button>
            <button type='button' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Post({ post, setPosts }: any) {
  const { _id, postedAt, body, user: appUser } = post;
  const [modalOpen, setModalOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const { reset } = useForm();

  const editPost = () => {
    reset({ editPost: body });
    setModalOpen(true);
  };

  const onPostUpdate = async (data: any) => {
    setInputDisabled(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id,
          body: data.editPost,
        }),
      });

      const responseJson = await response.json();

      setPosts((posts: any) =>
        posts.map((post: any) => {
          if (post._id === _id) {
            return {
              ...post,
              body: data.editPost,
            };
          }
          return post;
        })
      );
      setInputDisabled(false);
      setModalOpen(false);
      alert('Your flutter has been updated');
    } catch (error) {
      // TODO: Handle error
      console.error(error);
      setInputDisabled(false);
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch('/api/posts/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id,
        }),
      });

      const responseJson = await response.json();
      setDeleted(true);
      alert('Post deleted');
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <>
      {!deleted && (
        <>
          <Modal
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={(e: any) => {
              onPostUpdate(e);
            }}
            defaultValue={body}
          />
          <div className='card'>
            <div className='user-info'>
              {/* Avatar and user information */}
              <img
                src={appUser.picture}
                alt={appUser.name}
                style={{ height: '100px', width: '100px' }}
              />
              <div>
                <span>{appUser.nickname}</span>
                <span>{new Date(postedAt).toLocaleString()}</span>
              </div>
            </div>
            <div className='card-body'>
              <p>{body}</p>
            </div>
            <div className='card-footer'>
              <span>0 people liked this</span>
              <div>
                <button onClick={() => editPost()}>Edit</button>
                <button onClick={deletePost}>Delete</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
