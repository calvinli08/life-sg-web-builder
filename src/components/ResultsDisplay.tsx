"use client";

import React, { useState } from "react";
import { Tab } from "@lifesg/react-design-system/tab";
import { Card } from "@lifesg/react-design-system/card";
import { renderNodes } from "@/src/utils/renderNodes";
import { GeneratedLayout } from "@/src/backend/schemas";
import { Prism } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ResultsDisplayProps {
  data: GeneratedLayout | null;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  if (!data) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", border: "2px dashed #ccc", borderRadius: "8px", background: "#fff" }}>
        Your generated application layout architecture canvas will appear here.
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      {data.thinkingSteps && (
        <div style={{ background: "#f0f4f8", padding: "1rem 1.5rem", borderRadius: "6px", marginBottom: "1.5rem", borderLeft: "4px solid #024b94" }}>
          <strong>AI Reasoning:</strong> {data.thinkingSteps}
        </div>
      )}

      {/* LifeSG Navigation System Component Mapping Hook */}
      <div style={{ marginBottom: "1rem" }}>
        <Tab currentActive={activeTab} onTabClick={(_, index) => setActiveTab(index)}>
          <Tab.Item title="Preview">
            <Card>
              {renderNodes(data.layout)}
            </Card>
          </Tab.Item>
          <Tab.Item title="Code">
            <Card>
              <Prism
                language="tsx"
                style={oneLight}
                customStyle={{ borderRadius: "6px", padding: "1rem" }}
                showLineNumbers
              >
                {String(renderNodes(data.layout, true))}
              </Prism>
            </Card>
          </Tab.Item>
        </Tab>
      </div>
    </div>
  );
};