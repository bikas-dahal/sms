import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePost() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, updates }: { id: number; updates: Partial<Post> }) =>
        updatePost(id, updates),
      // Optimistic update
      onMutate: async ({ id, updates }) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: ['post', id] });
  
        // Save previous post
        const previousPost = queryClient.getQueryData(['post', id]);
  
        // Optimistically update post
        queryClient.setQueryData(['post', id], (old: Post) => ({
          ...old,
          ...updates,
        }));
  
        return { previousPost };
      },
      onError: (err, variables, context) => {
        // Rollback on error
        if (context?.previousPost) {
          queryClient.setQueryData(['post', variables.id], context.previousPost);
        }
      },
      onSettled: (data, error, variables) => {
        // Refetch to ensure server state
        queryClient.invalidateQueries({ queryKey: ['post', variables.id] });
      },
    });
  }