'use client';
import { usePost } from '@/hooks/usePost';
import { useUpdatePost } from '@/hooks/useUpdatePost';
import { Suspense } from 'react';

export default function PostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  const { post, comments, isLoading, error } = usePost(postId);
  const updatePostMutation = useUpdatePost();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      
      <button
        onClick={() =>
          updatePostMutation.mutate({
            id: postId,
            updates: { title: 'Updated Title' },
          })
        }
      >
        Update Title
      </button>

      <Suspense fallback={<div>Loading comments...</div>}>
        <div>
          <h2>Comments</h2>
          {comments?.map((comment) => (
            <div key={comment.id}>
              <h3>{comment.name}</h3>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
}