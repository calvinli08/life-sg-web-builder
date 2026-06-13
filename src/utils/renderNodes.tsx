"use client";

import React from "react";

import { Button } from "@lifesg/react-design-system/button";
import { Card } from "@lifesg/react-design-system/card";
import { Alert } from "@lifesg/react-design-system/alert";
import { Input } from "@lifesg/react-design-system/input";
import { Textarea } from "@lifesg/react-design-system/input-textarea";
import { Layout } from "@lifesg/react-design-system/layout";
import { Typography } from "@lifesg/react-design-system/typography";

import reactElementToJSXString from 'react-element-to-jsx-string';

interface ComponentNode {
  id: string;
  component: string;
  props: any;
  children?: ComponentNode[];
}

export function renderNodes(layout: ComponentNode[], rawCode: boolean = false): React.JSX.Element | string {
  const renderNode = (node: ComponentNode): React.ReactNode => {
    const { component, props, id, children } = node;

    // Handle nested evaluations recursive step execution paths
    const evaluatedChildren = children && children.length > 0
      ? children.map(child => renderNode(child))
      : props.children || null;

    switch (component) {
      case "Button":
        return (
          <Button.Default key={id} styleType={props.styleType || "primary"} disabled={props.disabled} {...props}>
            {evaluatedChildren}
          </Button.Default>
        );
      
      case "Card":
        return (
          <Card key={id} {...props}>
            <div style={{ padding: "1.5rem" }}>
              {props.title && <Typography.HeadingMD>{props.title}</Typography.HeadingMD>}
              {props.description && <div style={{ margin: "0.5rem 0 1rem 0" }}>{props.description}</div>}
              {Array.isArray(evaluatedChildren) ? evaluatedChildren : null}
            </div>
          </Card>
        );

      case "Text":
        return (
          <Typography.BodyMD key={id} {...props}>
            {evaluatedChildren}
          </Typography.BodyMD>
        );

      case "Heading":
        // Maps down to appropriate internal structural heading tags wrapper abstractions
        return (
          <div key={id} style={{ marginBottom: "1rem" }}>
            <Typography.HeadingMD {...props}>
              {evaluatedChildren}
            </Typography.HeadingMD>
          </div>
        );

      case "Alert":
        return (
          <Alert key={id} type={props.type || "info"} title={props.title} {...props}>
            {evaluatedChildren}
          </Alert>
        );

      case "Input":
        return (
          <div key={id} style={{ marginBottom: "1.25rem", width: "100%" }}>
            <Input 
              data-testid={id}
              placeholder={props.placeholder || ""} 
              disabled={props.disabled}
              {...props}
            />
          </div>
        );

      case "Textarea":
        return (
          <div key={id} style={{ marginBottom: "1.25rem", width: "100%" }}>
            <Textarea 
              data-testid={id}
              placeholder={props.placeholder || ""}
              {...props}
            />
          </div>
        );

      case "LayoutGrid":
        return (
          <Layout.Container key={id} {...props}>
            {Array.isArray(evaluatedChildren) ? evaluatedChildren : null}
          </Layout.Container>
        );

      case "LayoutColumn":
        return (
          <Layout.ColDiv key={id} {...props}>
            {Array.isArray(evaluatedChildren) ? evaluatedChildren : null}
          </Layout.ColDiv>
        );

      default:
        return (
          <div key={id} style={{ color: "red", padding: "0.5rem", border: "1px dashed red" }}>
            Unsupported Element Context Module Type: {component}
          </div>
        );
    }
  };

  const jsxTree: React.JSX.Element = <div className="rendered-canvas-root">{layout.map((node: ComponentNode) => renderNode(node))}</div>;

  return rawCode ? reactElementToJSXString(jsxTree) : jsxTree;
};