import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../../pages/Home";
import RBBadges from "../../pages/RBBadges";
import RBBreadcrumbs from "../../pages/RBBreadcrumbs";
import RBButtonGroups from "../../pages/RBButtonGroups";
import RBButtons from "../../pages/RBButtons";
import RBCards from "../../pages/RBCards";
import RBImages from "../../pages/RBImages";
import RBListGroup from "../../pages/RBListGroup";
import RBFigure from "../../pages/RBFigure";
import RBPagination from "../../pages/RBPagination";
import RBProgressBars from "../../pages/RBProgressBars";
import RBSpinners from "../../pages/RBSpinners";
import RBTables from "../../pages/RBTables";
import RBAccordion from "../../pages/RBAccordion";
import RBCarousel from "../../pages/RBCarousel";
import RBDropdowns from "../../pages/RBDropdowns";
import RBModal from "../../pages/RBModal";
import RBNavbarOffCanvas from "../../pages/RBNavbarOffCanvas";
import RBNavTabs from "../../pages/RBNavTabs";
import RBOverlays from "../../pages/RBOverlays";
import RBForms from "../../pages/RBForms";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "home", element: <Home /> },
            { path: "badges", element: <RBBadges /> },
            { path: "breadcrumbs", element: <RBBreadcrumbs /> },
            { path: "buttongroup", element: <RBButtonGroups /> },
            { path: "buttons", element: <RBButtons /> },
            { path: "cards", element: <RBCards /> },
            { path: "images", element: <RBImages /> },
            { path: "listgroup", element: <RBListGroup /> },
            { path: "figure", element: <RBFigure /> },
            { path: "pagination", element: <RBPagination /> },
            { path: "progressbar", element: <RBProgressBars /> },
            { path: "spinner", element: <RBSpinners /> },
            { path: "tables", element: <RBTables /> },
            { path: "accordion", element: <RBAccordion /> },
            { path: "carousel", element: <RBCarousel /> },
            { path: "dropdowns", element: <RBDropdowns /> },
            { path: "modal", element: <RBModal /> },
            { path: "navbaroffcanvas", element: <RBNavbarOffCanvas /> },
            { path: "navtabs", element: <RBNavTabs /> },
            { path: "overlays", element: <RBOverlays /> },
            { path: "forms", element: <RBForms /> },
        ]
    }
]);