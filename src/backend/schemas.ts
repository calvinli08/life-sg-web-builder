import { z } from "zod";

// 1. Define a strict TypeScript interface representing the shape of a single node
export interface ComponentNode {
  id: string;
  component: 
    | "Button" | "Card" | "Heading" | "Alert" | "Textarea" | "Input"
    | "DateInput" | "Accordion" | "Select" | "Checkbox" | "RadioButton"
    | "SingpassButton" | "Toggle" | "NavBar" | "Pagination" | "Grid" | "Column";
  props: Record<string, any>;
  children?: ComponentNode[]; // Recursive array reference
}

// 2. Pass the interface into z.ZodType to explicitly type the Zod schema
export const ComponentSchema: z.ZodType<ComponentNode> = z.lazy(() =>
  z.object({
    id: z.string().describe("A unique identifier for the element instance"),
    component: z.enum([
      "Button", "Card", "Heading", "Alert", "Textarea", "Input",
      "DateInput", "Accordion", "Select", "Checkbox", "RadioButton",
      "SingpassButton", "Toggle", "NavBar", "Pagination", "Grid", "Column"
    ]).describe("The target LifeSG design system component mapping type"),
    // Use explicit key and value schemas to satisfy Zod typing expectations
    props: z.record(z.string(), z.any()).describe("A flat mapping of permitted props matching LifeSG API specs"),
    // Using ComponentSchema here is now completely type-safe
    children: z.array(ComponentSchema).optional().describe("Nested child elements for structural container wrappers")
  })
);

export const GeneratedLayoutSchema = z.object({
  thinkingSteps: z.string().describe("Internal logical chain explaining construction rules utilized"),
  layout: z.array(ComponentSchema).describe("Sequential layout schema parsing queue mapping to the target Single Page App UI canvas")
});

export type GeneratedLayout = z.infer<typeof GeneratedLayoutSchema>;