import { FC, useEffect, useMemo } from 'react';
import styles from './entity.module.scss';
import { usePagination } from '@/hooks/use-pagination.hook';
import { BaseEntity } from '@/models/entity.model';
import Pagination from '@/ui/components/pagination/pagination.component';
import { useModal } from '@/hooks/use-modal.hook';
import { useRouter } from '@/hooks/use-router.hook';
import Modal from '@/ui/components/modal/modal.component';

interface EntityPageProps<T extends BaseEntity> {
  entityType: string;
  endpoint: string;
  queryKey: string;
  title: string;
  subtitle: string;
  loadingMessage: string;
  itemsPerPage?: number;
  CardComponent: FC<T>;
  DetailComponent: FC<T>;
}

const EntityPage = <T extends BaseEntity>({
  endpoint,
  queryKey,
  title,
  subtitle,
  loadingMessage,
  itemsPerPage = 9,
  CardComponent,
  DetailComponent,
}: EntityPageProps<T>) => {
  const { params } = useRouter();
  const { openModal, modal } = useModal();

  const {
    data: entities,
    pagination,
    handlePageChange,
    isLoading,
  } = usePagination<T>({
    endpoint,
    itemsPerPage,
    initialPage: 1,
    queryKey,
  });

  const selectedEntity = useMemo(() => {
    if (!params.id) return;
    return entities.find(entity => entity.id === params.id);
  }, [params, entities]);

  useEffect(() => {
    if (selectedEntity?.name && modal !== selectedEntity.name) {
      openModal(selectedEntity.name);
    }
  }, [modal, openModal, selectedEntity]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {isLoading ? (
        <div className={styles.loading}>{loadingMessage}</div>
      ) : (
        <>
          <div className={styles.grid}>
            {entities.map((entity) => (
              <CardComponent key={entity.id} {...(entity)} />
            ))}
          </div>
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {selectedEntity && (
        <Modal modalName={selectedEntity.name} title={selectedEntity.name}>
          <DetailComponent {...(selectedEntity)} />
        </Modal>
      )}
    </div>
  );
};

export default EntityPage;
