import React from 'react';
import styles from './footer.module.css';

function Footer() {
  return (
    <div className={styles.footerBody}>
      <section className={styles.footer}>
        <div className={styles.footerContent}>
          <img src="" alt="Logo" />
          <p>chalana kaveesha fernando</p>

          <div className={styles.icons}>
            <a href="#"><i className='bx bxl-facebook-circle'></i></a>
            <a href="#"><i className='bx bxl-twitter'></i></a>
            <a href="#"><i className='bx bxl-instagram-alt'></i></a>
            <a href="#"><i className='bx bxl-youtube'></i></a>
          </div>
        </div>

        <div className={styles.footerContent}>
          <h4>Project</h4>
          <ul>
            <li><a href="#">Houses1</a></li>
            <li><a href="#">Houses2</a></li>
            <li><a href="#">Houses3</a></li>
            <li><a href="#">Houses4</a></li>
          </ul>
        </div>

        <div className={styles.footerContent}>
          <h4>Company</h4>
          <ul>
            <li><a href="#">Houses1</a></li>
            <li><a href="#">Houses2</a></li>
            <li><a href="#">Houses3</a></li>
            <li><a href="#">Houses4</a></li>
          </ul>
        </div>

        <div className={styles.footerContent}>
          <h4>Movement</h4>
          <ul>
            <li><a href="#">Houses1</a></li>
            <li><a href="#">Houses2</a></li>
            <li><a href="#">Houses3</a></li>
            <li><a href="#">Houses4</a></li>
          </ul>
        </div>

        <div className={styles.footerContent}>
          <h4>Help</h4>
          <ul>
            <li><a href="#">Houses1</a></li>
            <li><a href="#">Houses2</a></li>
            <li><a href="#">Houses3</a></li>
            <li><a href="#">Houses4</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Footer;
