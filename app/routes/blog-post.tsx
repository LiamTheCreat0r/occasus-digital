import { data, Link } from "react-router";
import type { Route } from "./+types/blog-post";
import { getPost } from "~/lib/content.server";
import { seo } from "~/lib/seo";
import { formatDate, localeFromPath, useT } from "~/i18n";
import styles from "./blog-post.module.css";

export async function loader({ params }: Route.LoaderArgs) {
  const post = getPost(params.slug);
  if (!post) throw data(null, { status: 404 });
  return { post };
}

export function meta({ loaderData, location }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "404 — Occasus Digital" }];
  const { post } = loaderData;
  const locale = localeFromPath(location.pathname);
  return seo({
    locale,
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    image: post.heroImage,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.pubDate,
      dateModified: post.updatedDate ?? post.pubDate,
      image: post.heroImage,
      publisher: { "@type": "Organization", name: "Occasus Digital" },
    },
  });
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const t = useT();
  const { post } = loaderData;
  return (
    <article className={styles.post}>
      <header className={`${styles.head} container`}>
        <Link to={t.path("/blog")} className={styles.back}>
          ← {t("blog.back")}
        </Link>
        <div className={styles.meta}>
          <time dateTime={post.pubDate}>{formatDate(post.pubDate, t.locale)}</time>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.lead}>{post.description}</p>
      </header>
      {post.heroImage && (
        <div className={`container ${styles.heroWrap}`}>
          <img src={post.heroImage} alt="" className={styles.hero} />
        </div>
      )}
      {/* Markdown is authored in-repo and rendered at build time. */}
      <div className={`prose ${styles.body}`} dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
