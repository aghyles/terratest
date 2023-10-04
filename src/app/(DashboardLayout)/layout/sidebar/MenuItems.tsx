import {
  IconListDetails,
  IconTextPlus,
  IconUserCheck,
  IconUsers,
  IconHelpOctagon,
  IconAdjustmentsAlt,

  IconCopy,
  IconLayoutDashboard,
  IconTypography,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Tableau de Bord",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Audites",
  },
  {
    id: uniqueId(),
    title: "Audites",
    icon: IconListDetails,
    href: "/audites",
  },
  {
    id: uniqueId(),
    title: "Nouvel Audite",
    icon: IconTextPlus,
    href: "/audites/auditeNew",
  },
  {
    navlabel: true,
    subheader: "Acteurs",
  },
  {
    id: uniqueId(),
    title: "Auditeurs",
    icon: IconUserCheck,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Clients",
    icon: IconUsers,
    href: "/authentication/register",
  },

  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "FAQ Audites",
    icon: IconHelpOctagon,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "paramètres",
    icon: IconAdjustmentsAlt,
    href: "/sample-page",
  },
  {
    navlabel: true,
    subheader: "Pages Temporaires",
  },
  {
    id: uniqueId(),
    title: "Typography",
    icon: IconTypography,
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Shadow",
    icon: IconCopy,
    href: "/utilities/shadow",
  },
  {
    id: uniqueId(),
    title: "s'inscrire",
    icon: IconTypography,
    href: "/authentication/register",
  },
  {
    id: uniqueId(),
    title: "Connexion",
    icon: IconCopy,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Bord 1",
    icon: IconTypography,
    href: "/bord1",
  },
  {
    id: uniqueId(),
    title: "Bord 2",
    icon: IconCopy,
    href: "/bord2",
  }


];

export default Menuitems;
