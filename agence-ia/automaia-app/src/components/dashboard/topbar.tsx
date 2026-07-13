import { signOut } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";

export function Topbar({
  studioName,
  userName,
}: {
  studioName: string;
  userName: string | null;
}) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      <div>
        <p className="text-xs text-muted-foreground">Studio</p>
        <p className="font-semibold">{studioName}</p>
      </div>
      <div className="flex items-center gap-4">
        {userName && <span className="text-sm text-muted-foreground">{userName}</span>}
        <form action={signOut}>
          <Button type="submit" variant="outline" size="sm">
            Esci
          </Button>
        </form>
      </div>
    </header>
  );
}
