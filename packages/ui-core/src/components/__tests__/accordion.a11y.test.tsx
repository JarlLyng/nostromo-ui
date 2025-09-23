import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Accordion Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes for triggers', async () => {
    const { container } = render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const trigger = screen.getByRole('button', { name: /item 1/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger.id).toMatch(/^accordion-trigger-item-1-/);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes for content', async () => {
    const { container } = render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const content = screen.getByText('Content 1').closest('[role="region"]')!;
    expect(content.id).toMatch(/^accordion-content-item-1-/);
    expect(content).toHaveAttribute('hidden');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible single accordion', async () => {
    const { container } = render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Single Item 1</AccordionTrigger>
          <AccordionContent>Single Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Single Item 2</AccordionTrigger>
          <AccordionContent>Single Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible multiple accordion', async () => {
    const { container } = render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Multiple Item 1</AccordionTrigger>
          <AccordionContent>Multiple Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Multiple Item 2</AccordionTrigger>
          <AccordionContent>Multiple Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper contrast for different variants', async () => {
    const variants = ['default', 'outlined', 'filled', 'ghost'] as const;
    
    for (const variant of variants) {
      const { container } = render(
        <Accordion variant={variant}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have proper contrast for different sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    for (const size of sizes) {
      const { container } = render(
        <Accordion size={size}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have accessible disabled items', async () => {
    const { container } = render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Enabled Item</AccordionTrigger>
          <AccordionContent>Enabled Content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled>
          <AccordionTrigger>Disabled Item</AccordionTrigger>
          <AccordionContent>Disabled Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible controlled accordion', async () => {
    const { container } = render(
      <Accordion value="item-1" onValueChange={() => {}}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Controlled Item 1</AccordionTrigger>
          <AccordionContent>Controlled Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Controlled Item 2</AccordionTrigger>
          <AccordionContent>Controlled Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible accordion with rich content', async () => {
    const { container } = render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Rich Content Item</AccordionTrigger>
          <AccordionContent>
            <div>
              <h4 className="font-semibold text-lg">Rich Content</h4>
              <ul className="space-y-2">
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
              </ul>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-blue-800 text-sm">Important note</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible accordion with long content', async () => {
    const longContent = 'This is a very long content that should be accessible and readable. '.repeat(10);
    
    const { container } = render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Long Content Item</AccordionTrigger>
          <AccordionContent>{longContent}</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper keyboard navigation', async () => {
    const { container } = render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Item 3</AccordionTrigger>
          <AccordionContent>Content 3</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper semantic structure', async () => {
    const { container } = render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible accordion with custom className', async () => {
    const { container } = render(
      <Accordion className="custom-accordion">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible accordion with collapsible prop', async () => {
    const { container } = render(
      <Accordion collapsible={false}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible accordion with default value', async () => {
    const { container } = render(
      <Accordion defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible accordion with multiple default values', async () => {
    const { container } = render(
      <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Item 3</AccordionTrigger>
          <AccordionContent>Content 3</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible accordion with complex nested content', async () => {
    const { container } = render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Complex Item</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Section Title</h3>
              <p className="text-gray-600">Description text</p>
              <div className="bg-gray-100 p-4 rounded">
                <h4 className="font-medium mb-2">Subsection</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>List item 1</li>
                  <li>List item 2</li>
                  <li>List item 3</li>
                </ul>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Action Button
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
