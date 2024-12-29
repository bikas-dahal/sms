import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPost, updatePost, fetchPostComments } from '@/lib/api';

export function usePost(postId: number) {
  // Parallel queries for post and comments
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  });

  const commentsQuery = useQuery({
    queryKey: ['post', postId, 'comments'],
    queryFn: () => fetchPostComments(postId),
  });

  return {
    post: postQuery.data,
    comments: commentsQuery.data,
    isLoading: postQuery.isLoading || commentsQuery.isLoading,
    error: postQuery.error || commentsQuery.error,
  };
}