'use client'
import {useContext} from "react";
import {HeaderContext} from "@/app/context/header-context";
import Link from 'next/link'
import './header.css'
import {AppContext} from "@/app/context/app-context";

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    anchor?: string;
  }
}

export default function Header() {
  const {detectionIntervalRef} = useContext(AppContext);

  const {title, description} = useContext(HeaderContext);
  const closePopover = () => {
    // Clear the detection interval before routing
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }
    (document.getElementById('popover-menu') as HTMLDivElement)?.hidePopover();
  };

  return (
    <header>
      <button id="popover-toggle" popoverTarget="popover-menu">☰</button>
      <div id="popover-menu" popover="auto" anchor="popover-toggle">
        {/* Prefetched when the link is hovered or enters the viewport */}
        <Link href="/" onClick={closePopover}>Facial Expressions</Link>
        <Link href="/history" onClick={closePopover}>History</Link>
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
