"use client";

import React, { useState } from "react";
import { Button } from "@lifesg/react-design-system/button";
import { Textarea } from "@lifesg/react-design-system/input-textarea";

interface PromptSectionProps {
  onGenerate: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

export const PromptSection: React.FC<PromptSectionProps> = ({ onGenerate, isLoading }) => {
  const [promptText, setPromptText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() || isLoading) return;
    onGenerate(promptText);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#ffffff", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "2rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="prompt-input" style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
          Describe the interface configuration layout you need generated:
        </label>
        <Textarea
          id="prompt-input"
          placeholder="e.g., Create an online utility application form workspace with a success notice context block, text entry controls, and a processing button link."
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          disabled={isLoading}
          rows={4}
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem" }}>
        {isLoading && (
          <div>🤖 Generating UI...</div>
        )}
        <Button.Default type="submit" disabled={isLoading || !promptText.trim()}>
          {isLoading ? "Generating UI..." : "Generate UI"}
        </Button.Default>
      </div>
    </form>
  );
};