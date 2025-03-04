import { getEntityPageConfig } from '@/config/entity.config';
import { useRouter } from '@/hooks/use-router.hook';
import { Routes } from '@/models/routes.model';
import NotFound from '@/routes/not-found/not-found.route';
import EntityPage from '@/ui/pages/entity/entity.page';

/**
 * Dynamic entity page router component
 * Automatically selects the correct configuration based on the current route
 */
const EntityPageRoute = () => {
  const { route } = useRouter();
  const config = getEntityPageConfig(route as Routes);

  if (!config) {
    return <NotFound />;
  }

  return <EntityPage {...config} />;
};

export default EntityPageRoute;
