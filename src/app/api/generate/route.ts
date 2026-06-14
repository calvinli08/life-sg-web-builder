import { NextRequest, NextResponse } from "next/server";
import { executionAgent } from "@/src/backend/agent";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "A valid string prompt parameter context is required." }, { status: 400 });
    }

    // Invoke state machine workflow
    const executionOutput = await executionAgent.invoke({
      prompt: prompt,
      result: null,
      error: null
    });

    if (executionOutput.error) {
      return NextResponse.json({ error: executionOutput.error }, { status: 500 });
    }

    return NextResponse.json(executionOutput.result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Internal Engine Error Processing State Execution" }, { status: 500 });
  }
}