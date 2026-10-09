import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Logo />
        <p>A laboratory of digital ideas, experiments and experiences.</p>
        <a href="#/about" className="text-link">ABOUT THE LAB <span>↗</span></a>
      </div>
      <div className="footer-bottom mono">
        <span>© {new Date().getFullYear()} SAMLAB</span>
        <span>DESIGNED TO BE DISCOVERED</span>
        <a href="#/lab">LAB INDEX ↗</a>
      </div>
    </footer>
  )
}
