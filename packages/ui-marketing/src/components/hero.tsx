import React from 'react';

export interface HeroProps {
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, cta, className }) => {
  return (
    <section className={`hero ${className || ''}`}>
      <h1 className="hero-title">{title}</h1>
      {subtitle && <p className="hero-subtitle">{subtitle}</p>}
      {cta && <div className="hero-cta">{cta}</div>}
    </section>
  );
};
