import Link from 'next/link'

const YT   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
const Sub  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
const IG   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
const LI   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const Spot = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
const AP   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M5.34 0A5.328 5.328 0 0 0 0 5.34v13.32A5.328 5.328 0 0 0 5.34 24h13.32A5.328 5.328 0 0 0 24 18.66V5.34A5.328 5.328 0 0 0 18.66 0zm6.525 2.568c2.336 0 4.448.902 6.056 2.587a8.612 8.612 0 0 1 2.287 5.862c0 4.819-3.525 8.344-8.343 8.344a8.41 8.41 0 0 1-6.13-2.537 8.45 8.45 0 0 1-2.214-5.807c0-4.78 3.535-8.449 8.344-8.449zm-.387 3.398c-2.758 0-4.943 2.263-4.943 5.043 0 2.7 2.185 4.965 4.943 4.965 2.739 0 4.944-2.224 4.944-4.965 0-2.8-2.205-5.043-4.944-5.043zm-.018 1.492c.977 0 1.768.77 1.768 1.729 0 .93-.791 1.69-1.768 1.69-.996 0-1.787-.76-1.787-1.69 0-.959.791-1.729 1.787-1.729zm0 4.114c1.504 0 2.7 1.157 2.7 2.602 0 .565-.195 1.1-.527 1.525-.459-.312-.928-.486-2.173-.486-1.245 0-1.714.174-2.172.486a2.607 2.607 0 0 1-.528-1.525c0-1.445 1.195-2.602 2.7-2.602z"/></svg>

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Life Between Titles</h3>
            <p>A media platform for people navigating career transitions, identity shifts, and the uncertain space between chapters.</p>
            <div className="social-links">
              <a href="https://www.youtube.com/@LifeBetweenTitles" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube"><YT /></a>
              <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Substack"><Sub /></a>
              <a href="https://www.instagram.com/lifebetweentitles" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram"><IG /></a>
              <a href="https://www.linkedin.com/company/life-between-titles/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn"><LI /></a>
              <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Spotify"><Spot /></a>
              <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Apple Podcasts"><AP /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Listen</h4>
            <Link href="/shows">All Shows</Link>
            <Link href="/shows#life-between-titles">Life Between Titles</Link>
            <Link href="/shows#office-hours">Office Hours</Link>
            <Link href="/shows#work-unscripted">Work, Unscripted</Link>
            <Link href="/guests">All Guests</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <Link href="/newsletter">Newsletter</Link>
            <Link href="/book">The Book</Link>
            <Link href="/faq">FAQ</Link>
            <a href="mailto:hello@lifebetweentitles.com">Contact Us</a>
          </div>
          <div className="footer-col">
            <h4>Work With Us</h4>
            <Link href="/sponsor">Become a Sponsor</Link>
            <Link href="/guest-submission">Submit a Guest</Link>
            <Link href="/build">Build Your Own Show</Link>
            <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer">Support LBT</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} Life Between Titles. All rights reserved.</span>
          <span className="footer-copy" style={{ fontStyle: 'italic' }}>Titles are temporary. Identity is not.</span>
        </div>
      </div>
    </footer>
  )
}
