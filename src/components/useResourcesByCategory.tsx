import { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';

import {
  TCategoryStub,
  TResource,
  TResourcesByCategoryPayload
} from '../types';

const useResourcesByCategory = (
  category: TCategoryStub
): undefined | null | TResource[] => {
  const [resourcesByCategory, setResourcesByCategory] = useState<
    undefined | null | TResource[]
  >();

  useEffect(() => {
    if (category) {
      const getResourceByCategory = async (): Promise<void> => {
        try {
          const { data } = await apiClient.get<TResourcesByCategoryPayload>(
            `/category/${category}`
          );

          if (!data.category) {
            throw new Error(
              'no category found in resources by category response'
            );
          }

          const {
            category: { subcategories }
          } = data;
          if (!subcategories.length) {
            throw new Error(
              'no sub-categories found in resources by category response'
            );
          }

          const uniqueResources = subcategories.reduce<TResource[]>(
            (categoryResources, subcategory) => {
              const { resources: subcategoryResources } = subcategory;
              if (!subcategoryResources || !subcategoryResources.length) {
                return categoryResources;
              }

              const uniqueSubcategoryResources = categoryResources.length
                ? subcategoryResources.filter(
                    resource =>
                      !categoryResources.find(
                        categoryResource => categoryResource.id === resource.id
                      )
                  )
                : subcategoryResources;

              return categoryResources.concat(uniqueSubcategoryResources);
            },
            []
          );

          setResourcesByCategory(uniqueResources);
        } catch (err) {
          setResourcesByCategory(null);
          // TODO: log this error
          console.log(err);
        }
      };

      getResourceByCategory();
    }
  }, [category]);

  return resourcesByCategory;
};

export default useResourcesByCategory;