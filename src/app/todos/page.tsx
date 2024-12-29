'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, createTodo } from '@/lib/api';
import { useState } from 'react';

export default function TodosPage() {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const queryClient = useQueryClient();

  // Query: Fetch todos
  const {data: todos, isLoading, error} = useQuery({
    queryKey: ['todo'],
    queryFn: fetchTodos,
  })

  console.log(typeof todos);

  console.log('todos', todos);

  // Mutation: Create new todo
  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      // Invalidate and refetch todos query
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodoTitle('');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Todos</h1>
      
      {/* Add Todo Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTodoMutation.mutate({
            title: newTodoTitle,
            completed: false,
          });
        }}
      >
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="New todo title"
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* Todo List */}
      gdfd
      {JSON.stringify(todos)}
      {/* <ul>
        {todos?.map((todo: { id: number; title: string; completed: boolean }) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul> */}
    </div>
  );
}