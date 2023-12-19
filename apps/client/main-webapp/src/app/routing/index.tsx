import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("src/pages/home"));
const TestPage = lazy(() => import("src/pages/test"));
const AuthPage = lazy(() => import("src/pages/auth"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="test" element={<TestPage/>}/>
      </Route>
      <Route path="/auth" element={<AuthPage/>}/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}