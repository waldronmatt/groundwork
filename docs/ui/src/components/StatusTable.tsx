import React, { useEffect, useMemo, useState } from 'react';
import './Table.module.css';
import docStyles from './StatusTable.module.css';

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
  // data fetching states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, DataItem>>({});
  const [fetchSuccess, setFetchSuccess] = useState(false);
  // filter states
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [filterComponentName, setFilterComponentName] = useState<string>('');

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

  const handleBadgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBadge(event.target.value);
  };

  const handleFilterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterComponentName(event.target.value);
  };

  const badgeOptions: string[] = [];
  Object.keys(data).forEach((item) => {
    const { badges } = data[item].meta.parameters;
    if (badges) {
      badges.forEach((badge) => {
        if (!badgeOptions.includes(badge)) {
          badgeOptions.push(badge);
        }
      });
    }
  });

  const filteredData = Object.keys(data).filter((item) => {
    const { badges } = data[item].meta.parameters;
    const componentName = data[item].meta.title.split('/').pop();

    return (
      (!selectedBadge || badges?.includes(selectedBadge)) &&
      (!filterComponentName || componentName?.toLowerCase().includes(filterComponentName.toLowerCase()))
    );
  });

  return (
    <>
      <h1 id="component-status">Component Status</h1>
      <br />
      <div className={`${docStyles['filter-row']}`}>
        <div className={`${docStyles['filter-column']}`}>
          <label htmlFor="badge-filter">Filter by Badge:</label>
          <select id="badge-filter" onChange={handleBadgeChange}>
            <option value="">All</option>
            {badgeOptions.map((badge) => (
              <option key={badge} value={badge}>
                {badge}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-column">
          <label htmlFor="component-name-filter">Filter by Component Name:</label>
          <input
            type="text"
            id="component-name-filter"
            value={filterComponentName}
            onChange={handleFilterInputChange}
            placeholder="Enter component name"
          />
        </div>
      </div>
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
              {filteredData.map((item) => {
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
