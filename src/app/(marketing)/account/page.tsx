import { auth } from "@/auth.node";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { sanitizeData } from "@/lib/utils";
import { AccountContent } from "@/components/shop/account-content";

export const metadata = {
  title: "My Account | Lizzy's Beauty Studio",
  description: "Manage your Lizzy's Beauty Studio account and profile",
};

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/account");
  }

  const rawUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
    },
  });

  if (!rawUser) {
    redirect("/login");
  }

  const user = {
    ...sanitizeData(rawUser),
    createdAt: rawUser.createdAt.toISOString(),
  };

  return <AccountContent user={user} />;
}
