import Layout from '@/components/Layout';
import Meta from '@/components/Meta';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  // ステートで認証状態を管理
  const [isAuth, setIsAuth] = useState(false);

  // useEffectでページが読み込まれたときにローカルストレージから認証状態を取得
  useEffect(() => {
    // ローカルストレージから認証状態を取得
    const authStatus = localStorage.getItem('isAuth');

    // ステートを更新して認証状態を設定
    // !!authStatus は authStatus が存在する場合は true、そうでない場合は false を返す
    setIsAuth(!!authStatus);
  }, []);

  return (
    // Layoutコンポーネントをラップし、isAuthステートを渡す
    <Layout isAuth={isAuth}>
      {/* 現在のページコンポーネントをレンダリングし、isAuthとsetIsAuthをpropsとして渡す */}
      <Component {...pageProps} isAuth={isAuth} setIsAuth={setIsAuth} />
    </Layout>
  );
}
