import React from 'react';
import { useForm } from 'react-hook-form';

type Props = {
    user: {
        id: string,
        name: string,
        email: string,
    }
};

interface CreatePostForm {
    id: string,
    title: string,
    description: string,
    body: string,
    mainImage: string,
    publishedAt: string, 
    author: Props

}
function CreatePostForm({ user }: Props) {
    const { id, name, email } = user

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError
      } = useForm<CreatePostForm>();
  return (
    
    <form action="" className='flex flex-col mx-auto p-10 shadow-lg shadow-neutral-300 rounded-md my-8 bg-white
    md:w-1/3'>
        <input {...register('id')} name='id' value={id} type='hidden' />

          <label htmlFor=''>Title</label>
          <input type='text' 
          className='bg-zinc-50 rounded-md w-3/4 shadow my-2 h-10' />
          <label htmlFor=''>Description</label>
          <input type='text' 
          className='bg-zinc-50 rounded-md w-3/4 shadow my-2 h-10' />
          <label htmlFor=''>Body</label>
          <textarea
          className='bg-zinc-50 rounded-md w-3/4 shadow-md my-2 h-48 resize-none' />
          <label htmlFor=''>main image</label>
          <input type='text' 
          className='bg-zinc-50 rounded-md w-3/4 shadow my-2 h-10' />
          <label htmlFor=''>Published at:</label>
          <input type='text' 
          className='bg-zinc-50 rounded-md w-3/4 shadow my-2 h-10' />
          <label htmlFor=''>Author</label>
          <p>user info goes here</p>
 
          <button className='bg-green-600 py-2 px-16 text-white rounded-sm active:bg-green-700 mx-auto block my-10'> Create post</button>
    </form>
  );
}
export default CreatePostForm;
