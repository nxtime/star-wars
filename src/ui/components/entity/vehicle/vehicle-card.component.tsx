import { FC, useRef } from 'react';
import { useModal } from '@/hooks/use-modal.hook';
import styles from './vehicle-card.module.scss';
import { Vehicle } from '@/models/entity.model';
import { useRouter } from '@/hooks/use-router.hook';
import { formatCredits, formatLength } from '@/utils/entity.util';

const VehicleCard: FC<Vehicle> = ({
  id,
  name,
  model,
  class: vehicleClass,
  type,
  crew,
  cost_in_credits,
  length,
  imagePlaceholder
}) => {
  const { setParam } = useRouter();
  const { openModal } = useModal();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cardRef.current) {
      cardRef.current.setAttribute("data-modal-triggered", "true");
      openModal(name);
      setParam("id", id.toString());
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
        style={{ backgroundColor: imagePlaceholder }}
      />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.model}>{model}</p>
        <div className={styles.info}>
          <span className={styles.infoItem}>
            <span className={styles.label}>Class:</span>
            <span className={styles.value}>{vehicleClass}</span>
          </span>
          <span className={styles.infoItem}>
            <span className={styles.label}>Type:</span>
            <span className={styles.value}>{type}</span>
          </span>
          <span className={styles.infoItem}>
            <span className={styles.label}>Crew:</span>
            <span className={styles.value}>{crew}</span>
          </span>
          <span className={styles.infoItem}>
            <span className={styles.label}>Length:</span>
            <span className={styles.value}>{formatLength(length)}</span>
          </span>
          <span className={styles.infoItem}>
            <span className={styles.label}>Cost:</span>
            <span className={styles.value}>{formatCredits(cost_in_credits)} credits</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
