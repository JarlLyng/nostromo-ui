import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

export default function StorybookPage(): JSX.Element {
  return (
    <Layout
      title="Storybook"
      description="Interactive component playground and documentation">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="text--center margin-bottom--lg">
              <Heading as="h1">Component Playground</Heading>
              <p className="hero__subtitle">
                Explore all Nostromo UI components in our interactive Storybook.
                Test different variants, see live examples, and understand component APIs.
              </p>
            </div>

            <div className="card margin-bottom--lg">
              <div className="card__header">
                <Heading as="h3">🚀 Launch Storybook</Heading>
              </div>
              <div className="card__body">
                <p>
                  Our Storybook contains all components with interactive controls,
                  documentation, and live examples. Perfect for exploring the
                  component library and understanding how to use each component.
                </p>
                <div className="margin-top--md">
                  <Link
                    className="button button--primary button--lg"
                    href="http://localhost:6006"
                    target="_blank"
                    rel="noopener noreferrer">
                    Open Storybook →
                  </Link>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col--6">
                <div className="card">
                  <div className="card__header">
                    <Heading as="h4">🎨 Component Variants</Heading>
                  </div>
                  <div className="card__body">
                    <p>
                      Explore all component variants, sizes, and states.
                      See how components adapt to different use cases.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col col--6">
                <div className="card">
                  <div className="card__header">
                    <Heading as="h4">📚 Interactive Docs</Heading>
                  </div>
                  <div className="card__body">
                    <p>
                      Read component documentation with live examples.
                      Copy code snippets and understand component APIs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row margin-top--md">
              <div className="col col--6">
                <div className="card">
                  <div className="card__header">
                    <Heading as="h4">🎯 Accessibility</Heading>
                  </div>
                  <div className="card__body">
                    <p>
                      Test accessibility features and keyboard navigation.
                      Ensure your components work for all users.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col col--6">
                <div className="card">
                  <div className="card__header">
                    <Heading as="h4">🔧 Development</Heading>
                  </div>
                  <div className="card__body">
                    <p>
                      Use Storybook for component development and testing.
                      Isolated environment for building and debugging.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert--info margin-top--lg">
              <div className="alert__header">
                <Heading as="h4">💡 Pro Tip</Heading>
              </div>
              <div className="alert__body">
                <p>
                  Keep Storybook open while reading the documentation.
                  It's the perfect companion for understanding how components work!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
