import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import pages, { titles } from "../header/pages";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);

  return (
    <div className="flex items-center text-muted">
      <Link href="/" className="hover:text-primary">
        <FontAwesomeIcon className="mr-1.5" icon={faHouse} />
      </Link>
      {paths.map((path, index) => (
        <div key={path}>
          <span className="mr-1.5">•</span>
          <Link href={path} className="hover:text-primary">
            <span className="mr-1.5">
              {
                titles
                  .concat(pages)
                  .find(
                    (page) =>
                      page.to === `/${path}` ||
                      (index === paths.length - 1 && page.to === pathname)
                  )?.title
              }
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}
