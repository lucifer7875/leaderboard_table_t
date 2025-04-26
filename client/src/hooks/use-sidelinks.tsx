import { SideLink } from "@/models/sidelinks";
import { useState } from "react";
import {  Table } from "lucide-react";

export default function useSidelinks() {

  const [sidelinks] = useState<SideLink[]>([
    {
      title: "Leaderboard table",
      href: "/lead-board/list",
      label: "",
      icon: <Table size={20} />,
    }
  ]);

  return { sidelinks };
}
