import lolomo from "./lolomo";
import titles from "./titles.json";
import {
  NavHome,
  NavHomeFill,
  NavLaugh,
  NavLaughFill,
  NavNew,
  NavNewFill,
  NavSearch,
  NavDownload,
} from "common/icons";

const nav = [
  {
    label: "Home",
    key: "home",
    icon: NavHome,
    iconFill: NavHomeFill,
    isActive: true,
  },
  {
    label: "New & Hot",
    key: "new",
    icon: NavNew,
    iconFill: NavNewFill,
    isActive: true,
  },
  { label: "Fast Laughs", icon: NavLaugh, iconFill: NavLaughFill },
  { label: "Search", icon: NavSearch },
  { label: "Downloads", icon: NavDownload },
];

const profile = {
  title: `Who's watching?`,
  edit: "Edit",
  add: "Add Profile",
  names: [
    {
      name: "George",
      isActive: true,
      profileIcon: `${process.env.PUBLIC_URL}/images/profile/1.jpg`,
    },
    {
      name: "Kids",
      isActive: false,
      profileIcon: `${process.env.PUBLIC_URL}/images/profile/kids.jpg`,
    },
  ],
};

const home = {
  navSrc: `${process.env.PUBLIC_URL}/images/home/nav.png`,
  filters: ["TV Show", "Movies", "Genres"],
  billboardSrc: `${process.env.PUBLIC_URL}/images/home/billboard.png`,
  billboardInfoSrc: `${process.env.PUBLIC_URL}/images/home/billboard_info.png`,
};

const allIds = lolomo.list.map((_l) => _l.titles).flat();

export { nav, profile, lolomo, allIds, home, titles };
