import type { Route } from "./+types/blog-index";
import { getPosts } from "~/lib/content.server";
import { seo } from "~/lib/seo";
import { localeFromPath, translate, useT } from "~/i18n";
import { PostList } from "~/components/PostList";
import { PageHeader } from "~/components/PageHeader";

export async function loader() {
  return { posts: getPosts() };
}

export function meta({ location }: Route.MetaArgs) {
  const locale = localeFromPath(location.pathname);
  return seo({
    locale,
    path: "/blog",
    title: translate(locale, "blogIndex.title"),
    description: translate(locale, "blogIndex.description"),
  });
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const t = useT();
  return (
    <>
      <PageHeader title={t("blogIndex.title")} lead={t("blogIndex.description")} />
      <div className="container" style={{ paddingBottom: "4rem" }}>
        <PostList posts={loaderData.posts} />
      </div>
    </>
  );
}
