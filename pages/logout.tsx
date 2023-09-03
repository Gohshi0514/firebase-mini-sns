import { signOut } from "@firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { FC } from "react";

// Propsの型定義
interface LogoutProps {
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Logout: FC<LogoutProps> = ({ setIsAuth }) => {
    // Next.jsのルーターを使用
    const navigate = useRouter().push;

    // ログアウト処理
    const logout = async () => {
        try {
            // Firebaseを使用してログアウト
            await signOut(auth);

            // ローカルストレージから認証情報を削除
            localStorage.removeItem("isAuth");

            // ステートを更新して認証情報をfalseに設定
            setIsAuth(false);

            // ユーザーにログアウトしたことを通知
            alert("ログアウトしました。");

            // ログインページにリダイレクト
            navigate("/login");
        } catch (error) {
            // エラーが発生した場合はユーザーに通知
            alert("ログアウトに失敗しました。");

            // コンソールにエラー情報を出力
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center py-24 px-12 bg-gray-100">
            <div className="flex flex-col items-center justify-center w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
                <p className="text-2xl font-bold mb-4">
                    ログアウトしますか？
                </p>
                <button
                    className="flex items-center justify-center w-24 h-12 text-white bg-red-500 rounded-md"
                    onClick={logout}
                >
                    ログアウト
                </button>
            </div>
        </div>

    );
};

export default Logout;
