import CreatePostCard from '@/components/CreatePostCard';


interface CreatePostProps {
    isAuth: boolean;
}

const CreatePost: React.FC<CreatePostProps> = ({ isAuth }) => {

    return (
        <>
          <CreatePostCard isAuth={isAuth} />
        </>
    );
};

export default CreatePost;
