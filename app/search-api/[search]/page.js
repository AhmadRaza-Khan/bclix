import { searchApi } from '@/actions/page';
import Link from 'next/link';
const Search = async({ params }) => {
  const { search } = await params;
  const result = await searchApi(search);
  const {title, description, clients, image, category} = result.data;
  
  
  return (
<div className='flex flex-col py-20 gap-3 items-center justify-center'>
      
      <div className="card glass w-96">
    <figure>
      <img
      className='contain w-full h-60'
        src={image}
        alt="car!" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{description}</p>

<div>
<p className="text-xs">Completed Projects: {clients}</p>
<p className="text-xs">Category: {category}</p>
</div>
    </div>
  </div>
  <Link href={"/search-api"} className="btn w-96 btn-active btn-warning">Go back</Link>
    </div>
  )
}

export default Search