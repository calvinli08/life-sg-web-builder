# Web Builder SG

An AI-powered website builder that generates functional prototypes using **Singapore's LifeSG React Design System**. This project uses an agentic backend to translate natural language prompts into structured UI layouts.

## 🏗️ Architecture & Workflow

```mermaid
graph TD
    Frontend[Homepage] --> User Prompt
    User Prompt --> API[API Route /api/generate]
    API --> Agent[LangGraph Execution Agent]
    Agent --> LLM[Gemini Model]
    LLM --> Schema[Output Validation with Zod]
    Schema --> Frontend
    Frontend --> Renderer[renderNodes.tsx]
    Renderer --> Preview[Live UI Preview]
    Renderer --> Code[JSX Code Viewer]
```

## 📦 Supported LifeSG Components

The generation engine utilizes a verified set of components from the LifeSG Design System to ensure accessibility and visual consistency:

| Component | Reason for Inclusion |
| :--- | :--- |
| Button | Standard triggers for primary, secondary, and link-style actions. |
| SingpassButton | Official Singpass login button for government digital services. |
| Card | Styled container for grouping related content blocks with titles. |
| Layout  | Native structural foundations for responsive, flexible layouts. |
| Input / Textarea | Text entry controls supporting labels, placeholders, and multi-line input. |
| DateInput / Select  | Specialized inputs for date picking and dropdown selections. |
| Checkbox / RadioButton | Selection controls for binary choices or mutually exclusive options. |
| Toggle | Switches for enabling/disabling binary application settings. |
| Accordion | Collapsible headers for managing content density in complex forms. |
| Alert  | Contextual banners for Success, Warning, Error, and Info notifications. |
| NavBar | Standardized top-level orienting container for apps and branding. |
| Pagination | Structural controls for navigating through paginated datasets. |
| Heading | Hierarchical typography (H1-H4) for section structural integrity. |

## 🚀 Setup & Deployment

Create a `.env` file using the `.env.example` template. Enter your Gemini API key and preferred Gemini model.

This application is optimized for deployment on a single machine using Docker. Lifecycle management is simplified via the provided Makefile.

Production Deployment Commands:

```bash
make build # Build the production-optimized standalone Docker image
make up    # Build and start the application service (accessible at port 3000)
make logs  # Monitor real-time output from the container
make down  # Stop and remove the application container
```
