import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import PageLayout from '../components/layout/PageLayout';
import ChartSection from '../components/layout/ChartSection';
import Community from '../pages/Community';
import WritePage from '../pages/WritePage';
import ReadPost from '../components/board/ReadPost';
import ViewChart from '../pages/ViewChart';

const AppRoutes = () => (
  <Routes>
    {/* 메인 페이지 */}
    <Route
      path="/"
      element={
        <MainLayout>
          <ChartSection />
        </MainLayout>
      }
    />
    {/* 커뮤니티 및 기타 페이지 */}
    <Route
      path="/community"
      element={
        <PageLayout>
          <Community />
        </PageLayout>
      }
    />
    <Route
      path="/post"
      element={
        <PageLayout>
          <WritePage />
        </PageLayout>
      }
    />
    <Route
      path="/v1/posts/:postId"
      element={
        <PageLayout>
          <ReadPost />
        </PageLayout>
      }
    />
    <Route
      path="/chart"
      element={
        <PageLayout>
          <ViewChart />
        </PageLayout>
      }
    />
  </Routes>
);

export default AppRoutes;
