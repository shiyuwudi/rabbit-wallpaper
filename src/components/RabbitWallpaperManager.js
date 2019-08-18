import React, {Component} from 'react';
import {fetchImages} from '../service/imageSource';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {Button, Input, message, Spin} from 'antd';
import './RabbitWallpaperManager.css';
import {decodeObjUrl} from "../utils/decodeObjUrl";
import {downloadImage} from "../utils/downloadImage";
import {favorite} from "../db/favorite";
import ImageList from "./ImageList";

const wallpaper = window.require('wallpaper');

message.config({
  maxCount: 1,
});

class RabbitWallpaperManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      width: 1920,
      height: 1080,
      interval: 10, // 秒
      data: [],
      listLoading: false,
      tip: null,
    };
  }


  componentDidMount() {
    (async () => {
      // await this.getData();
    })();
  }

  onKeywordChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  getData = async () => {
    const { keyword, width, height } = this.state;
    if (!keyword) {
      message.error('输入关键词');
      return;
    }
    this.setState({
      listLoading: true,
    });
    const resp = await fetchImages({
      name: keyword,
      width,
      height,
      page: 0,
      size: 60
    });
    const data = resp.data.data.filter(obj => Object.keys(obj).length > 0);
    this.setState({
      data,
      listLoading:false,
    });
  };

  setFavorite = async (dataObj, isFav) => {
    const actionName = !isFav ? '收藏' : '移除';
    try {
      if (isFav) {
        await favorite.remove(dataObj);
      } else {
        await favorite.add(dataObj);
      }
      this.forceUpdate();
      message.success(`${actionName}成功`);
    } catch (e) {
      message.error(`${actionName}失败` + e.message);
    }
  };

  setAsWallPaper = async (dataObj) => {
    try {
      this.setState({
        listLoading: true,
        tip: '正在设置壁纸...',
      });
      const { keyword } = this.state;
      const url = decodeObjUrl(dataObj.objURL);
      const extension = url.split('.').pop();
      const id = dataObj.di;
      const filename = `${keyword}-${id}.${extension}`;
      const path = await downloadImage(url, filename);
      await wallpaper.set(path);
      message.success('设置成功');
      this.setState({
        listLoading: false,
        tip: null,
      });
    } catch (e) {
      message.error('设置失败' + e.message);
      this.setState({
        listLoading: false,
        tip: null,
      });
    }
  };

  previewImage = () => {};

  render() {
    const { listLoading, data, tip } = this.state;
    return (
      <Spin spinning={listLoading} tip={tip || '正在获取图片...'}>
        <div className="manager-container">
          <div className="manager-header">
            <div className="manager-header-input">
              <Input
                  value={this.state.keyword}
                  onChange={this.onKeywordChange}
                  placeholder="搜索关键词"
                  onPressEnter={this.getData}
              />
            </div>
            <div className="manager-header-submit">
              <Button
                  type="primary"
                  onClick={this.getData}
                  loading={listLoading}
              >搜索</Button>
            </div>
          </div>
          <ImageList
            data={data}
            setAsWallPaper={this.setAsWallPaper}
            setFavorite={this.setFavorite}
            previewImage={this.previewImage}
          />
        </div>
      </Spin>
    );
  }
}

export default RabbitWallpaperManager;
