//definition TS file
export interface PostProps {
    _id: string,
    _createdAt: string,
    title: string, 
    author: {
        name: string, 
        image: string,
    },
    description: string, 
    mainImage: {
        _type: 'string'
        asset: {
            //_ref: 'string',
            url: 'string'
        },
    },
    slug: {
        current: string
    },
    body: [object]
}