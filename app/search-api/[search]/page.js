import { searchApi } from '@/actions/page';
const Search = async({ params }) => {
  const { search } = await params;
  const result = await searchApi(search);
  const {title, description, clients, image, category} = result.data;
  
  
  return (
    <div className='flex items-center justify-center py-96'>
      
      <div className="card glass w-96">
    <figure>
      <img
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
    </div>
  )
}

export default Search