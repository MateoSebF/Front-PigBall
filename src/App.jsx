import React from 'react';
import './styles/App.css';
import { PageLayout } from './components/main/PageLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import {MainGame} from './pages/game/MainGame';
import { Lobby } from './pages/lobby/Lobby';
import { Main } from './components/main/Main';

export default function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PageLayout />}>
                <Route index element={<HomePage />} />
            </Route>
            <Route path="/game/:id" element={<MainGame />} />
            <Route path="/homepage" element={<Main />}>
                <Route index element={<HomePage />} />
                <Route path="lobby" element={<Lobby />} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
}