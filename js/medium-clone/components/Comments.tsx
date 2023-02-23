import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { PostProps } from '../typings';

interface IformInput {
    _id: string;
    name: string; 
    email: string;
    comment: string;
    //indicates that param is optional
  //lastName?: string
}

interface Props {
    post: PostProps
}
function Comments({ post }:Props) {
    const { 
        register,
        handleSubmit,             
        formState: { errors } } = useForm<IformInput>()

    const onHandleSubmit:SubmitHandler<IformInput> = async(data) => {
        
        console.log('data: ', data);
    }
  return (
    <form  onSubmit={handleSubmit(onHandleSubmit)} className='flex flex-col p-5 max-w-2xl mx-auto mb-10'>
        <h3 className='text-sm text-yellow-500'>Enjoyed the article?</h3>
        <h4 className='text-3xl font-bold'>Leave a comment below!</h4>
        <hr className='py-3 mt-2'/>

        allows us to pull data from the form
        <input 
        {...register('_id')}
        name='_id'
        value={post._id}
        type="hidden" />
        
        <label htmlFor="" className='block mb-5'>
            <span className='text-gra-700 '>Name</span>
            <input 
            {...register('name', { required: true })}
            className='shadow border rounded py-2 px-3 form-input mt-1 block w-full focus:ring ring-yellow-500 outline-none' placeholder='Johnny Appleseed' type="text" />
        </label>
        <label htmlFor="" className='block mb-5'>
            <span className='text-gra-700 '>Email</span>
            <input 
            {...register('email', { required: true })}
            className='shadow border rounded py-2 px-3 form-input mt-1 block w-full focus:ring ring-yellow-500 outline-none' placeholder='example@mail.com' type="email" />
        </label>
        <label htmlFor="" className='block mb-5'>
            <span className='text-gra-700 '>Comment</span>
            <textarea 
            {...register('comment', { required: true })}
            className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full focus:ring ring-yellow-500 resize-none outline-none' placeholder='Write down your thoughts here!' rows={8}/>
        </label>
        <div className='flex flex-col py-5'>
            {errors.name && <p className='text-red-600'>Name is required</p>}
            {errors.email && <p className='text-red-600'>Email is required</p>}
            {errors.comment && <p className='text-red-600'>Please write a comment</p>}
        </div>
        <input className='text-white bg-yellow-500 active:bg-yellow-600 py-2.5 rounded font-bold cursor-pointer' type='submit' placeholder='submit'/>
    </form>
  )
}

export default Comments