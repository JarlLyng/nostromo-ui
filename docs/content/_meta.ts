// Nextra 4 reads _meta as a module, not JSON.
export default {
  index: {
    title: "Home",
    // A landing page, not an article. Without this it renders inside the doc
    // column with a breadcrumb, a table of contents and "Copy page" above it,
    // which is chrome for reading reference material and reads as clutter on a
    // page whose job is a hero and three sections. `layout: "full"` also frees
    // the content area so the hero can span it instead of sitting in a 55rem
    // strip down the middle.
    theme: {
      layout: "full",
      toc: false,
      breadcrumb: false,
      pagination: false,
      timestamp: false,
      copyPage: false,
    },
  },
  "getting-started": "Getting Started",
  theming: "Theming",
  "api-reference": "API Reference",
  components: "Components",
  blocks: "Blocks",
  testing: "Testing",
  faq: "FAQ",
};
