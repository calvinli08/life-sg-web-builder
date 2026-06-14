"use client";

import React from "react";

import { Button } from "@lifesg/react-design-system/button";
import { Card } from "@lifesg/react-design-system/card";
import { Alert } from "@lifesg/react-design-system/alert";
import { Input } from "@lifesg/react-design-system/input";
import { Textarea } from "@lifesg/react-design-system/input-textarea";
import { DateInput } from "@lifesg/react-design-system/date-input";
import { Accordion } from "@lifesg/react-design-system/accordion";
import { InputSelect } from "@lifesg/react-design-system/input-select";
import { Checkbox } from "@lifesg/react-design-system/checkbox";
import { RadioButton } from "@lifesg/react-design-system/radio-button";
import { Toggle } from "@lifesg/react-design-system/toggle";
import { Navbar } from "@lifesg/react-design-system/navbar";
import { Pagination } from "@lifesg/react-design-system/pagination";
import { Layout } from "@lifesg/react-design-system/layout";
import { Typography } from "@lifesg/react-design-system/typography";
import { SingpassButton } from "@lifesg/react-design-system/singpass-button";

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
        const { styleType } = props;
        return (
          <Button.Default key={id} styleType={styleType || "primary"}>
            {evaluatedChildren}
          </Button.Default>
        );
      
      case "Card":
        const { title: cardTitle, description: cardDescription } = props;
        return (
          <Card key={id} >
            <div style={{ padding: "1.5rem" }}>
              {cardTitle && <Typography.HeadingMD>{cardTitle}</Typography.HeadingMD>}
              {cardDescription && <div style={{ margin: "0.5rem 0 1rem 0" }}>{cardDescription}</div>}
              {Array.isArray(evaluatedChildren) ? evaluatedChildren : null}
            </div>
          </Card>
        );

      case "Text":
        return (
          <Typography.BodyMD key={id} data-display-name="Text" >
            {evaluatedChildren}
          </Typography.BodyMD>
        );

      case "Heading":
        // Maps down to appropriate internal structural heading tags wrapper abstractions
        return (
          <Typography.HeadingMD key={id} data-display-name="Heading" style={{ marginBottom: "1rem" }} >
            {evaluatedChildren}
          </Typography.HeadingMD>
        );

      case "Alert":
        const { type, title } = props;
        return (
          <Alert key={id} type={type || "info"} title={title}>
            {evaluatedChildren}
          </Alert>
        );

      case "Input":
        return (
          <Input 
            key={id} 
            data-display-name="Input"
            style={{ marginBottom: "1.25rem", width: "100%" }}
            data-testid={id}
            placeholder={props.placeholder || ""}
          />
        );

      case "Textarea":
        return (
          <Textarea 
            key={id} 
            data-display-name="Textarea"
            style={{ marginBottom: "1.25rem", width: "100%" }}
            data-testid={id}
            placeholder={props.placeholder || ""}
          />
        );

      case "DateInput":
        return (
          <DateInput
            key={id} 
            data-display-name="DateInput"
            data-testid={id}
          />
        );

      case "Accordion":
        const { title: accordionTitle } = props;
        return (
          <Accordion key={id} title={accordionTitle} >
            {evaluatedChildren}
          </Accordion>
        );

      case "Select":
        const { options: selectOptions, label: selectLabel } = props;
        return (
          <InputSelect
            key={id} 
            data-display-name="Select"
            style={{ marginBottom: "1.25rem", width: "100%" }}
            data-testid={id}
            options={selectOptions?.map((opt: string) => ({ label: opt, value: opt })) || []}
          />
        );

      case "Checkbox":
        const { label: cbLabel, checked: cbChecked } = props;
        return (
          <Checkbox key={id} checked={cbChecked} data-display-name="Checkbox" />
        );

      case "RadioButton":
        const { label: rbLabel, checked: rbChecked } = props;
        return (
          <RadioButton key={id} data-display-name="RadioButton" />
        );

      case "SingpassButton":
        const { action } = props;
        return (
          <SingpassButton.Default key={id} data-display-name="SingpassButton">
            {action || "Login with Singpass"}
          </SingpassButton.Default>
        );

      case "Toggle":
        const { label, enabled } = props;
        return <Toggle key={id} indicator={enabled} data-display-name="Toggle">{label}</Toggle>

      case "NavBar":
        const { items } = props;
        return <Navbar key={id} items={items}  />

      case "Pagination":
        const { pageSize, totalItems, activePage} = props;
        return (
          <Pagination 
            key={id}
            pageSize={pageSize}
            totalItems={totalItems}
            activePage={activePage}
            data-display-name="Pagination"
          />
        );

      case "Grid":
        return (
          <Layout.Container type="grid" key={id} data-display-name="Grid">
            {Array.isArray(evaluatedChildren) ? evaluatedChildren : null}
          </Layout.Container>
        );

      case "Column":
        return (
          <Layout.Container type="flex-column" key={id} data-display-name="Column">
            {Array.isArray(evaluatedChildren) ? evaluatedChildren : null}
          </Layout.Container>
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

  return rawCode ? reactElementToJSXString(jsxTree, {displayName: (element: any) => element?.props["data-display-name"] || "Component"}) : jsxTree;
};