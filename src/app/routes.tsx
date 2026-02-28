import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { HomePage } from './pages/Home';
import { LoadingPage } from './pages/Loading';
import { ResultPage } from './pages/Result';
import { DailyTabooPage } from './pages/DailyTaboo';
import { LuckyShopPage } from './pages/LuckyShop';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'result', Component: ResultPage },
      { path: 'taboo', Component: DailyTabooPage },
      { path: 'shop', Component: LuckyShopPage },
    ],
  },
  {
    path: '/loading',
    Component: LoadingPage,
  },
]);
