import { FC } from 'react';
import { Button } from '@/ui/components';
import { Routes } from '@/models/routes.model';
import styles from './character-detail.module.scss';
import { Character, CharacterStatus, ForceAlignment } from '@/models/entity.model';
import { useModal } from '@/hooks/use-modal.hook';
import { getImage } from '@/utils/fetch.util';

const getStatusBadge = (status: CharacterStatus) => {
  const statusClasses = {
    [CharacterStatus.ALIVE]: styles.statusAlive,
    [CharacterStatus.DECEASED]: styles.statusDeceased,
    [CharacterStatus.UNKNOWN]: styles.statusUnknown,
  };

  return (
    <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

const getForceAlignmentBadge = (alignment?: ForceAlignment) => {
  if (!alignment) return null;

  const alignmentClasses = {
    [ForceAlignment.LIGHT]: styles.forceLight,
    [ForceAlignment.DARK]: styles.forceDark,
    [ForceAlignment.NEUTRAL]: styles.forceNeutral,
  };

  return (
    <span className={`${styles.forceBadge} ${alignmentClasses[alignment]}`}>
      {alignment} side
    </span>
  );
};

const CharacterDetail: FC<Character> = ({
  id,
  name,
  role,
  affiliations,
  species,
  homeWorld,
  homeWorldId,
  birthYear,
  vehicles,
  starships,
  weapons,
  isForceUser,
  forceAlignment,
  imagePlaceholder,
  imageUrl,
  status,
  alternateIdentity
}) => {
  const { closeModal } = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={styles.image}
          style={{
            backgroundColor: imagePlaceholder,
            backgroundImage: `url(${getImage(imageUrl, "characters", true)})`
          }}
        />

        <div className={styles.info}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.role}>{role}</p>

          <div className={styles.badges}>
            {getStatusBadge(status)}
            {isForceUser && getForceAlignmentBadge(forceAlignment)}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Background</h3>
          <div className={styles.grid}>
            <div className={styles.attribute}>
              <span className={styles.label}>Species</span>
              <span className={styles.value}>{species}</span>
            </div>

            <div className={styles.attribute}>
              <span className={styles.label}>Birth Year</span>
              <span className={styles.value}>{birthYear || 'Unknown'}</span>
            </div>

            <div className={styles.attribute}>
              <span className={styles.label}>Home World</span>
              <Button
                intent="ghost"
                size="sm"
                className={styles.linkButton}
                to={Routes.PLANET}
                params={{
                  id: homeWorldId
                }}
              >
                {homeWorld}
              </Button>
            </div>

            {alternateIdentity && (
              <div className={styles.attribute}>
                <span className={styles.label}>Alternate Identity</span>
                <Button
                  intent="ghost"
                  size="sm"
                  className={styles.linkButton}
                  to={Routes.CHARACTER}
                  params={{
                    id: alternateIdentity
                  }}
                >
                  View Alternate Identity
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Affiliations</h3>
          <div className={styles.tags}>
            {affiliations.map((affiliation, index) => (
              <span key={index} className={styles.tag}>
                {affiliation}
              </span>
            ))}
          </div>
        </div>

        {weapons.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Weapons</h3>
            <div className={styles.tags}>
              {weapons.map((weapon, index) => (
                <span key={index} className={styles.tag}>
                  {weapon}
                </span>
              ))}
            </div>
          </div>
        )}

        {vehicles.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Vehicles</h3>
            <div className={styles.tags}>
              {vehicles.map((vehicle, index) => (
                <span key={index} className={styles.tag}>
                  {vehicle}
                </span>
              ))}
            </div>
          </div>
        )}

        {starships.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Starships</h3>
            <div className={styles.tags}>
              {starships.map((starship, index) => (
                <span key={index} className={styles.tag}>
                  {starship}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <Button
            intent="primary"
            to={Routes.CHARACTER}
            params={{ id }}
            onClick={closeModal}
          >
            View Full Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
