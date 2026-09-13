/**
 * Carry a fence's `fragment` marker through to the rendered page.
 *
 * `scripts/lib/extract-fenced-examples.mjs` reads the same word off the fence to
 * decide which blocks the docs type-checker holds to a compiling standard. That
 * settles the tooling half of #252. The other half is the reader: a snippet that
 * cannot be pasted and run should not look like one that can.
 *
 * Nextra's code block renders the language and drops every other word in the
 * info string, so the marker never reached the page. This runs before that and
 * moves it onto the `<pre>` as `data-fragment`, where a CSS rule in
 * styles/globals.css labels it. One word on the fence, read by both the
 * validator and the page, so the two cannot drift apart.
 */
const MARKERS = new Set(["fragment", "pseudo", "no-check"]);

const isMarked = (pre) =>
  (pre.children ?? []).some(
    (child) =>
      child.tagName === "code" &&
      typeof child.data?.meta === "string" &&
      child.data.meta.split(/\s+/).some((word) => MARKERS.has(word)),
  );

export default function rehypeMarkFragments() {
  return (tree) => {
    const walk = (node) => {
      const children = node.children;
      if (!children) return;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "pre" && isMarked(child)) {
          // A wrapper rather than an attribute on the `<pre>` itself. Nextra's
          // own code block transform runs after every user plugin and rebuilds
          // the element, so a property set here is gone by render time -
          // measured, not assumed. It leaves the surrounding tree alone, so the
          // marker survives one level out.
          children[i] = {
            type: "element",
            tagName: "div",
            properties: { "data-fragment": "true" },
            children: [child],
          };
          walk(child);
          continue;
        }
        walk(child);
      }
    };
    walk(tree);
  };
}
