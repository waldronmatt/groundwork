import { useEffect, useMemo, useState } from 'react';
import docStyles from './Table.module.css';

declare global {
  interface Window {
    __STORYBOOK_STORY_STORE__: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
      cacheAllCSFFiles: () => Promise<void>;
      cachedCSFFiles: {
        [key: string]: DataItem;
      };
    };
  }
}

interface DataItem {
  meta: {
    id: string;
    title: string;
    parameters: {
      item: string;
      badges: string[];
      design: {
        type: string;
        url: string;
      };
    };
  };
}

const StatusTable = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, DataItem>>({});
  const [fetchSuccess, setFetchSuccess] = useState(false);

  const store = window.__STORYBOOK_STORY_STORE__;
  const cacheFiles = useMemo(() => store.cacheAllCSFFiles(), [store]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await cacheFiles;
        const result = store.cachedCSFFiles;
        const filteredResult = Object.fromEntries(Object.entries(result).filter(([key]) => key.includes('stories')));
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
  }, [cacheFiles, store.cachedCSFFiles]);

  const renderStatusEmoji = (status: string) => {
    switch (status) {
      case 'unstable':
        return '🚧';
      case 'deprecated':
        return '⛔';
      default:
        return '✅';
    }
  };

  return (
    <>
      <h1 id="component-status">Component Status</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {fetchSuccess && (
        <div className={`${docStyles['table-scroll']}`}>
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Status</th>
                <th>Storybook</th>
                <th>Figma</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((item) => {
                const { title, id } = data[item].meta;
                const { badges, design } = data[item].meta.parameters;
                return (
                  <tr key={id}>
                    <td>{title.split('/').pop()}</td>
                    <td>{badges?.map((badge) => renderStatusEmoji(badge)) ?? 'N/A'}</td>
                    <td>
                      <a href={`/?path=/docs/${id}`}>Link</a>
                    </td>
                    <td>
                      {design?.url ? (
                        <a href={design.url} target="_blank" rel="noopener noreferrer">
                          Link
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default StatusTable;
