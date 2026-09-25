import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "../../mdx-components";
import { openGraphBase, twitterBase } from "../../utils/socialCard";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

type PageProps = {
  params: Promise<{ mdxPath?: string[] }>;
};

export async function generateMetadata(props: PageProps) {
  const { mdxPath } = await props.params;
  const { metadata } = await importPage(mdxPath);

  // Nextra gives each page a `title` and nothing else. The root layout's
  // `openGraph.title.template` can only apply to an `openGraph.title` a page
  // actually sets, so without this every shared link was headed "Nostromo UI"
  // and a link to the Button page looked the same as a link to the home page.
  //
  // The rest of the card is spread from utils/socialCard.ts rather than from the
  // page metadata: Next replaces `openGraph` and `twitter` wholesale, so setting
  // only the title here dropped the image from every page.
  const title =
    typeof metadata?.title === "string" ? metadata.title : undefined;
  if (!title) return metadata;

  // The home page has no frontmatter title, so Nextra derives one from the
  // filename and the template turns it into "Index - Nostromo UI", in the
  // browser tab as well as on the card. `absolute` opts that one page out of
  // the template rather than giving index.mdx a title that would then read
  // "Nostromo UI - Nostromo UI".
  if (!mdxPath?.length) {
    const home = "Nostromo UI";
    return {
      ...metadata,
      title: { absolute: home },
      openGraph: { ...openGraphBase, title: { absolute: home } },
      twitter: { ...twitterBase, title: { absolute: home } },
    };
  }

  return {
    ...metadata,
    openGraph: { ...openGraphBase, title },
    twitter: { ...twitterBase, title },
  };
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  // sourceCode is what the theme's copy-page button hands to the clipboard;
  // Wrapper requires it.
  const { default: MDXContent, toc, metadata, sourceCode } = result;

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
