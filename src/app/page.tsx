"use client";

import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { PromptSection } from "@/src/components/PromptSection";
import { ResultsDisplay } from "@/src/components/ResultsDisplay";
import { GeneratedLayout } from "@/src/backend/schemas";
import { LifeSGTheme } from "@lifesg/react-design-system/theme";

export default function HomeWorkspace() {
  const [generationData, setGenerationData] = useState<GeneratedLayout | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleGenerationRequest = async (prompt: string) => {
    setProcessing(true);
    try {
      const targetResponse = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!targetResponse.ok) {
        const errorData = await targetResponse.json();
        
        throw new Error(errorData.error);
      }

      const responsePayload: GeneratedLayout = await targetResponse.json();
      setGenerationData(responsePayload);
    } catch (err) {
      console.error("Operational pipeline execution exception error: ", err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ThemeProvider theme={LifeSGTheme}>
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <header style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2.25rem", fontWeight: "700", color: "#024b94", margin: "0 0 0.5rem 0" }}>
            Web Builder SG
          </h1>
          <p style={{ color: "#666", fontSize: "1.1rem", margin: 0 }}>
            Interactive Generative Prototype Generator using verified LifeSG Design Systems components.
          </p>
        </header>

        <PromptSection onGenerate={handleGenerationRequest} isLoading={processing} />
        <ResultsDisplay data={generationData} />
      </main>
    </ThemeProvider>
  );
}