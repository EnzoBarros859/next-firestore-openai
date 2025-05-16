import { redirect } from "next/navigation";

import { isUserAuthenticated } from "@/lib/firebase/firebase-admin";
import PageContent from "../_components/PageContent";

export default async function SignInPage() {
  if (await isUserAuthenticated()) redirect("/dashboard");

  return (
      <PageContent/>
  );
}
