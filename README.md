# Web Builder SG - AI Engineer Assignment

This is a functional prototype of an AI-powered website builder that generates layouts using the **LifeSG React Design System**.

## 🚀 Features
- **AI Generation**: Uses LangGraph to orchestrate component selection and layout generation.
- **LifeSG Integration**: Strictly uses LifeSG components for UI consistency.
- **Live Preview**: Toggle between a rendered view and the generated React code.
- **Responsive Design**: Fully compatible with mobile and desktop views.

## 🛠️ Technology Stack
- **Frontend**: React (Next.js), Styled Components
- **Design System**: [@lifesg/react-design-system](https://github.com/LifeSG/react-design-system)
- **LLM Orchestration**: LangChain & LangGraph (using Gemini API)
- **Backend**: Node.js

## 🏗️ Architecture

```mermaid
graph TD
    A[User Input] --> B[Next.js Frontend]
    B --> C[LangGraph Agent]
    C --> D{Planner Node}
    D --> E[Code Generator Node]
    E --> F[LifeSG Component Mapper]
    F --> G[JSON/Code Response]
    G --> B
    B --> H[Preview Tab]
    B --> I[Code Tab]
```

## 📦 LifeSG Components Used
| Component | Usage |
| :--- | :--- |
| `Button` | Primary actions and generation triggers. |
| `Form.Input` | User prompt input area. |
| `Layout.Content` | Main container for generated content. |
| `Card` | Used for displaying section blocks in the generated UI. |
| `Tabs` | Navigation between 'Preview' and 'Code' views. |

## 🏃 How to Run
1. **Clone the repo**: `git clone <repo-url>`
2. **Install dependencies**: `npm install`
3. **Set Environment Variables**: Create a `.env` file with your `GOOGLE_API_KEY`.
4. **Start the development server**: `npm run dev`
5. **Access the app**: Navigate to `http://localhost:3000`

---