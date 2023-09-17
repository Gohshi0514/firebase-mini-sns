import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";  // orderByをインポート
import { db } from "../utils/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { auth } from "../utils/firebase";

// 投稿の型定義
type Post = {
  id: string;
  author: { id: string; username: string };
  postText: string;
  title: string;
  createdAt: any;  // 追加
};

export default function Home() {
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));  // クエリを作成
      const posts = await getDocs(q);  // クエリを使用してデータを取得

      setPostList(
        posts.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Post))
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
    <div className="flex flex-col items-center justify-center pt-12">
      {postList.map((post) => (
        <div
          className="mx-4 my-8 p-4 rounded-md shadow-md w-11/12 md:max-w-screen-lg bg-white"
          key={post.id}
        >
          <div className="md:flex justify-between items-center mb-4">
            <h1 className="font-bold text-xl mb-2">
              {post.title}
            </h1>
            <span className="text-sm text-gray-500">
              {/* 日付と時間(日本時間) */}
              {new Date(post.createdAt).toLocaleString('ja-JP')}
            </span>

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
