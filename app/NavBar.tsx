"use client";

import React from "react";
import Link from "next/link";
import { AiFillFire } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";

export const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Decks", href: "/decks" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillFire />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            className={classnames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
