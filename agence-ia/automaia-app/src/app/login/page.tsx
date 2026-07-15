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

import { login } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Accedi alla piattaforma</CardTitle>
          <CardDescription>Inserisca le sue credenziali per continuare.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login} className="space-y-4">
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
                autoComplete="current-password"
              />
            </div>
            {searchParams.error && (
              <p className="text-sm text-destructive">{searchParams.error}</p>
            )}
            <Button type="submit" className="w-full">
              Accedi
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Non ha ancora un account?{" "}
            <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
              Si registri
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
