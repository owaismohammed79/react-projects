import appwriteService from '.././appwrite (service)/config' //Isme post creation, deletion, preview wale fns he
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

//This is the card component which will render the blog posts in card format
function Postcard({
    $id, //This is the name given by react router dom i.e $id is the var name (we can't change)
    title,
    featuredImage,
}) {
  return (//Realize ki sab ko Link tag ke andar enclose kia h
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                {/*Idhar filePreview fn asks for fileId jisme ki featuredImage ki Id bhej rahe he kyunki uska preview chahiye na hame*/}
                <img src={appwriteService.filePreview(featuredImage)} alt ={title} className='rounded-xl'/>
            </div>
            <h2 className='text-xl font-bold'>
                {title}
            </h2>
        </div>
    </Link>
  )
}

Postcard.propTypes ={
    title: PropTypes.string.isRequired,
    $id: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired
}

export default Postcard