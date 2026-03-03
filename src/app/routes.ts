import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MyPlanPage } from "./pages/MyPlanPage";
import { AIAdvisorPage } from "./pages/AIAdvisorPage";
import { VerificationPage } from "./pages/VerificationPage";
import { CommunityPage } from "./pages/CommunityPage";
import { ImpactPage } from "./pages/ImpactPage";
import { InitiativesPage } from "./pages/InitiativesPage";
import { ProfilePage } from "./pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "my-plan", Component: MyPlanPage },
      { path: "ai-advisor", Component: AIAdvisorPage },
      { path: "verification", Component: VerificationPage },
      { path: "community", Component: CommunityPage },
      { path: "impact", Component: ImpactPage },
      { path: "initiatives", Component: InitiativesPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);