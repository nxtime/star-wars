import { FC, useRef } from 'react';
import styles from './character-card.module.scss';
import { Character } from '@/models/entity.model';
import { useRouter } from '@/hooks/use-router.hook';
import { getImage } from '@/utils/fetch.util';

const CharacterCard: FC<Character> = ({
  id,
  name,
  role,
  affiliations,
  species,
  imageUrl,
  imagePlaceholder
}) => {
  const { setParam } = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cardRef.current) {
      cardRef.current.setAttribute("data-modal-triggered", "true");

      setParam("id", id);
    }
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div
        className={styles.image}
        style={{
          backgroundColor: imagePlaceholder,
          backgroundImage: `url(${getImage(imageUrl, "characters", true)})`,
        }}
      />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>

        <div className={styles.info}>
          <span className={styles.infoItem}>
            <span className={styles.label}>Species:</span>
            <span className={styles.value}>{species}</span>
          </span>

          {affiliations.length > 0 && (
            <span className={styles.infoItem}>
              <span className={styles.label}>Affiliation:</span>
              <span className={styles.value}>{affiliations[0]}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
