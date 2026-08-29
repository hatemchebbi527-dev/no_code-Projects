import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrappers de navigation conscients de la langue : Link, redirect, usePathname,
// useRouter et getPathname ajoutent automatiquement le préfixe de langue.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
