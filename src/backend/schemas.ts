import { z } from "zod";

export const ComponentSchema = z.object({
  id: z.string().describe("A unique identifier for the element instance"),
  component: z.enum([
    "Button", 
    "Card", 
    "Heading", 
    "Alert", 
    "Textarea", 
    "Input",
    "LayoutGrid",
    "LayoutColumn"
  ]).describe("The target LifeSG design system component mapping type"),
  props: z.record(z.any()).describe("A flat mapping of permitted props matching LifeSG API specs"),
  children: z.lazy(() => z.array(ComponentSchema).optional()).describe("Nested child elements for structural container wrappers")
});

export const GeneratedLayoutSchema = z.object({
  thinkingSteps: z.string().describe("Internal logical chain explaining construction rules utilized"),
  layout: z.array(ComponentSchema).describe("Sequential layout schema parsing queue mapping to the target Single Page App UI canvas")
});

export type GeneratedLayout = z.infer<typeof GeneratedLayoutSchema>;