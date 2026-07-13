import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signup } from "./actions";

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string; check_email?: string };
}) {
  if (searchParams.check_email) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Controlli la sua email</CardTitle>
            <CardDescription>
              Le abbiamo inviato un link di conferma. Clicchi sul link per attivare il suo
              studio.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Crei il suo studio in 30 secondi</CardTitle>
          <CardDescription>Nessuna carta di credito richiesta.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studioName">Nome dello studio</Label>
              <Input id="studioName" name="studioName" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome e cognome</Label>
              <Input id="fullName" name="fullName" type="text" required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            {searchParams.error && (
              <p className="text-sm text-destructive">{searchParams.error}</p>
            )}
            <Button type="submit" className="w-full">
              Crea il mio studio
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Ha già un account?{" "}
            <Link href="/login" className="text-primary underline-offset-4 hover:underline">
              Accedi
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
