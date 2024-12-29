import { Post } from "@/app/types";

const BASE_URL = 'http://localhost:3000';

export async function fetchTodos() {
  const response = await fetch(`${BASE_URL}/api/todos`);
  console.log('response', response);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export async function createTodo(newTodo: { title: string; completed: boolean }) {
  const response = await fetch(`${BASE_URL}/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
}


export async function fetchPosts(page = 1, limit = 10) {
  const response = await fetch(
    `${BASE_URL}/posts?_page=${page}&_limit=${limit}`
  );
  if (!response.ok) throw new Error('Failed to fetch posts');
  return {
    posts: await response.json(),
    hasMore: response.headers.get('x-total-count') > page * limit,
  };
}

export async function fetchPost(id: number) {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
}

export async function fetchPostComments(postId: number) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!response.ok) throw new Error('Failed to fetch comments');
  return response.json();
}

export async function createPost(post: Omit<Post, 'id'>) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
}

export async function updatePost(id: number, updates: Partial<Post>) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
}