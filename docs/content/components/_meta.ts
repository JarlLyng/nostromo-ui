// Nextra 4 reads _meta as a module, not JSON.
export default {
  index: {
    title: "Overview",
  },
  primitives: {
    title: "Primitives",
    type: "separator",
  },
  button: "Button",
  badge: "Badge",
  // This one page lives at icon/index.mdx while every sibling here is a flat
  // <name>.mdx. Do not flatten it back. Next builds its metadata-file
  // conventions into a regex that appends the app's configured pageExtensions
  // to the static image extensions:
  //
  //   [\\/]icon\d?(-\w{6})?(?:\.(ico|jpg|jpeg|png|svg)|(\.(mdx|md|js|jsx|ts|tsx)))?$
  //
  // Nextra puts mdx in pageExtensions and the pattern is not anchored to the
  // app directory, so from next 16.3.0 on, an icon.mdx anywhere in the tree -
  // content/ included - is classified as a metadata route. Nextra's page loader
  // then trips over its own `export const metadata` and the build dies with
  // "You are attempting to export metadata from a component marked with use
  // client". It is the name and not the content: the identical body as
  // aaicon.mdx or zzicon.mdx compiles fine. icon/index.mdx cannot match the
  // pattern, because the optional extension group has to end the string.
  //
  // The note belongs here rather than in the page itself: prettier formats mdx
  // as markdown and escapes the asterisks of a {/* */} block, which turns it
  // into a JSX expression that will not compile.
  icon: "Icon",
  separator: "Separator",
  toggle: "Toggle",
  "aspect-ratio": "AspectRatio",
  popover: "Popover",
  "dropdown-menu": "DropdownMenu",
  forms: {
    title: "Forms",
    type: "separator",
  },
  input: "Input",
  textarea: "Textarea",
  checkbox: "Checkbox",
  "radio-group": "RadioGroup",
  switch: "Switch",
  select: "Select",
  label: "Label",
  "helper-text": "HelperText",
  "error-message": "ErrorMessage",
  navigation: {
    title: "Navigation",
    type: "separator",
  },
  tabs: "Tabs",
  breadcrumb: "Breadcrumb",
  pagination: "Pagination",
  feedback: {
    title: "Feedback",
    type: "separator",
  },
  alert: "Alert",
  toast: "Toast",
  tooltip: "Tooltip",
  progress: "Progress",
  skeleton: "Skeleton",
  "data-display": {
    title: "Data Display",
    type: "separator",
  },
  card: "Card",
  table: "Table",
  "data-table": "DataTable",
  avatar: "Avatar",
  accordion: "Accordion",
  collapsible: "Collapsible",
  advanced: {
    title: "Advanced",
    type: "separator",
  },
  calendar: "Calendar",
  charts: "Charts",
  dialog: "Dialog",
  sheet: "Sheet",
  "alert-dialog": "AlertDialog",
  "error-boundary": "ErrorBoundary",
  marketing: {
    title: "Marketing",
    type: "separator",
  },
  hero: "Hero",
  features: "Features",
  testimonials: "Testimonials",
  pricing: "Pricing",
  gallery: "Gallery",
  "logo-wall": "LogoWall",
};
