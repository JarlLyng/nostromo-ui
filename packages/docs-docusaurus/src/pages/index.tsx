import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import ComponentShowcase from '@site/src/components/ComponentShowcase';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero nostromo-hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          In space, no one can hear you
          <br />
          <span className="brand-accent">scream...</span>
        </Heading>
        <p className="hero__subtitle">
          but everyone can see your beautiful UI. Meet Nostromo UI - a modern component library inspired by the USCSS Nostromo from Alien (1979).
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started">
            Get Started 🚀
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/components">
            View Components
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Space-grade UI Components`}
      description="A modern UI library inspired by the USCSS Nostromo. Built with React, TypeScript, and Tailwind CSS.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className="padding-vert--xl">
          <div className="container">
            <ComponentShowcase />
          </div>
        </section>
      </main>
    </Layout>
  );
}
