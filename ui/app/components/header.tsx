'use client'
import {useContext} from "react";
import {HeaderContext} from "@/app/context/header-context";
import Link from 'next/link'
import './header.css'

export default function Header() {
  const {title, description} = useContext(HeaderContext);
  const closePopover = () => {
    (document.getElementById('popover-menu') as HTMLDivElement)?.hidePopover();
  };
  return (
    <header>
      <button id="popover-toggle" popoverTarget="popover-menu">☰</button>
      <div id="popover-menu" popover="auto" anchor="popover-toggle">
        {/* Prefetched when the link is hovered or enters the viewport */}
        <Link href="/">Hello</Link>
        {/*<Link href="/history" onClick={closePopover}>History</Link>*/}
        <Link href="/history">History</Link>
        {/* No prefetching */}
        {/*<a href="/contact">Contact</a>*/}
      </div>
      <div className="header-info">
        {title && (<h2 className="header-title">{title}</h2>) }
        {description &&
          <p className="header-desc">
            {description}
          </p>
        }
      </div>
    </header>
  );
}
