import { FC } from 'react';
import Header from './Header';

// Propsの型定義
interface LayoutProps {
    children: React.ReactNode; // 子コンポーネント
    isAuth: boolean; // 認証状態
}

const Layout: FC<LayoutProps> = ({ children, isAuth }) => {
    return (
        <>
            {/* Headerコンポーネントに認証状態を渡す */}
            <Header isAuth={isAuth} />
            {/* 子コンポーネントをレンダリング */}
            {children}
        </>
    );
};

export default Layout;
