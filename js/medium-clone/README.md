# Nextjs Medium Clone

Using Server Side rendering for imprvoved performance and Sanity as the backend, this app aims to mimic [medium](https://medium.com/). It makes use of Incremental Static Regeneration that allows the page to be updated after it has been deployed. 
## Technologies

* Nextjs
* Typescript
* Sanity 
* Tailwindcss


## Personal Notes
### Sanity 

Configuring Sanity: 
The sanity client has to be configured in a sanity.ts file. This file uses 'createClient' to start up the sanity client. 

---
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

    //used for fetching data 
    export const sanityClient = createClient(config)

    //helper function to extract image urls
    export const urlFor = source => createImageUrlBuilder(config).image(source)
---

Configuring Api Endpoint: 

Creating schemas: 
They need to have a 'define type' and a 'define field'. 

* Define type: contains the name, title, and type of object
* Define field: contains name, title and type of each field
* A reference field can point to another entity like in a relational db. 

Once the schema is created it has to be imported and added to the 'schemaTypes' array in index.ts under schema folders.  

## React Hook Form 
To get data from the front end to the backend, first you have to define the form interface and assign it to the useForm hook.

---

    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<IformInput>();

---

Then use the *register* attribute in each input to grab the information. 

The form uses the *handleSubmit* destructured from the useForm hook to handle the form submission. This method invokes the form handler. i.e handleSubmit(doSomethingWithMyForm)

Errors can be displayed by error.*inputName* && *error handlement*

Delete a Document in Sanity:

    const mutations = [{
        delete: {
          id: 'rN1qi54kvWKs5FTfdm9Qsb',
        }
      }]
      
      const del = fetch(`https://${config.projectId}.api.sanity.io/v2021-06-07/data/mutate/${config.dataset}`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${config.token}`
        },
        body: JSON.stringify({mutations})
      })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.error(error))

## Todo
- [ ] render user posts in dashboard
- [ ] Protect user routes 
- [ ] add post preview in user dashboard