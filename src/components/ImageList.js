import React from "react";
import {Card, Icon, Tooltip} from "antd";
import {favorite} from "../db/favorite";
import {decodeObjUrl} from "../utils/decodeObjUrl";

function ImageList({ data, setAsWallPaper, setFavorite, previewImage }) {
  const favDiArr = favorite.list().map(obj => obj.di);
  return (
    <div className="manager-content">
      {data.map(obj => {
        const isFav = favDiArr.includes(obj.di);
        return (
          <div className="manager-image-item-container" key={obj.di}>
            <Card
              actions={[
                <Tooltip title="设为壁纸">
                  <Icon type="check" key="check" onClick={() => setAsWallPaper(obj)} style={{ color: 'green' }} />
                </Tooltip>,
                <Tooltip title={isFav ? '移除收藏' : '加入收藏'}>
                  <Icon type="heart" key="heart" theme={isFav ? 'filled' : ''} onClick={() => setFavorite(obj, isFav)} style={{ color: isFav ? 'red' : '' }} />
                </Tooltip>,
                <Icon type="ellipsis" key="ellipsis" />,
              ]}
              cover={<img alt="example" src={decodeObjUrl(obj.objURL)} onClick={() => previewImage(obj)} />}
            >
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default ImageList;
