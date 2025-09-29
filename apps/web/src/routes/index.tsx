// apps/web/src/routes/index.tsx
import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CoinHistory from '@/pages/CoinHistory';

const routes = [
    { path: '/', element: <Home /> },
    { path: '/:id/historial', element: <CoinHistory /> },
];

const AppRoutes: FC = () => {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    );
};

export default AppRoutes;
