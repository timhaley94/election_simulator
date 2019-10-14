import React from 'react';
import styles from './Modal.module.css';

function Modal() {
  return (
    <div className={ styles.container }>
      <div className={ styles.content }>
        <h3>
          <span
            role="img"
            aria-label="sad-emoji"
            className={ styles.emoji }
          >
            😔
          </span>
        </h3>
        <p className={ styles.text }>
          Sorry, but this site isn't optimized for small devices yet.{ ' ' }
          Check it on desktop though!
        </p>
      </div>
    </div>
  );
}

export default Modal;
