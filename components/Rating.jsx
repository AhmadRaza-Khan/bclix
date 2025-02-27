import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
const RatingStars = ({ rating }) => {

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="w-5 flex ">

        {[...Array(fullStars)].map((_, i) => (
          <StarOutlineOutlinedIcon key={i} sx={{'fontSize': 12}} className='text-black' />
        ))}
        {hasHalfStar && (
          <StarHalfOutlinedIcon sx={{'fontSize': 12}}  className='text-black' />
        )}
      </div>
    );
  };
  
  export default RatingStars;