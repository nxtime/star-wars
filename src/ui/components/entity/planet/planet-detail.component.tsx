import { FC } from 'react';
import { Button } from '@/ui/components';
import { Planet } from '@/models/entity.model';
import { Routes } from '@/models/routes.model';
import { useModal } from '@/hooks/use-modal.hook';
import styles from './planet-detail.module.scss';
import { formatPopulation } from '@/utils/entity.util';
import { getImage } from '@/utils/fetch.util';

const PlanetDetail: FC<Planet> = ({
  id,
  name,
  region,
  sector,
  system,
  terrain,
  climate,
  population,
  imagePlaceholder,
  imageUrl,
  notable_residents,
  appearances
}) => {
  const { closeModal } = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={styles.image}
          style={{
            backgroundColor: imagePlaceholder,
            backgroundImage: `url(${getImage(imageUrl, "planets", true)})`
          }}
        />

        <div className={styles.info}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.location}>{system} System, {sector} Sector, {region}</p>

          <div className={styles.badges}>
            {appearances.length > 0 && (
              <span className={styles.appearancesBadge}>
                {appearances.length} {appearances.length === 1 ? 'appearance' : 'appearances'}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Planet Details</h3>
          <div className={styles.grid}>
            <div className={styles.attribute}>
              <span className={styles.label}>Climate</span>
              <span className={styles.value}>{climate.join(', ')}</span>
            </div>

            <div className={styles.attribute}>
              <span className={styles.label}>Terrain</span>
              <span className={styles.value}>{terrain.join(', ')}</span>
            </div>

            <div className={styles.attribute}>
              <span className={styles.label}>Population</span>
              <span className={styles.value}>{formatPopulation(population)}</span>
            </div>
          </div>
        </div>

        {!!notable_residents.length && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Notable Residents</h3>
            <div className={styles.residents}>
              {notable_residents.map((characterId) => (
                <Button
                  key={characterId}
                  to={Routes.CHARACTER}
                  params={{
                    id: characterId
                  }}
                  intent="ghost"
                  size="sm"
                  className={styles.residentButton}
                >
                  View Character #{characterId}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <Button
            intent="primary"
            to={Routes.PLANET}
            params={{
              id
            }}
            onClick={closeModal}
          >
            View Full Planet Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetail;
