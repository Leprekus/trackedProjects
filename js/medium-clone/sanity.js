import createImageUrlBuilder from '@sanity/image-url'
import {
    createCurrentUserHook,
    createClient
} from 'next-sanity';

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
    apiVersion: '2021-10-21',

    useCdn: process.env.NODE_ENV === 'production'
}

//used for fetcing data 
export const sanityClient = createClient(config)

//helper function to extract image urls
export const urlFor = source => createImageUrlBuilder(config).image(source)