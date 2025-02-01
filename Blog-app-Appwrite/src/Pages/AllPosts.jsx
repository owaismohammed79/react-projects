import { Postcard, Container } from "../components/index"
import { useEffect, useState } from "react"
import appwriteService from "../appwrite (service)/config"
import Loading  from "../components/ui/Loading"
import { useSelector } from 'react-redux'

function AllPosts() {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const posts = useSelector(state => state.posts.posts)

    const loadImages = async () => {
        if(posts){
            const imagePromises = posts.map(post => appwriteService.filePreview(post.featuredImage));
            await Promise.all(imagePromises);
            setImagesLoaded(true);
        }
    }

    useEffect(() => {
        loadImages();
    },[])

    if(!imagesLoaded) {
        return <div className="w-full flex justify-center items-center font-bold h-screen">
            <Loading />
        </div>
    }

    if(!posts || posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center min-h-screen">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts found
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                {posts && posts.map((post) => 
                (
                    <div key = {post.$id} className="p-2">
                        <Postcard {...post} />
                    </div>
                ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts