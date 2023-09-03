import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { useRouter } from "next/router";

// Propsの型定義
interface CreatePostProps {
    isAuth: boolean;
}

const CreatePost: React.FC<CreatePostProps> = ({ isAuth }) => {
    // ステートの初期化
    const [title, setTitle] = useState<string>("");
    const [postText, setPostText] = useState<string>("");
    const navigate = useRouter().push;

    // 投稿作成関数
    const createPost = async () => {
        // ユーザーが認証されているか確認
        if (auth.currentUser) {
            // Firestoreに新しい投稿を追加
            await addDoc(collection(db, "posts"), {
                title: title,
                postText: postText,
                author: {
                    id: auth.currentUser.uid,
                    username: auth.currentUser.displayName || "Anonymous",
                },
            });
            // ホームページにリダイレクト
            navigate("/");
        } else {
            alert("User not authenticated");
        }
    };

    // 認証状態に基づいてリダイレクト
    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth, navigate]);

    return (
        <div className="flex flex-col items-center justify-center py-24 bg-gray-100">
            <div className="createContainer w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="font-bold text-xl mb-4">記事を投稿する</h1>
                <div className="inputPost">
                    <div className="font-bold mt-2">タイトル</div>
                    <input
                        type="text"
                        placeholder="タイトルを入力してください"
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-2 mt-2 rounded-md w-full p-2"
                    ></input>
                    <div className="inputPost mt-4">
                        <div className="font-bold mt-2">投稿</div>
                        <textarea
                            placeholder="投稿内容を入力してください"
                            onChange={(e) => setPostText(e.target.value)}
                            className="border-2 mt-2 rounded-md w-full p-2 h-32"
                        ></textarea>
                    </div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        onClick={() => createPost()}
                    >
                        投稿
                    </button>
                </div>
            </div>
        </div>

    );
};

export default CreatePost;
