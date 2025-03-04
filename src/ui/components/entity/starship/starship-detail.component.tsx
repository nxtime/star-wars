import { FC } from 'react';
import { Button } from '@/ui/components';
import { Routes } from '@/models/routes.model';
import styles from './starship-detail.module.scss';
import { Starship } from '@/models/entity.model';
import { useModal } from '@/hooks/use-modal.hook';
import { formatCredits, formatLength } from '@/utils/entity.util';

const StarshipDetail: FC<Starship> = ({
  id,
  name,
  model,
  manufacturer,
  class: starshipClass,
  cost_in_credits,
  length,
  max_atmosphering_speed,
  hyperdrive_rating,
  MGLT,
  crew,
  passengers,
  cargo_capacity,
  consumables,
  armament,
  affiliationId,
  imagePlaceholder,
  pilots,
  special_features
}) => {
  const { closeModal } = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={styles.image}
          style={{ backgroundColor: imagePlaceholder }}
        />

        <div className={styles.info}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.model}>{model}</p>

          <div className={styles.badges}>
            <span className={styles.starshipClass}>{starshipClass}</span>
            {hyperdrive_rating !== 'Unknown' && (
              <span className={styles.hyperdrive}>Class {hyperdrive_rating} Hyperdrive</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Technical Specifications</h3>
          <div className={styles.grid}>
            <div className={styles.attribute}>
              <span className={styles.label}>Manufacturer</span>
              <span className={styles.value}>{manufacturer}</span>
            </div>

            <div className={styles.attribute}>
              <span className={styles.label}>Length</span>
              <span className={styles.value}>{formatLength(length)}</span>
            </div>

            <div className={styles.attribute}>
              <span className={styles.label}>Max Speed (Atmosphere)</span>
              <span className={styles.value}>{max_atmosphering_speed} km/h</span>
            </div>

            <div className={styles.attribute}>
              <span className={styles.label}>MGLT</span>
              <span className={styles.value}>{MGLT}</span>
            </div>

            <div className={styles.attribute}>
              <span className={styles.label}>Cost</span>
              <span className={styles.value}>{formatCredits(cost_in_credits)} credits</span>
            </div>

            <div className={styles.attribute}>
              <span className={styles.label}>Consumables</span>
              <span className={styles.value}>{consumables}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Capacity</h3>
          <div className={styles.grid}>
            <div className={styles.attribute}>
              <span className={styles.label}>Crew Required</span>
              <span className={styles.value}>{crew}</span>
            </div>

            <div className={styles.attribute}>
              <span className={styles.label}>Passenger Capacity</span>
              <span className={styles.value}>{passengers}</span>
            </div>

            <div className={styles.attribute}>
              <span className={styles.label}>Cargo Capacity</span>
              <span className={styles.value}>{cargo_capacity} kg</span>
            </div>
          </div>
        </div>

        {!!armament?.length && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Armament</h3>
            <div className={styles.tags}>
              {armament.map((weapon, index) => (
                <span key={index} className={styles.weaponTag}>
                  {weapon}
                </span>
              ))}
            </div>
          </div>
        )}

        {!!special_features?.length && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Special Features</h3>
            <div className={styles.tags}>
              {special_features.map((feature, index) => (
                <span key={index} className={styles.featureTag}>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {!!affiliationId && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Affiliation</h3>
            <Button
              intent="ghost"
              size="sm"
              className={styles.linkButton}
              to={Routes.AFFILIATION}
              params={{
                id: String(affiliationId)
              }}
            >
              View Organization
            </Button>
          </div>
        )}

        {pilots && pilots.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Known Pilots</h3>
            <div className={styles.tags}>
              {pilots.map((pilotId, index) => (
                <Button
                  key={index}
                  intent="ghost"
                  size="sm"
                  className={styles.pilotTag}
                  to={Routes.CHARACTER}
                  params={{
                    id: pilotId
                  }}
                >
                  Pilot #{pilotId}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <Button
            intent="primary"
            to={Routes.STARSHIP}
            params={{ id: String(id) }}
            onClick={closeModal}
          >
            View Full Specs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StarshipDetail;
