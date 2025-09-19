import React from 'react';
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from './NostromoComponents';

export default function ComponentShowcase(): JSX.Element {
  return (
    <div className="component-showcase">
      <h2>Component Showcase</h2>
      <p>Here are some of our Nostromo UI components in action:</p>
      
      <div className="margin-bottom--lg">
        <h3>Buttons</h3>
        <div className="margin-bottom--md">
          <Button variant="default" size="default" className="margin-right--sm">
            Primary Button
          </Button>
          <Button variant="secondary" size="default" className="margin-right--sm">
            Secondary Button
          </Button>
          <Button variant="ghost" size="default" className="margin-right--sm">
            Ghost Button
          </Button>
          <Button variant="destructive" size="default">
            Destructive Button
          </Button>
        </div>
      </div>

      <div className="margin-bottom--lg">
        <h3>Badges</h3>
        <div className="margin-bottom--md">
          <Badge variant="default" className="margin-right--sm">
            Default
          </Badge>
          <Badge variant="secondary" className="margin-right--sm">
            Secondary
          </Badge>
          <Badge variant="destructive" className="margin-right--sm">
            Destructive
          </Badge>
          <Badge variant="outline">
            Outline
          </Badge>
        </div>
      </div>

      <div className="margin-bottom--lg">
        <h3>Cards</h3>
        <div className="row">
          <div className="col col--6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                  This is a card description that explains what the card is about.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here. You can put any content inside a card.</p>
                <Button variant="default" size="sm">
                  Action
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="col col--6">
            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>
                  Cards are great for organizing content and creating visual hierarchy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>You can have multiple cards in a row or column layout.</p>
                <Button variant="secondary" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="alert alert--info">
        <div className="alert__header">
          <h4>💡 Interactive Examples</h4>
        </div>
        <div className="alert__body">
          <p>
            For more interactive examples and component variants, visit our{' '}
            <a href="/storybook" target="_blank" rel="noopener noreferrer">
              Storybook
            </a>{' '}
            where you can test all components with live controls.
          </p>
        </div>
      </div>
    </div>
  );
}
