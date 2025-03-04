import { FC } from 'react';
import { Button } from '@/ui/components';
import { Routes } from '@/models/routes.model';
import styles from './vehicle-detail.module.scss';
import { Vehicle } from '@/models/entity.model';
import { useModal } from '@/hooks/use-modal.hook';
import { formatCredits, formatLength } from '@/utils/entity.util';

const VehicleDetail: FC<Vehicle> = ({
  id,
  name,
  model,
  manufacturer,
  class: vehicleClass,
  type,
  crew,
  passengers,
  cost_in_credits,
  length,
  max_speed,
  affiliationId,
  imagePlaceholder,
  pilots
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
            <span className={styles.vehicleType}>{type}</span>
            {vehicleClass && (
              <span className={styles.vehicleClass}>{vehicleClass}</span>
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
              <span className={styles.label}>Max Speed</span>
              <span className={styles.value}>{max_speed} km/h</span>
            </div>

            <div className={styles.attribute}>
              <span className={styles.label}>Cost</span>
              <span className={styles.value}>{formatCredits(cost_in_credits)} credits</span>
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
          </div>
        </div>

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
                    page: String(Math.ceil(parseInt(pilotId) / 9)),
                    id: String(pilotId)
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
            to={Routes.VEHICLE}
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

export default VehicleDetail;
