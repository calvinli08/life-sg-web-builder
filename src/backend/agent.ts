import { Annotation, StateGraph } from "@langchain/langgraph";
import { ChatGoogle } from "@langchain/google";
import { GeneratedLayoutSchema, GeneratedLayout } from "./schemas";

const AgentState = Annotation.Root({
  prompt: Annotation<string>(),
  result: Annotation<GeneratedLayout | null>(),
  error: Annotation<string | null>()
});

// 2. Main Generation Node Execution Pipeline Node
const generateLayoutNode = async (state: typeof AgentState.State) => {
  try {
    const model = new ChatGoogle({
      apiKey: process.env.GEMINI_API_KEY || '',
      model: process.env.GEMINI_MODEL_NAME || '',
      // Concurrency and retry logic to handle provider-side rate limits
      maxRetries: 2,
      // Limits global concurrent calls from this server instance
      maxConcurrency: 5, 
    }).withStructuredOutput(GeneratedLayoutSchema, {
      name: "generate_lifesg_layout",
      strict: true,
      method: "jsonSchema"
    });

    const systemPrompt = `You are an expert system interface designer fluent in Singapore's Government LifeSG design conventions. 
Your sole objective is to take user text input prompts and construct full web layouts modeled directly on LifeSG components.
Your response must strictly follow the provided JSON schema definitions, detailing component hierarchy, types, and props.

Allowed Component Tags & Core Props:
- "Button": [styleType: "primary" | "secondary" | "light" | "link", disabled: boolean, children: string]
- "Card": [title: string, description: string]
- "Heading": [type: "h1" | "h2" | "h3" | "h4", children: string]
- "Alert": [type: "success" | "warning" | "error" | "info", title: string, children: string]
- "Input": [label: string, placeholder: string]
- "DateInput": [minDate: string, maxDate: string]
- "Textarea": [label: string, placeholder: string]
- "Accordion": [title: string, children: string]
- "Select": [label: string, options: string[]]
- "Checkbox": [label: string, checked: boolean]
- "RadioButton": [label: string, checked: boolean]
- "SingpassButton": [action: string]
- "Toggle": [label: string, enabled: boolean]
- "NavBar": [items: { label: string, link: string }[]]
- "Pagination": [pageSize: number, totalItems: number, activePage: number]
- "Grid": [children: string]
- "Column": [children: string]

Include sensible padding between components.

Return structurally balanced user layouts. Use standard grid layouts where columns are cleanly encapsulated by grids. 
Do not hallucinate component tags outside the explicit allowed list.

Respond only with the JSON layout structure and explanation of your reasoning. 
Do not entertain any other conversational topics.
If the user requests anything other than a layout, respond with a blank layout and an explanation that you can only generate layouts.`;

    const response = await model.invoke([
      { role: "system", content: systemPrompt },
      { role: "user", content: `Generate a web interface matching this requirement: ${state.prompt}` }
    ]);

    return { result: response, error: null };
  } catch (err: any) {
    console.log(err)

    return { result: null, error: "Error generating AI response" };
  }
};

// Assemble State Machine Engine Graph
const workflow = new StateGraph(AgentState)
  .addNode("generator", generateLayoutNode)
  .addEdge("__start__", "generator")
  .addEdge("generator", "__end__");

export const executionAgent = workflow.compile();