import { redirect } from "next/navigation";

// Fallback: proxy handles /, but redirect here for safety
export default function RootPage() {
  redirect("/cs");
}
