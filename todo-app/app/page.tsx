'use client';
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react';

const fetchTodoList = async () => {
  const response = await fetch('https://back-ih3xrzr5y-temgoua-arthurs-projects.vercel.app/')
  return response.json()
}

const postTodo = async (todoData: { title: string; description: string }) => {
  await fetch(`https://back-ih3xrzr5y-temgoua-arthurs-projects.vercel.app/`, {
    body: JSON.stringify(todoData),
    headers: {
      'Content-Type': 'application/json',
    },
    method: "POST",
  })
}
const deleteTodo = async (id: number) => {
  await fetch(`https://back-ih3xrzr5y-temgoua-arthurs-projects.vercel.app/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: "DELETE",
  })
}

const useDeleteTodoMutation = () => {
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo
  });

  return deleteTodoMutation
}

export default function Home() {
  const info = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const postTodoMutation = useMutation({
    mutationFn: postTodo
  });

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      title: title,
      description: description
    };
    postTodoMutation.mutate(formData);
  }

  return (
    <>
      <h1 className="flex justify-center font-medium text-3xl mb-10">Well come back UserName</h1>
      <div className="flex justify-center min-h-screen py-2">
        <div>
          <form className="mb-10" onSubmit={handleFormSubmit}>
            <label htmlFor="todo-note" className="font-medium text-2xl">Add a Task</label>
            <input type="text" onChange={onTitleChange} name="title" id="todo-note" className="border-2 border-black p-1" />
            <br />
            <textarea name="description" onChange={onDescriptionChange} className="border-2 border-gray-500 p-1" ></textarea>
            <input type="submit" value="Add" className="border-2 border-black p-1" />
          </form>
          <div>
            <h1 className="font-extrabold">List of Tasks</h1>
            <ul className='grid grid-cols-2'>
              {info.data?.map((todo: { id: number; title: string; description: string }) => (
                <>
                  <li key={todo.id}>{todo.title}</li>
                  <button className='text-gray-500' onClick={() => deleteTodo(todo.id)}>Delete</button>
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
