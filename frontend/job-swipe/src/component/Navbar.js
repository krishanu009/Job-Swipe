import React, { useEffect, useRef } from 'react';
import '../styling/navbar.css'
function Navbar() {

    const linksRef = useRef([]);
  const cursorRef = useRef(null);

  useEffect(() => {
    const animateit = (e, link) => {
      const span = link.querySelector('span');
      const { offsetX: x, offsetY: y } = e;
      const { offsetWidth: width, offsetHeight: height } = link;
      const move = 25;
      const xMove = (x / width) * (move * 2) - move;
      const yMove = (y / height) * (move * 2) - move;

      span.style.transform = `translate(${xMove}px, ${yMove}px)`;

      if (e.type === 'mouseleave') {
        span.style.transform = '';
      }
    };

    const editCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }
    };

    const links = linksRef.current;
    links.forEach((link) => {
      link.addEventListener('mousemove', (e) => animateit(e, link));
      link.addEventListener('mouseleave', (e) => animateit(e, link));
    });

    window.addEventListener('mousemove', editCursor);

    // Cleanup event listeners on component unmount
    return () => {
      links.forEach((link) => {
        link.removeEventListener('mousemove', (e) => animateit(e, link));
        link.removeEventListener('mouseleave', (e) => animateit(e, link));
      });
      window.removeEventListener('mousemove', editCursor);
    };
  }, []);

  return (
    <div className="nav-wrapper">
      <nav>
        <a href="#" className="link" ref={(el) => (linksRef.current[0] = el)}>
          <span>Home</span>
        </a>
        <a href="#" className="link" ref={(el) => (linksRef.current[1] = el)}>
          <span>Our Story</span>
        </a>
        <a href="#" className="link" ref={(el) => (linksRef.current[2] = el)}>
          <span>Studio</span>
        </a>
        <a href="#" className="link" ref={(el) => (linksRef.current[3] = el)}>
          <span>Contact</span>
        </a>
        <div className="cursor" ref={cursorRef}></div>
      </nav>
    </div>
  );
}

export default Navbar