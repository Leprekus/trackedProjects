import React, { FormEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import Alert from './Alert';

import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

interface CreatePostFormProps {
  id: string;
  title: string;
  description: string;
  body: string;
  mainImage: string;
  publishedAt: string;
  author: Props;
}
function CreatePostForm({ user }: Props) {
  const { id, name, email } = user;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<CreatePostFormProps>();
  const today = new Date()
  const [selected, setSelected] = useState<Date | undefined>(today);
  const [submitted, setSubmitted] = useState(false)
  const [convertedText, setConvertedText] = useState('');

  const handleEditorChange = (state:any) => {
    console.log(convertedText)
    setConvertedText(state)
  }
  const handleCreatePost: SubmitHandler<CreatePostFormProps> = async (data) => {
    const date = selected?.toISOString()
    const newData = {
        ...data, 
        body: convertedText,
        publishedAt: date
    }
    await fetch('/api/user/createPost', {
        method: 'POST',
        body: JSON.stringify(newData)
    }).then((res) => {
        if (!res.ok) {
          throw new Error('Bad Response', {
            cause: { res },
          });
        }
        setSubmitted(true);
        return res.json()
      })
      .then(data => console.log( data ))
      .catch((e) => {
        setSubmitted(false);
        switch (e.cause.res?.status) {
          case 400:
            console.log('Bad request');
            break;
          case 401:
            console.log('Aunauthorized response');
            break;
          case 404:
            console.log('Not found');
            break;
          case 500:
            console.log('Internal server error', { e });
            break;
        }
      });
    console.log(newData)
    console.log(JSON.stringify(window.HTMLBodyElement, null ,2))
  }
 
  return (
    <form
      onSubmit={handleSubmit(handleCreatePost)}
      action=''
      className='flex flex-col mx-auto p-10 shadow-lg shadow-neutral-300 rounded-md my-8 bg-white
    md:w-1/3'
    >
      <input {...register('id')} name='id' value={id} type='hidden' />

      <label htmlFor=''>Title</label>
      <input
        {...register('title', { required: 'Please give your post a title'})}
        type='text'
        className='bg-zinc-50 rounded-md w-3/4 shadow my-2 h-10'
      />
      {errors.title && <p className='text-red-400'>{errors.title?.message}</p>}

      <label htmlFor=''>Description</label>
      <input
        {...register('description')}
        type='text'
        className='bg-zinc-50 rounded-md w-3/4 shadow my-2 h-10'
      />

        <div className='mb-16'>
        <ReactQuill
        theme='snow'
        value={convertedText}
        onChange={handleEditorChange}
        placeholder='Write down your ideas!'
        className='h-96'

      />
      </div>
      

      {/* <label htmlFor=''>main image</label>
      <input
        {...register('mainImage')}
        type='text'
        className='bg-zinc-50 rounded-md w-3/4 shadow my-2 h-10'
      /> */}

      <label htmlFor=''>Date</label>
      <DayPicker
        mode='single'
        selected={selected}
        onSelect={setSelected}
        footer={
          selected ? (
            <p>Published on {format(selected, 'PPP')}.</p>
          ) : (
            <p>Please pick a day.</p>
          )
        }
      />
      <input 
      {...register('author')}
      className='bg-slate-200 p-6 text-slate-600 font-semibold rounded-md shadw-inner focus:outline-none' value={`Created by: ${name}`} readOnly/>

      <button className='bg-green-600 py-2 px-16 text-white rounded-sm active:bg-green-700 mx-auto block my-10'>
        {' '}
        Create post
      </button>
      {submitted && <Alert
      severity='alert'
      >Post created successfuly</Alert>}
    </form>
  );
}
export default CreatePostForm;
