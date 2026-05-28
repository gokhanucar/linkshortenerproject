import { auth } from "@clerk/nextjs/server";
import { getLinksByUserId } from "@/data/links";
import { CreateLinkButton } from "./create-link-button";
import { LinkCard } from "./link-card";

export default async function DashboardPage() {
  const { userId } = await auth();
  const userLinks = await getLinksByUserId(userId!);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Links</h1>
        <CreateLinkButton />
      </div>
      {userLinks.length === 0 ? (
        <p className="text-muted-foreground">
          You have no shortened links yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {userLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}
