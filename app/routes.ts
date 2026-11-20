import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // `:lang?` is empty for English (default) and fr|es|de|pt otherwise.
  // An invalid value is rejected by the layout loader with a 404.
  route(":lang?", "routes/locale-layout.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("games/:slug", "routes/game.tsx"),
    route("blog", "routes/blog-index.tsx"),
    route("blog/:slug", "routes/blog-post.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
