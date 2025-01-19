import { BrowserRouter, Route, Routes } from "react-router";
import "@xyflow/react/dist/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MindMap from "../../pages/MindMap/MindMap.tsx";
import Glossary from "../../pages/Glossary/Glossary.tsx";
import Layout from "../Layout/Layout.tsx";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="mindmap" element={<MindMap />} />
            <Route path="glossary" element={<Glossary />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
