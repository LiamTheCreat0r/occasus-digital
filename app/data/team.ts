import liam from "~/assets/img/portraits/liam-valty.webp";
import shahine from "~/assets/img/portraits/shahine-rachidi.webp";
import kotico from "~/assets/img/portraits/kotico.webp";

export interface Member {
  name: string;
  portrait: string;
}

// Roles are intentionally omitted until the team provides them.
export const team: Member[] = [
  { name: "Liam Valty", portrait: liam },
  { name: "Shahine Rachidi", portrait: shahine },
  { name: "Kotico", portrait: kotico },
];
