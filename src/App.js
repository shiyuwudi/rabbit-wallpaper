import React from 'react';
import { Tabs, Icon } from 'antd';
import './App.css';
import RabbitWallpaperManager from "./components/RabbitWallpaperManager";
import MyFavorite from "./components/MyFavorite";

const { TabPane } = Tabs;

function App() {
  return (
      <div className="app-container">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={(<span><Icon type="search" />给我搜</span>)}
            key="1"
          >
            <RabbitWallpaperManager />
          </TabPane>
          <TabPane
            tab={<span><Icon type="heart" style={{ color: 'red' }} />收藏夹</span>}
            key="2"
          >
            <MyFavorite />
          </TabPane>
        </Tabs>
      </div>
  );
}

export default App;
