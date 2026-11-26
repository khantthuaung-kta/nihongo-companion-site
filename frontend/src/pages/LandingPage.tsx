import React from "react";
import { Badge, Button, Card, Heading } from "../components/UI";

interface HealthState {
  status: string;
  app: string;
  version: string;
  environment: string;
}

export default function LandingPage() {
  const [health, setHealth] = React.useState<HealthState | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    import("../services/api")
      .then(({ apiGet }) => apiGet<HealthState>("/health"))
      .then((data) => {
        if (!cancelled) {
          setHealth(data);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6">
        <Badge>Nihongo Companion</Badge>
      </div>
      <Heading level={1} className="mb-4">
        Learn Japanese vocabulary with Burmese translations
      </Heading>
      <p className="mb-8 max-w-2xl text-slate-300">
        A spaced-repetition learning platform for Japanese words, furigana, and
        Burmese meaning — built with React, Vite, Tailwind, FastAPI, and
        PostgreSQL.
      </p>

      <Card className="mb-6">
        <Heading level={3} className="mb-2">Backend connection</Heading>
        {error ? (
          <p className="text-sm text-rose-300">API error: {error}</p>
        ) : health ? (
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-slate-300">Status:</span>
            <Badge>{health.status}</Badge>
            <span className="text-slate-400">v{health.version}</span>
            <span className="text-slate-400">env: {health.environment}</span>
          </div>
        ) : (
          <p className="text-sm text-slate-400">Checking backend health…</p>
        )}
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button>Vocabulary</Button>
        <Button className="bg-slate-700 hover:bg-slate-600">Collections</Button>
        <Button className="bg-slate-700 hover:bg-slate-600">Flashcards</Button>
      </div>
    </main>
  );
}