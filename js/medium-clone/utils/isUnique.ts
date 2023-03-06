// sample Response
// [...] 3 items
// 0:{…} 1 property
// slug:{…} 1 property
// current:this-is-my-first-post
// 1:{…} 1 property
// slug:{…} 1 property
// current:cars
// 2:{…} 1 property
// slug:{…} 1 property
// current:cars
interface Query {
  slug: {
    current: string;
  };
}
export default function isUnique(title: string, query: Array<Query>) {
  const slugify = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    .slice(0, 200);

  const slugs = query.map((parent) => parent.slug.current);

  //if no duplicate slug return
  if(slugs.length < 1) {
      return slugify;
  }
  //if duplicate slug:
  const parsedSlugs = slugs.map<number>(slug => {
      const split = slug.split('-')
      const sliced:string = split.slice(split.length - 1).toString()
      return parseInt(sliced)
    })
    //if 1 duplicate add counter
    if(parsedSlugs.length === 1 && isNaN(parsedSlugs[0])) {
        return `${slugify}-${1}`
    }
  //if multiple duplicates grab biggest counter and add 1 & removes NaN from array
  const sortedSlugs = parsedSlugs.filter(num => !isNaN(num)).sort((a:number, b:number)=> a - b)
  let counter = sortedSlugs[sortedSlugs.length - 1] > 0 ? sortedSlugs[sortedSlugs.length - 1] : 0
  return `${slugify}-${counter += 1}`
}

[];
