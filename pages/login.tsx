import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

// Propsの型定義
interface LoginProps {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: FC<LoginProps> = ({ setIsAuth }) => {
  // Next.jsのルーターを使用
  const navigate = useRouter().push;

  // Googleでログインする処理
  const loginWithGoogle = async () => {
    try {
      // FirebaseとGoogleプロバイダーを使用してログイン
      await signInWithPopup(auth, provider).then((result) => {
        // ローカルストレージに認証情報を保存
        localStorage.setItem("isAuth", "true");

        // ステートを更新して認証情報をtrueに設定
        setIsAuth(true);

        // ユーザーにログイン成功を通知
        alert("ログインしました。");

        // ホームページにリダイレクト
        navigate("/");
      });
    } catch (error) {
      // エラーが発生した場合はユーザーに通知
      alert("ログインに失敗しました。");

      // コンソールにエラー情報を出力
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center py-24 px-12 bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
        <p className="text-2xl font-bold mb-4">
          Googleでログインして始める
        </p>
        <button className="mt-4 bg-white border rounded shadow" onClick={loginWithGoogle}>
          <Image
            src="/google.png"
            alt="Google"
            width={150}
            height={50}
            className="object-contain"
            objectFit="contain"
          />
        </button>
      </div>
    </div>

  );
};

export default Login;
