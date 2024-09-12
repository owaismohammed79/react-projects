import { Postcard, Container } from "../components/index"
import { useEffect, useState } from "react"
import appwriteService from "../appwrite (service)/config"

function AllPosts() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        appwriteService.getPosts([]).then((allPosts) => {
            if(allPosts){
                setPosts(allPosts.documents)
            }
        })
    },[])
  return (
    <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
            {posts && posts.map((post) => 
            (
                <div key = {post.$id} className="p-2 w-1/4">
                    <Postcard post={post} />
                </div>
            ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts