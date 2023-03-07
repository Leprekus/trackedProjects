//definition TS file
export interface PostProps {
    _id: string,
    _createdAt: string,
    title: string, 
    user: {
        name: string, 
        image: string,
    },
    comments?: Comment[],
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
    body?: [object]
}
export interface PostData {
    // id: string,
    // createdAt: string,
    // title: string, 
    // user: {
    //     name: string, 
    //     image: string,
    // },
    // comments?: Comment[],
    // description: string, 
    // mainImage: {
    //     _type: 'string'
    //     asset: {
    //         //_ref: 'string',
    //         url: 'string'
    //     },
    // },
    // slug: {
    //     current: string
    // },
    // body: [object]
    //
    slug
    id
    createdAt
    title
    user
    description
    mainImage
    body
}

export interface Comment {
    approved: boolean, 
    comment: string, 
    email: string, 
    name: string, 
    post: {
        _ref: string, 
        _type: string,
    };
    _createdAt: string, 
    _id: string, 
    _rev: string, 
    _type: string, 
    _updatedAt: string
}

export type User = {
     
        id: string, 
        name: string, 
        email: string,
        admin?: boolean 
   
}