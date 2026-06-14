"use client";

import { useState } from "react";
import { PromptSection } from "@/src/components/PromptSection";
import { ResultsDisplay } from "@/src/components/ResultsDisplay";
import { GeneratedLayout } from "@/src/backend/schemas";
import { DSThemeProvider, LifeSGTheme } from "@lifesg/react-design-system/theme";

export default function HomeWorkspace() {
  const [generationData, setGenerationData] = useState<GeneratedLayout | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);

  const COOLDOWN_MS = 10000; // 10 second cooldown between requests

  const handleGenerationRequest = async (prompt: string) => {
    const now = Date.now();
    if (now - lastRequestTime < COOLDOWN_MS) {
      const remaining = Math.ceil((COOLDOWN_MS - (now - lastRequestTime)) / 1000);
      setError(`Rate limit: Please wait ${remaining} more seconds before generating again.`);
      return;
    }

    setProcessing(true);
    setError(null);
    try {
      const targetResponse = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (targetResponse.status === 429) {
        throw new Error("You've reached the generation limit. Please wait a moment before trying again.");
      }

      if (!targetResponse.ok) {
        const errorData = await targetResponse.json();
        
        throw new Error(errorData.error);
      }

      const responsePayload: GeneratedLayout = await targetResponse.json();
      setGenerationData(responsePayload);
      setLastRequestTime(Date.now());
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      console.error("Operational pipeline execution exception error: ", err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <DSThemeProvider theme={LifeSGTheme}>
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <header style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: "2.25rem", fontWeight: "700", color: "#024b94", margin: "0 0 0.5rem 0" }}>
              Web Builder SG
            </h1>
            <p style={{ color: "#665", fontSize: "1.1rem", margin: 0 }}>
              Generate Web Interfaces Modeled on Singapore's LifeSG Design System
            </p>
          </div>
        </header>

        <PromptSection onGenerate={handleGenerationRequest} isLoading={processing} />
        
        {error && (
          <div style={{ 
            padding: "1rem", 
            backgroundColor: "#fff5f5", 
            color: "#c53030", 
            borderRadius: "8px", 
            marginBottom: "2rem",
            border: "1px solid #feb2b2" 
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <ResultsDisplay data={generationData} />
      </main>
    </DSThemeProvider>
  );
}