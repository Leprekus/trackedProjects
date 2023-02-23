import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'text',
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
    }),
    defineField({
        name: 'post',
        title: 'Post',
        type: 'reference',
        to: {type: 'post'},
      }),
  ],
})