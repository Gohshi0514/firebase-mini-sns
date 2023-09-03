import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { auth } from "../utils/firebase";

// 投稿の型定義
type Post = {
  id: string;  // 追加
  author: { id: string; username: string };
  postText: string;
  title: string;
};

export default function Home() {
  // ステートで投稿一覧を管理
  const [postList, setPostList] = useState<Post[]>([]);

  // useEffectで投稿一覧を取得
  useEffect(() => {
    const getPosts = async () => {
      // 投稿一覧を取得
      const posts = await getDocs(collection(db, "posts"));

      // 投稿一覧をステートに設定
      setPostList(
        posts.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Post))  // as Post で型を明示
      );
    };
    getPosts();
  }, []);

  // 投稿を削除する処理
  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
    window.location.href = "/";
    alert("削除しました。");
  };

  return (
    <div className="flex flex-col items-center justify-center py-24">
      {postList.map((post) => (
        <div
          className="mx-4 my-8 p-4 rounded-md shadow-md w-full max-w-md bg-white"
          key={post.id}
        >
          <div className="mb-4">
            <h1 className="font-bold text-xl mb-2">
              {post.title}
            </h1>
          </div>
          <div className="postContainer mb-4">
            <p className="text-base">
              {post.postText}
            </p>
          </div>
          <div className="nameDeletebtn flex justify-between items-center">
            <h3 className="text-xl">
              @{post.author ? post.author.username : "No author"}
            </h3>
            {auth.currentUser && post.author && post.author.id === auth.currentUser.uid && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deletePost(post.id)}
              >
                削除
              </button>
            )}
          </div>
        </div>
      ))}
    </div>

  );
}
