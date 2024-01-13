import { useState, useEffect } from 'react';
import { StorybookDataItem } from '../types/storybookDataItemInterface';

export const useStorybookData = (store: typeof window.__STORYBOOK_STORY_STORE__, filter: string) => {
  const [data, setData] = useState<Record<string, StorybookDataItem>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await store.cacheAllCSFFiles();
        const result = store.cachedCSFFiles;
        const filteredResult = Object.fromEntries(Object.entries(result).filter(([key]) => key.includes(filter)));
        setData(filteredResult);
        setFetchSuccess(true);
      } catch (err) {
        console.error(err);
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [store, filter]);

  return { data, loading, error, fetchSuccess };
};
