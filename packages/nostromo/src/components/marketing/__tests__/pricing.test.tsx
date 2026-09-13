import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Pricing, type PricingPlan } from "../pricing";

const mockPlans = [
  {
    id: "1",
    name: "Basic",
    description: "Basic plan",
    price: { monthly: 10, yearly: 100 },
    features: [
      { id: "1", name: "Feature 1", included: true },
      { id: "2", name: "Feature 2", included: true },
    ],
    cta: { text: "Get Started", onClick: vi.fn() },
  },
  {
    id: "2",
    name: "Pro",
    description: "Pro plan",
    price: { monthly: 20, yearly: 200 },
    features: [
      { id: "1", name: "Feature 1", included: true },
      { id: "2", name: "Feature 2", included: false },
    ],
    cta: { text: "Get Started", onClick: vi.fn() },
    popular: true,
  },
];

describe("Pricing Component", () => {
  describe("Rendering", () => {
    it("should render all plans", () => {
      render(<Pricing plans={mockPlans} />);
      expect(screen.getByText("Basic")).toBeInTheDocument();
      expect(screen.getByText("Pro")).toBeInTheDocument();
    });

    it("should render plan descriptions", () => {
      render(<Pricing plans={mockPlans} />);
      expect(screen.getByText("Basic plan")).toBeInTheDocument();
      expect(screen.getByText("Pro plan")).toBeInTheDocument();
    });

    it("should render plan prices", () => {
      render(<Pricing plans={mockPlans} />);
      expect(screen.getByText(/\$10/)).toBeInTheDocument();
      expect(screen.getByText(/\$20/)).toBeInTheDocument();
    });

    it("should render title when provided", () => {
      render(<Pricing plans={mockPlans} title="Pricing" />);
      expect(screen.getByText("Pricing")).toBeInTheDocument();
    });

    it("should render subtitle when provided", () => {
      render(<Pricing plans={mockPlans} subtitle="Choose a plan" />);
      expect(screen.getByText("Choose a plan")).toBeInTheDocument();
    });
  });

  describe("Features", () => {
    it("should render all features", () => {
      render(<Pricing plans={mockPlans} />);
      expect(screen.getAllByText("Feature 1").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Feature 2").length).toBeGreaterThan(0);
    });

    it("should mark included features with checkmark", () => {
      const { container } = render(<Pricing plans={mockPlans} />);
      const checkmarks = container.querySelectorAll(".bg-success-100");
      expect(checkmarks.length).toBeGreaterThan(0);
    });

    it("should mark excluded features with X", () => {
      const { container } = render(<Pricing plans={mockPlans} />);
      const excludedFeatures = container.querySelectorAll(".line-through");
      expect(excludedFeatures.length).toBeGreaterThan(0);
    });
  });

  describe("Popular Plan", () => {
    it("should apply popular styling to popular plan", () => {
      const { container } = render(<Pricing plans={mockPlans} />);
      const popularCard = container.querySelector(".ring-2.ring-primary\\/10");
      expect(popularCard).toBeInTheDocument();
    });

    it("should scale popular plan", () => {
      const { container } = render(<Pricing plans={mockPlans} />);
      const popularCard = container.querySelector(".scale-105");
      expect(popularCard).toBeInTheDocument();
    });
  });

  describe("Badges", () => {
    it("should render badge when provided", () => {
      const plansWithBadge = [
        {
          ...mockPlans[0],
          badge: { text: "Popular", variant: "default" as const },
        },
      ];
      render(<Pricing plans={plansWithBadge} />);
      expect(screen.getByText("Popular")).toBeInTheDocument();
    });
  });

  describe("Yearly/Monthly Toggle", () => {
    it("should show monthly prices by default", () => {
      render(<Pricing plans={mockPlans} />);
      expect(screen.getByText(/\$10/)).toBeInTheDocument();
    });

    it("should show yearly prices when showYearly is true", () => {
      render(<Pricing plans={mockPlans} showYearly />);
      expect(screen.getByText(/\$100/)).toBeInTheDocument();
    });

    it("should render toggle when onToggleBilling and title are provided", () => {
      const onToggle = vi.fn();
      render(
        <Pricing
          plans={mockPlans}
          title="Pricing"
          onToggleBilling={onToggle}
        />,
      );
      expect(screen.getByText(/Monthly/)).toBeInTheDocument();
      expect(screen.getByText(/Yearly/)).toBeInTheDocument();
    });

    it("should call onToggleBilling when toggle is clicked", () => {
      const onToggle = vi.fn();
      const { container } = render(
        <Pricing
          plans={mockPlans}
          title="Pricing"
          onToggleBilling={onToggle}
        />,
      );
      // Find the toggle button (it's a button element)
      const toggleButton = container.querySelector(
        'button[class*="inline-flex"]',
      );
      if (toggleButton) {
        fireEvent.click(toggleButton);
        expect(onToggle).toHaveBeenCalled();
      }
    });
  });

  describe("CTA Buttons", () => {
    it("should render CTA buttons for all plans", () => {
      render(<Pricing plans={mockPlans} />);
      const buttons = screen.getAllByText("Get Started");
      expect(buttons.length).toBe(2);
    });

    it("should call onClick when CTA is clicked", () => {
      render(<Pricing plans={mockPlans} />);
      const buttons = screen.getAllByText("Get Started");
      fireEvent.click(buttons[0]);
      expect(mockPlans[0].cta.onClick).toHaveBeenCalled();
    });
  });

  describe("Variants", () => {
    it("should apply default variant", () => {
      const { container } = render(
        <Pricing plans={mockPlans} variant="default" />,
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass("bg-background");
    });

    it("should apply muted variant", () => {
      const { container } = render(
        <Pricing plans={mockPlans} variant="muted" />,
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass("bg-muted/30");
    });
  });

  describe("Columns", () => {
    it("should apply 3 column layout by default", () => {
      const { container } = render(<Pricing plans={mockPlans} />);
      const grid = container.querySelector(".grid");
      expect(grid).toHaveClass(
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3",
      );
    });

    it("should apply custom columns", () => {
      const { container } = render(<Pricing plans={mockPlans} columns={2} />);
      const grid = container.querySelector(".grid");
      expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty plans array", () => {
      const { container } = render(<Pricing plans={[]} />);
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
      expect(grid?.children.length).toBe(0);
    });

    it("should use index as key when id is missing", () => {
      const plansWithoutId = [
        {
          name: "Plan",
          price: { monthly: 10 },
          features: [],
          cta: { text: "Start", onClick: vi.fn() },
        },
      ];
      render(<Pricing plans={plansWithoutId} />);
      expect(screen.getByText("Plan")).toBeInTheDocument();
      // container is used implicitly through render
    });

    it("should handle plans without yearly price", () => {
      const plansWithoutYearly = [
        {
          id: "1",
          name: "Plan",
          price: { monthly: 10 },
          features: [],
          cta: { text: "Start", onClick: vi.fn() },
        },
      ];
      render(<Pricing plans={plansWithoutYearly} showYearly />);
      // Should fallback to monthly price
      expect(screen.getByText(/\$10/)).toBeInTheDocument();
    });
  });
});

/**
 * The three Pricing findings of the 2026-09-12 audit: #245 a toggle with no name
 * that disappeared without a heading, #246 a `cta.href` nothing read, and #247 a
 * yearly price that could be a monthly one and a discount claimed without looking
 * at any prices.
 *
 * All three passed straight through the tests above.
 */
const plan = (overrides: Partial<PricingPlan> = {}): PricingPlan => ({
  id: "pro",
  name: "Pro",
  price: { monthly: 10 },
  features: [],
  cta: { text: "Subscribe" },
  ...overrides,
});

describe("Pricing billing toggle", () => {
  const toggle = () => screen.getByRole("switch");

  // An empty <button>: axe reports button-name, and nothing announced which way
  // it was set.
  it("is a named switch that reports its state", () => {
    render(<Pricing plans={[plan()]} onToggleBilling={vi.fn()} />);

    expect(toggle()).toHaveAccessibleName("Bill yearly");
    expect(toggle()).toHaveAttribute("aria-checked", "false");
  });

  it("reports the other state when yearly is on", () => {
    render(<Pricing plans={[plan()]} showYearly onToggleBilling={vi.fn()} />);
    expect(toggle()).toHaveAttribute("aria-checked", "true");
  });

  it("takes a label of its own", () => {
    render(
      <Pricing
        plans={[plan()]}
        onToggleBilling={vi.fn()}
        billingToggleLabel="Skift til årlig betaling"
      />,
    );
    expect(toggle()).toHaveAccessibleName("Skift til årlig betaling");
  });

  // title and subtitle are optional props, and the toggle used to live inside the
  // block that rendered only when one of them was given.
  it("is there without a title or a subtitle", () => {
    render(<Pricing plans={[plan()]} onToggleBilling={vi.fn()} />);
    expect(toggle()).toBeInTheDocument();
  });

  // This one does bite in jsdom: a button with no `type` inside a form does
  // submit it here, exactly as in a browser. Measured before relying on it.
  it("does not submit a form it happens to sit in", () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Pricing plans={[plan()]} onToggleBilling={vi.fn()} />
      </form>,
    );

    expect(toggle()).toHaveAttribute("type", "button");
    fireEvent.click(toggle());
    expect(onSubmit).not.toHaveBeenCalled();
  });

  // Whether Space and Enter reach it is a browser question, not this one:
  // jsdom does not turn either key into a click on a button, so a test that
  // pressed them here would pass against a `<div onClick>` as readily as
  // against a real one. It is `e2e/tests/pricing.spec.ts` that presses them.
  // What is checkable here is that it is focusable and reports on activation.
  it("can be reached and reports when activated", () => {
    const onToggleBilling = vi.fn();
    render(<Pricing plans={[plan()]} onToggleBilling={onToggleBilling} />);

    toggle().focus();
    expect(toggle()).toHaveFocus();

    fireEvent.click(toggle());
    expect(onToggleBilling).toHaveBeenCalledWith(true);
  });

  it("is absent when there is nothing to toggle", () => {
    render(<Pricing plans={[plan()]} title="Plans" />);
    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
  });
});

describe("Pricing call to action", () => {
  // cta.href had been in the type since it was written and nothing read it, so a
  // plan with a destination and no callback rendered an inert button.
  it("is a link when the plan gives a destination", () => {
    render(
      <Pricing
        plans={[plan({ cta: { text: "Subscribe", href: "/checkout" } })]}
      />,
    );

    const cta = screen.getByRole("link", { name: "Subscribe" });
    expect(cta).toHaveAttribute("href", "/checkout");
    expect(screen.queryByRole("button", { name: "Subscribe" })).toBeNull();
  });

  it("is a button when the plan gives a callback", () => {
    const onClick = vi.fn();
    render(<Pricing plans={[plan({ cta: { text: "Subscribe", onClick } })]} />);

    const cta = screen.getByRole("button", { name: "Subscribe" });
    expect(cta).toHaveAttribute("type", "button");
    fireEvent.click(cta);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // Navigating to checkout and reporting the click on the way is the normal
  // shape of having both.
  it("navigates and reports when it has both", () => {
    const onClick = vi.fn();
    render(
      <Pricing
        plans={[
          plan({ cta: { text: "Subscribe", href: "/checkout", onClick } }),
        ]}
      />,
    );

    const cta = screen.getByRole("link", { name: "Subscribe" });
    fireEvent.click(cta);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(cta).toHaveAttribute("href", "/checkout");
  });

  it("does not submit a form from a callback action", () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Pricing
          plans={[plan({ cta: { text: "Subscribe", onClick: vi.fn() } })]}
        />
      </form>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe("Pricing yearly amounts", () => {
  // `showYearly && plan.price.yearly` is a truthiness test, so a plan that is
  // free for the year fell through to the monthly figure and labelled it /year.
  it("keeps a yearly price of zero", () => {
    render(
      <Pricing
        plans={[plan({ price: { monthly: 10, yearly: 0 } })]}
        showYearly
      />,
    );

    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.queryByText("$10")).not.toBeInTheDocument();
    expect(screen.getByText("/year")).toBeInTheDocument();
  });

  // A monthly amount under a /year label is a false price. Without a yearly
  // figure the plan keeps its own period rather than borrowing the wrong one.
  it("does not relabel a monthly price as annual", () => {
    render(<Pricing plans={[plan({ price: { monthly: 10 } })]} showYearly />);

    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText("/month")).toBeInTheDocument();
    expect(screen.queryByText("/year")).not.toBeInTheDocument();
  });

  it("shows the yearly price when there is one", () => {
    render(
      <Pricing
        plans={[plan({ price: { monthly: 10, yearly: 96 } })]}
        showYearly
      />,
    );

    expect(screen.getByText("$96")).toBeInTheDocument();
    expect(screen.getByText("/year")).toBeInTheDocument();
  });

  it("honours an explicit period", () => {
    render(
      <Pricing
        plans={[plan({ price: { monthly: 10, yearly: 96 }, period: "seat" })]}
        showYearly
      />,
    );
    expect(screen.getByText("/seat")).toBeInTheDocument();
  });
});

describe("Pricing yearly discount", () => {
  // "(Save 20%)" was printed next to Yearly always, whatever the prices were.
  it("works the saving out from the prices", () => {
    render(
      <Pricing
        plans={[plan({ price: { monthly: 10, yearly: 96 } })]}
        onToggleBilling={vi.fn()}
      />,
    );
    // 120 a year at the monthly rate against 96: 20%.
    expect(screen.getByText("(Save 20%)")).toBeInTheDocument();
  });

  it("says nothing when the yearly price saves nothing", () => {
    render(
      <Pricing
        plans={[plan({ price: { monthly: 10, yearly: 120 } })]}
        onToggleBilling={vi.fn()}
      />,
    );
    expect(screen.queryByText(/save/i)).not.toBeInTheDocument();
  });

  it("says nothing when the yearly price costs more", () => {
    render(
      <Pricing
        plans={[plan({ price: { monthly: 10, yearly: 150 } })]}
        onToggleBilling={vi.fn()}
      />,
    );
    expect(screen.queryByText(/save/i)).not.toBeInTheDocument();
  });

  it("says nothing when no plan has a yearly price", () => {
    render(<Pricing plans={[plan()]} onToggleBilling={vi.fn()} />);
    expect(screen.queryByText(/save/i)).not.toBeInTheDocument();
  });

  // One switch, plans that disagree: the number is the best on offer and says so.
  it("says up to when the plans differ", () => {
    render(
      <Pricing
        plans={[
          plan({ id: "a", price: { monthly: 10, yearly: 96 } }),
          plan({ id: "b", price: { monthly: 20, yearly: 216 } }),
        ]}
        onToggleBilling={vi.fn()}
      />,
    );
    // 20% and 10%.
    expect(screen.getByText("(Save up to 20%)")).toBeInTheDocument();
  });

  it("can be turned off, and reworded", () => {
    const { rerender } = render(
      <Pricing
        plans={[plan({ price: { monthly: 10, yearly: 96 } })]}
        onToggleBilling={vi.fn()}
        showYearlyDiscount={false}
      />,
    );
    expect(screen.queryByText(/save/i)).not.toBeInTheDocument();

    rerender(
      <Pricing
        plans={[plan({ price: { monthly: 10, yearly: 96 } })]}
        onToggleBilling={vi.fn()}
        yearlyDiscountLabel={(percent) => `spar ${percent}%`}
      />,
    );
    expect(screen.getByText("spar 20%")).toBeInTheDocument();
  });
});
