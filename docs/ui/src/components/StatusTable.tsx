import React, { useState } from 'react';
import { useStorybookData } from './hooks/useStorybookData.js';
import { StorybookDataItemInterface } from './types/storybookDataItemInterface.js';
import docStyles from './styles/StatusTable.module.css';
import './styles/Table.module.css';

declare global {
  interface Window {
    __STORYBOOK_STORY_STORE__: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
      cacheAllCSFFiles: () => Promise<void>;
      cachedCSFFiles: {
        [key: string]: StorybookDataItemInterface;
      };
    };
  }
}

const StatusTable = () => {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [filterComponentName, setFilterComponentName] = useState<string>('');

  const store = window.__STORYBOOK_STORY_STORE__;
  const { data, loading, error, fetchSuccess } = useStorybookData(store, 'stories');

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

  const handleFilterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterComponentName(event.target.value);
  };

  const filteredData = Object.keys(data).filter((item) => {
    const { badges } = data[item].meta.parameters;
    const componentName = data[item].meta.title.split('/').pop();

    return (
      (!selectedBadge || badges?.includes(selectedBadge)) &&
      (!filterComponentName || componentName?.toLowerCase().includes(filterComponentName.toLowerCase()))
    );
  });

  const renderBadgeFilter = () => (
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
  );

  const renderComponentNameFilter = () => (
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
  );

  const renderFiltersAndTable = () => (
    <>
      <div className={`${docStyles['filter-row']}`}>
        {renderBadgeFilter()}
        {renderComponentNameFilter()}
      </div>
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
    </>
  );

  const renderLoading = () => loading && <p>Loading...</p>;
  const renderError = () => error && <p>{error}</p>;
  const renderSuccess = () => fetchSuccess && renderFiltersAndTable();

  return (
    <>
      <h1 id="component-status">Component Status</h1>
      <br />
      {renderLoading()}
      {renderError()}
      {renderSuccess()}
    </>
  );
};

export default StatusTable;
