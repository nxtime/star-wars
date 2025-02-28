import { FC } from "react";
import { Link } from "@/ui/components";
import { Routes } from "@/models/routes.model";
import { useTranslate } from "@/hooks/use-translate.hook";
import styles from "./footer.module.scss";

const Footer: FC = () => {
  const { t, changeLocale, locale } = useTranslate();
  const currentYear = new Date().getFullYear();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLocale(e.target.value);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Top section with navigation columns */}
        <div className={styles.footerNav}>
          {/* Column 1: Navigation */}
          <div className={styles.footerNavColumn}>
            <h3 className={styles.footerNavTitle}>{t('footer.navigation.title')}</h3>
            <ul className={styles.footerNavList}>
              <li>
                <Link to={Routes.HOME} className={styles.footerNavLink}>
                  {t('footer.navigation.home')}
                </Link>
              </li>
              <li>
                <Link to={Routes.CHARACTER} className={styles.footerNavLink}>
                  {t('footer.navigation.characters')}
                </Link>
              </li>
              <li>
                <Link to={Routes.PLANET} className={styles.footerNavLink}>
                  {t('footer.navigation.planets')}
                </Link>
              </li>
              <li>
                <a href="#timeline" className={styles.footerNavLink}>
                  {t('footer.navigation.timeline')}
                </a>
              </li>
              <li>
                <a href="#forum" className={styles.footerNavLink}>
                  {t('footer.navigation.forum')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Account */}
          <div className={styles.footerNavColumn}>
            <h3 className={styles.footerNavTitle}>{t('footer.account.title')}</h3>
            <ul className={styles.footerNavList}>
              <li>
                <Link to={Routes.SIGN_IN} className={styles.footerNavLink}>
                  {t('footer.account.signIn')}
                </Link>
              </li>
              <li>
                <Link to={Routes.SIGN_UP} className={styles.footerNavLink}>
                  {t('footer.account.signUp')}
                </Link>
              </li>
              <li>
                <a href="#profile" className={styles.footerNavLink}>
                  {t('footer.account.profile')}
                </a>
              </li>
              <li>
                <a href="#settings" className={styles.footerNavLink}>
                  {t('footer.account.settings')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className={styles.footerNavColumn}>
            <h3 className={styles.footerNavTitle}>{t('footer.resources.title')}</h3>
            <ul className={styles.footerNavList}>
              <li>
                <a href="#help-center" className={styles.footerNavLink}>
                  {t('footer.resources.helpCenter')}
                </a>
              </li>
              <li>
                <a href="#faq" className={styles.footerNavLink}>
                  {t('footer.resources.faq')}
                </a>
              </li>
              <li>
                <a href="#api" className={styles.footerNavLink}>
                  {t('footer.resources.api')}
                </a>
              </li>
              <li>
                <a href="#contact" className={styles.footerNavLink}>
                  {t('footer.resources.contactUs')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className={styles.footerNavColumn}>
            <h3 className={styles.footerNavTitle}>{t('footer.legal.title')}</h3>
            <ul className={styles.footerNavList}>
              <li>
                <a href="#terms" className={styles.footerNavLink}>
                  {t('footer.legal.terms')}
                </a>
              </li>
              <li>
                <a href="#privacy" className={styles.footerNavLink}>
                  {t('footer.legal.privacy')}
                </a>
              </li>
              <li>
                <a href="#cookies" className={styles.footerNavLink}>
                  {t('footer.legal.cookies')}
                </a>
              </li>
              <li>
                <a href="#licenses" className={styles.footerNavLink}>
                  {t('footer.legal.licenses')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle section with logo and language selector */}
        <div className={styles.footerMiddle}>
          <div className={styles.footerLogo}>
            <span className={styles.footerLogoText}>{t('common.title')}</span>
            <p className={styles.footerTagline}>{t('footer.tagline')}</p>
          </div>

          <div className={styles.footerLanguage}>
            <label htmlFor="language-selector" className={styles.footerLanguageLabel}>
              {t('footer.language')}
            </label>
            <select
              id="language-selector"
              className={styles.footerLanguageSelect}
              value={locale}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        {/* Bottom section with social links, copyright and attribution */}
        <div className={styles.footerBottom}>
          <div className={styles.footerSocial}>
            <a href="https://twitter.com" className={styles.footerSocialLink} aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="https://facebook.com" className={styles.footerSocialLink} aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://instagram.com" className={styles.footerSocialLink} aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://github.com" className={styles.footerSocialLink} aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a href="https://youtube.com" className={styles.footerSocialLink} aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
          </div>

          <div className={styles.footerCopyright}>
            <p>
              {t('footer.copyright', { year: currentYear.toString() })}
            </p>
            <p className={styles.footerDisclaimer}>
              {t('footer.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
