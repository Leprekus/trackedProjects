import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'userPost',
  title: 'User Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
        title: 'Slug',
        name: 'slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 200, // will be ignored if slugify is set
          slugify: input => input
                               .toLowerCase()
                               .replace(/\s+/g, '-')
                               .slice(0, 200)
        }
      }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
    //switch to blockContent / block
      name: 'body',
      title: 'Body',
      type: 'string',
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: {type: 'user'},
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'user.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
