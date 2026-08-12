"use client";

/**
 * Client-side re-export of the library.
 *
 * MDX files are Server Components under the App Router, and the published
 * package carries no `"use client"` directives - so importing a component that
 * uses hooks straight into MDX fails the build with "You're importing a module
 * that depends on `useState` into a React Server Component module".
 *
 * This barrel is the client boundary. It is a workaround, not the fix: the same
 * error hits any consumer using the library in an App Router server component,
 * which is the default for the framework. The real fix is to ship the directives
 * from the package itself - tracked separately, because it changes the published
 * artifact and needs its own release.
 */
export * from "@jarllyng/nostromo";
