import { useState, useCallback } from 'react';

export function usePosts(initialPosts, accessToken) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleAction = useCallback(async (id, action) => {
    if (!accessToken) return;
    try {
      const res = await fetch(`/api/posts/${id}/${action}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.ok) {
        const updated = await res.json();
        setPosts(prev => prev.map(p => p.id === id ? updated : p));
      }
    } catch (err) {
      console.error(err);
    }
  }, [accessToken]);

  const addPost = useCallback((newPost) => {
    setPosts(prev => [newPost, ...prev]);
  }, []);

  return { posts, loading, error, fetchPosts, toggleAction, addPost };
}