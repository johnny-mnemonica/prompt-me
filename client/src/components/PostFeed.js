import Post from './Post'

const PostFeed = ({data}) => {
    
    return (
        <>
        { data.map((post) => {
            return <Post key={Math.floor(Math.random() * 14000000)} 
            postData={post}/>
        })}
        </>
    )
}

export default PostFeed;