/**
 * A representative consumer surface.
 *
 * Everything here imports from "@jarllyng/nostromo", which resolves through the
 * package's `exports` map to `dist` - not to `src`. That distinction is the
 * reason this app exists: the library's own suite runs against source in jsdom,
 * and it happily stayed green while the published entry points were broken.
 *
 * Both import styles are covered, because they are separate export paths and
 * either can break on its own.
 */
import {
  Alert,
  Avatar,
  Badge,
  Card,
  Checkbox,
  Input,
  Label,
  Progress,
  Separator,
  Switch,
  Textarea,
} from "@jarllyng/nostromo";
// Per-component entry points, used for tree-shaking.
import { Button } from "@jarllyng/nostromo/components/core/button";
import { Hero } from "@jarllyng/nostromo/components/marketing/hero";

export function App() {
  return (
    <main>
      <Hero
        title="Smoke test"
        subtitle="Renders the library the way a consumer does."
        cta={
          <>
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            {/* asChild threw React.Children.only unconditionally once. */}
            <Button asChild>
              <a href="/somewhere">As child</a>
            </Button>
            <Button loading loadingText="Working">
              Submit
            </Button>
          </>
        }
      />

      <Card>
        <Card.Header>
          <Card.Title>Card</Card.Title>
        </Card.Header>
        <Card.Content>
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@example.com" />
          <Textarea placeholder="Notes" />
          <Checkbox aria-label="Accept" />
          <Switch aria-label="Toggle" />
          <Progress value={42} />
          <Separator />
          <Avatar>
            <Avatar.Fallback>NU</Avatar.Fallback>
          </Avatar>
          <Badge>Badge</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </Card.Content>
      </Card>

      <Alert variant="warning">Careful.</Alert>

      {/*
        Consumers style their own markup with the library's tokens, so the design
        system has to expose them as utilities. These live here rather than in the
        test file on purpose: Tailwind only emits classes it finds in the scanned
        content, so asserting on classes written inside the test would make the
        assertion pass because of the test itself.
      */}
      <section className="bg-background text-foreground border-border rounded-md">
        <p className="bg-primary text-primary-foreground">primary</p>
        <p className="bg-secondary text-secondary-foreground">secondary</p>
        <p className="bg-muted text-muted-foreground">muted</p>
        <p className="bg-accent text-accent-foreground">accent</p>
        <p className="bg-card text-card-foreground">card</p>
        <p className="bg-popover text-popover-foreground">popover</p>
        <p className="bg-destructive text-destructive-foreground">destructive</p>
        <p className="bg-success text-success-foreground">success</p>
        <p className="bg-warning text-warning-foreground">warning</p>
        <p className="bg-error text-error-foreground">error</p>
        <p className="bg-info text-info-foreground">info</p>
        <p className="bg-brand-500 text-neutral-50">brand</p>
        <p className="ring-ring shadow-card font-heading text-4xl leading-tight max-w-2xl">
          tokens
        </p>
      </section>
    </main>
  );
}
