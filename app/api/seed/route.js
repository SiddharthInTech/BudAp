import { seedTransactions } from "@/actions/seed";

export async function GET() {
  try {
    const result = await seedTransactions();
    
    if (!result.success) {
      return Response.json(
        { error: result.error || "Failed to seed transactions" },
        { status: 500 }
      );
    }
    
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}