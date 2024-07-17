import { useGameStore } from '@/components/providers/GameProvider';
import React, { useState } from 'react';
import styles from './index.module.scss';
import CategoryListBar from './components/CategoryListBar';
import SearchField from '../SearchField';
import Announce from '../Announce';
import ListSmallIcons from './components/ListSmallIcons';

const MainContentList = () => {
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const gameInfoGroup = useGameStore((state) => state.gameInfoGroup);
  const sideBar = useGameStore((state) => state.sideBar);
  const [activePlatformId, setActivePlatformId] = useState(-1);
  const [searchFieldData, setSearchFieldData] = useState('');

  return (
    <div className={styles.mainListWrapper}>
      {activeSideBarItem.type === 4 ? (
        <div className={styles.categorySearchContainer}>
          <CategoryListBar setActivePlatformId={setActivePlatformId} />
          <div className={styles.searchWrapper}>
            <SearchField searchFieldData={searchFieldData} setSearchFieldData={setSearchFieldData} />
          </div>
        </div>
      ) : (
        <div className={styles.announceSearchContainer}>
          <Announce />
          <div className={styles.searchWrapper}>
            <SearchField searchFieldData={searchFieldData} setSearchFieldData={setSearchFieldData} />
          </div>
        </div>
      )}

      <div className={styles.listContainer}>
        {sideBar.map((item, idx) => {
          if (item.type !== 2 && item.type !== 3) {
            if (item.type === 4) {
              return (
                activeSideBarItem.id === item.id &&
                gameInfoGroup?.map((platform, idx) => {
                  return (
                    activePlatformId === platform.id && (
                      <ListSmallIcons
                        key={idx}
                        searchFieldData={searchFieldData}
                        setSearchFieldData={setSearchFieldData}
                      />
                    )
                  );
                })
              );
            } else {
              return (
                activeSideBarItem.id === item.id && (
                  <ListSmallIcons key={idx} searchFieldData={searchFieldData} setSearchFieldData={setSearchFieldData} />
                )
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default MainContentList;