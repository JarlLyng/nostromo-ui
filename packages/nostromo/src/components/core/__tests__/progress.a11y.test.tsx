import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Progress, CircularProgress } from '../progress';

expect.extend(toHaveNoViolations);

describe('Progress Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Progress value={50} showLabel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with custom label', async () => {
    const { container } = render(<Progress value={75} label="System Status" showLabel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different variants', async () => {
    const { container } = render(
      <div>
        <Progress value={50} variant="primary" showLabel />
        <Progress value={60} variant="success" showLabel />
        <Progress value={70} variant="warning" showLabel />
        <Progress value={80} variant="error" showLabel />
        <Progress value={90} variant="energy" showLabel />
        <Progress value={40} variant="health" showLabel />
        <Progress value={30} variant="alien" showLabel />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different sizes', async () => {
    const { container } = render(
      <div>
        <Progress value={50} size="sm" showLabel />
        <Progress value={60} size="md" showLabel />
        <Progress value={70} size="lg" showLabel />
        <Progress value={80} size="xl" showLabel />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with glow and animation', async () => {
    const { container } = render(
      <Progress 
        value={85} 
        variant="energy" 
        showLabel 
        label="Energy Core" 
        glow 
        animated 
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with indeterminate state', async () => {
    const { container } = render(
      <Progress 
        value={0} 
        indeterminate 
        variant="primary" 
        showLabel 
        label="Loading..." 
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('CircularProgress Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<CircularProgress value={50} showLabel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with custom label', async () => {
    const { container } = render(<CircularProgress value={75} label="Loading" showLabel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different variants', async () => {
    const { container } = render(
      <div>
        <CircularProgress value={50} variant="primary" showLabel />
        <CircularProgress value={60} variant="success" showLabel />
        <CircularProgress value={70} variant="warning" showLabel />
        <CircularProgress value={80} variant="error" showLabel />
        <CircularProgress value={90} variant="energy" showLabel />
        <CircularProgress value={40} variant="health" showLabel />
        <CircularProgress value={30} variant="alien" showLabel />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different sizes', async () => {
    const { container } = render(
      <div>
        <CircularProgress value={50} size="sm" showLabel />
        <CircularProgress value={60} size="md" showLabel />
        <CircularProgress value={70} size="lg" showLabel />
        <CircularProgress value={80} size="xl" showLabel />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with glow and animation', async () => {
    const { container } = render(
      <CircularProgress 
        value={85} 
        variant="energy" 
        showLabel 
        glow 
        animated 
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Progress Complex Scenarios Accessibility', () => {
  it('should not have accessibility violations in Nostromo system status', async () => {
    const { container } = render(
      <div className="space-y-4">
        <h3>USCSS Nostromo - System Status</h3>
        <Progress 
          value={95} 
          variant="energy" 
          showLabel 
          label="Main Power" 
          glow 
          animated 
        />
        <Progress 
          value={88} 
          variant="health" 
          showLabel 
          label="Life Support" 
          glow 
        />
        <Progress 
          value={72} 
          variant="primary" 
          showLabel 
          label="Navigation" 
        />
        <Progress 
          value={45} 
          variant="warning" 
          showLabel 
          label="Fuel Reserves" 
        />
        <Progress 
          value={12} 
          variant="alien" 
          showLabel 
          label="Xenomorph Activity" 
          glow 
          animated 
        />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with mixed progress types', async () => {
    const { container } = render(
      <div className="space-y-4">
        <Progress value={75} variant="primary" showLabel label="Linear Progress" />
        <div className="flex justify-center">
          <CircularProgress value={75} variant="primary" showLabel />
        </div>
        <Progress value={0} indeterminate variant="primary" showLabel label="Indeterminate" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
