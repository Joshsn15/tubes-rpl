import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../components/Layout.jsx';

const FormLaporan = lazy(() => import('../pages/stockForm.tsx'));
const ReceivalBarang = lazy(() => import('../pages/receivalBarang.tsx'));
const StockPage = lazy(() => import('../pages/stockPage.jsx'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/form" element={<FormLaporan />} />
                    <Route path="/receival" element={<ReceivalBarang />} />
                    <Route path="/stock" element={<StockPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};