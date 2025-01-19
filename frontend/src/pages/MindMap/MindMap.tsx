import { ReactFlowProvider } from "@xyflow/react";
import GraphContainer from "../../components/GraphContainer/GraphContainer.tsx";

export default function MindMap() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlowProvider>
        <GraphContainer />
      </ReactFlowProvider>
    </div>
  );
}
