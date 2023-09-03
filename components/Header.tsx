import { FC } from "react";
import Link from "next/link";

// Propsの型定義
interface HeaderProps {
    isAuth: boolean;
}

const Header: FC<HeaderProps> = ({ isAuth }) => {
    return (
        <header className="flex items-center justify-center w-full h-24 bg-white shadow-md">
            <div className="gap-4 flex">
                <Link
                    href="/"
                    className="flex items-center justify-center w-24 h-12 text-white bg-blue-500 rounded-md"
                >
                    ホーム
                </Link>

                {/* 認証状態に応じて表示するボタンを変更 */}
                {!isAuth ? (
                    // 未認証の場合はログインボタンを表示
                    <Link
                        href="/login"
                        className="flex items-center justify-center w-24 h-12 text-white bg-blue-500 rounded-md"
                    >
                        ログイン
                    </Link>
                ) : (
                    // 認証済みの場合は投稿とログアウトボタンを表示
                    <>
                        <Link
                            href="/createpost"
                            className="flex items-center justify-center w-24 h-12 text-white bg-blue-500 rounded-md"
                        >
                            投稿する
                        </Link>
                        <Link
                            href="/logout"
                            className="flex items-center justify-center w-24 h-12 text-white bg-red-500 rounded-md"
                        >
                            ログアウト
                        </Link>
                    </>
                )}
            </div>
        </header>

    );
};

export default Header;
