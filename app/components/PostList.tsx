import { Link } from "react-router";
import type { PostMeta } from "~/lib/content.server";
import { useT } from "~/i18n";
import { IconArrowUpRight } from "./Icons";
import { Reveal } from "./Reveal";
import styles from "./PostList.module.css";

/** Editorial list of posts: big date, title, tags; thumbnail on hover. */
export function PostList({ posts }: { posts: PostMeta[] }) {
  const t = useT();
  if (posts.length === 0) return <p className={styles.empty}>{t("blog.empty")}</p>;

  return (
    <ul className={styles.list}>
      {posts.map((post, i) => {
        const d = new Date(post.pubDate);
        return (
          <Reveal as="li" key={post.slug} delay={i * 0.06}>
            <Link to={t.path(`/blog/${post.slug}`)} className={styles.item}>
              <time dateTime={post.pubDate} className={styles.date}>
                <span className={styles.day}>{String(d.getUTCDate()).padStart(2, "0")}</span>
                <span className={styles.month}>
                  {d.toLocaleDateString(t.locale, { month: "short", year: "numeric", timeZone: "UTC" })}
                </span>
              </time>
              <div className={styles.text}>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.desc}>{post.description}</p>
                {post.tags.length > 0 && (
                  <ul className={styles.tags}>
                    {post.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </div>
              {post.heroImage && <img src={post.heroImage} alt="" className={styles.thumb} loading="lazy" />}
              <span className={styles.arrow} aria-hidden="true">
                <IconArrowUpRight size={22} />
              </span>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
