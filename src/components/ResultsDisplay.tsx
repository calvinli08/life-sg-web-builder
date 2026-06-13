"use client";

import React, { useState } from "react";
import { Tab } from "@lifesg/react-design-system/tab";
import { Card } from "@lifesg/react-design-system/card";
import { renderNodes } from "@/src/utils/renderNodes";
import { GeneratedLayout } from "@/backend/schemas";

interface ResultsDisplayProps {
  data: GeneratedLayout | null;
}

const convertToJSX = (nodes: any[]): string => {
  const getComponentName = (type: string) => {
    const map: Record<string, string> = {
      Button: "Button.Default",
      Card: "Card",
      Heading: "Typography.HeadingMD",
      Text: "Typography.BodyMD",
      Alert: "Alert",
      Input: "Input",
      Textarea: "Textarea",
      LayoutGrid: "Layout.Container",
      LayoutColumn: "Layout.ColDiv",
    };
    return map[type] || type;
  };

  const renderNode = (node: any, depth = 0): string => {
    const indent = "  ".repeat(depth);
    const name = getComponentName(node.component);
    
    const propsArray = [`key="${node.id}"`];
    Object.entries(node.props).forEach(([k, v]) => {
      if (k === "children") return;
      propsArray.push(typeof v === "string" ? `${k}="${v}"` : `${k}={${JSON.stringify(v)}}`);
    });

    const propsStr = propsArray.join(" ");
    const hasChildren = (node.children && node.children.length > 0) || node.props.children;

    if (!hasChildren) {
      return `${indent}<${name} ${propsStr} />`;
    }

    const childrenJSX = node.children && node.children.length > 0
      ? "\n" + node.children.map((c: any) => renderNode(c, depth + 1)).join("\n") + `\n${indent}`
      : node.props.children;

    return `${indent}<${name} ${propsStr}>${childrenJSX}</${name}>`;
  };

  return nodes.map((n) => renderNode(n)).join("\n");
};

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
              {renderNodes(data.layout, true)}
            </Card>
          </Tab.Item>
        </Tab>
      </div>
    </div>
  );
};