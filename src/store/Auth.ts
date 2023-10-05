import { supabase } from "@/utils/supabase";
import { create } from "zustand";

//utils
import { checkIfPro } from "@/utils/checkIfPro";

const useStore = create((set) => ({
  user: null,
  session: null,
  strioe_customer_id: null,
  credits: null,
  isPro: false,
  setCredits: (credits: number) => set({ credits }),
  signOut: () => {
    supabase?.auth.signOut();
    set({ user: null, session: null });
  },
  fetch: async (state: any) => {
    if (!supabase) {
      return null;
    }

    const {
      data: { session },
      error,
    }: any = await supabase.auth.getSession();

    if (error) throw error;

    const { data: customerData, error: customerError } = await supabase
      .from("customers")
      .select("*")
      .eq("email_address", session?.user?.email);

    if (!customerData) return;

    const githubIdentity: any = session?.user?.identities?.find(
      (identity: any) => identity?.provider === "github"
    )?.identity_data;
    const pro = await checkIfPro(githubIdentity?.email);

    set({
      user: session?.user,
      session: session,
      isPro: pro,
      stripe_customer_id: customerData[0]?.stripe_customer_id,
      credits: customerData[0]?.credits,
    });
  },
}));
export default useStore;
