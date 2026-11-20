import { NotFoundView } from "~/components/NotFoundView";

export function meta() {
  return [{ title: "404 — Occasus Digital" }, { name: "robots", content: "noindex" }];
}

export default function NotFound() {
  return <NotFoundView />;
}
