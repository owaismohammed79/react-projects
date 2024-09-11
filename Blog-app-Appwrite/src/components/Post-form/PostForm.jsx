import  {useCallback, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux' //To associate userData with the blog that the user is creating. This is important because we need to know who created the blog.
import {Button, Input, RTE, Select} from "../index";
import appwriteService from "../../appwrite (service)/config";
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types'


//This component is the form to create a new blog post which makes use of the RTE comp and image, title and stuff and then 
//upload it in the db. It is also for updating the blog posts. See how it extracts the data from the previous blog post if it exists
function PostForm({post}) {
    //The post argument is to indicate if there was already existing blog then give its data
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData) //Realize that  useSelector has access to state and actions by default and auth was the name of the slice that was given. We are extracting userData is coz we need his ID so that we can associate it with his blog.
    const {register, handleSubmit, watch, getValues, control, setValue} = useForm({
      defaultValues: {
        title: post ?.title || '',
        slug: post?.slug || '',
        content: post?.content || '',
        status: post?.status || 'active'
      } //Trying to set the values in the form if the user is trying tp edit an existing form. Check the syntax too
    })

    const submit = async (data) => {
      if(post){
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
        if(file) {
          await appwriteService.deleteFile(post.featuredImage) //Realize that featuredImage is the same name that we used in the dbservice (appwriteservice). The old image is being deleted and new img was uploaded as the img and the blog post are stored separately. And henceforth they are acting like two separate entities, all that we are storing in the dbPost is the image's ID
        }
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined
          //If file is present then set its ID (given var name is $id) else set undefined
        })
        if(dbPost) navigate(`/posts/${dbPost.$id}`) //dbPosts ID is being used!!!!
      } else {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
        if(file) {
          const fileId = file.$id; //Extracting the image ID as in the data we won't get the image ID just that the img would've uploaded in the DB
          data.featuredImage = fileId; //setting the attribute 
          const dbPost = await appwriteService.createPost({...data, userId: userData.$id}) //Associating the user with the blog post
          if(dbPost) navigate(`/posts/${dbPost.$id}`)
        }
      }
    }

    const slugTransform = useCallback((value) => { //Function to transform the string into a slug
      if(value && typeof(value) === 'string'){
        return value
         .trim()
         .toLowerCase()
         .replace(/^[a-zA-Z\d\s]+/g, '-')
         .replace(/\s/g, '-')
      }
      return ''
    },[])

    useEffect(() => {
      const subscription = watch((value, {name}) => {
        if(name === 'title'){
          setValue('slug', slugTransform(value.title, 
            {shouldValidate: true}
          )) //Here slug is the input field name where we want to set the value and we will set it with whatever the fn is returning us. value is actually the whole object with title, content... Not just that we are also validating it by giving another object as i/p 

        }
      })
      //Inside of useEffect you have called any function and now you want to optimize it then store it some var like this and then in the return statement we can have a callback which does the varname.unsubscribe()
      return () => { 
        subscription.unsubscribe()
      }
    }, [watch, slugTransform, setValue]) //setValue wali dependency nahi bhulna

  return (
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    //If user directly tries to type in then too transform it and set it. onInput attribute useCase
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            {/*See above as to how we are extracting the older blog post content by making use of getValues function and setting it onto our RTE */}
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {/*See above that img types are also given*/}
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            {/*Showing the uploaded img's preview on screen */}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}

PostForm.propTypes = {
  post: PropTypes.object
}

export default PostForm