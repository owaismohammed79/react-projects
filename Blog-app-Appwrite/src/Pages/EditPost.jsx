import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../components/index'
import appwriteService from "../appwrite (service)/config"

function EditPost() {
    const [posts, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                setPosts(post)
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

  return posts ? (
    <div className='py-8'>
        <Container>
            <PostForm post={posts} />
        </Container>
    </div>
  ) : (<div className='text-center w-full py-8 font-bold'>Post not found</div>)
}

export default EditPost