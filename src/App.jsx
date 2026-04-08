import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { featureFlags } from './lib/featureFlags.js'
import LabsPromoLandingPage from './pages/LabsPromoLandingPage.jsx'
import MainLandingPage from './pages/MainLandingPage.jsx'
import {
  AdminDashboardPage,
  LabsAppShell,
  LabsAuthPage,
  LabsCheckoutPage,
  LabsCoursePage,
  LabsLandingPage,
  LabsNotFoundPage,
  LabsPricingPage,
  ProtectedLabsRoute,
  StudentDashboardPage,
} from './pages/LabsPlatform.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/labs" element={<LabsPromoLandingPage />} />

        <Route
          path="/labs/app"
          element={
            featureFlags.enableLabsPlatform ? (
              <LabsAppShell />
            ) : (
              <Navigate replace to="/labs" />
            )
          }
        >
          <Route index element={<LabsLandingPage />} />
          <Route path="pricing" element={<LabsPricingPage />} />
          <Route path="register" element={<LabsAuthPage mode="register" />} />
          <Route path="login" element={<LabsAuthPage mode="login" />} />
          <Route path="checkout" element={<LabsCheckoutPage />} />

          <Route element={<ProtectedLabsRoute role="student" />}>
            <Route path="dashboard" element={<StudentDashboardPage />} />
            <Route path="course/:courseId" element={<LabsCoursePage />} />
          </Route>

          <Route element={<ProtectedLabsRoute role="admin" />}>
            <Route path="admin" element={<AdminDashboardPage />} />
          </Route>

          <Route path="*" element={<LabsNotFoundPage />} />
        </Route>

        <Route path="*" element={<MainLandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
