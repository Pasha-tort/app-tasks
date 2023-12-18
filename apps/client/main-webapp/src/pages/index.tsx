import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("./home"));
const TestPage = lazy(() => import("./test"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="test" element={<TestPage/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}