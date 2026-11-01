import styles from "./Footer.module.css"
import gitHubIcon from "../assets/icons/github.png";
import linkedInIcon from "../assets/icons/linkedIn.png"

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.siteFooter}>
    <div className={styles.footerContainer}>
      <div className={styles.footerLeft}>
        <p className={styles.footerTagline}>Track books. Save notes. Build your library</p>
        <p className={styles.footerCopy}>&copy; {year} Marginalia. Designed & built by Ekaansh Gautam.</p>
      </div>

      <div className={styles.footerRight}>
        <a href="https://github.com/0xekaansh" target="_blank" rel="noopener noreferrer" className={styles.footerIconBtn} title="GitHub">
          <img src={gitHubIcon} alt="GitHub" />
        </a>
        <a href="https://linkedin.com/in/ekaansh2304" target="_blank" rel="noopener noreferrer" className={styles.footerIconBtn} title="LinkedIn">
          <img src={linkedInIcon} alt="LinkedIn" />
        </a>
        <a href="mailto:your-email@example.com" className={styles.footerIconBtn} title="Email / Contact">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
        </a>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
