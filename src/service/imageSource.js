import axios from 'axios';
/**
 * 获取图片api
 * @param name
 * @param page
 * @param size 最大60，否则没用
 * @param width
 * @param height
 * @return {Promise<*>}
 */
export async function fetchImages({ name, page, size, width, height }) {
  const url = 'http://image.baidu.com/search/acjson';
  return await axios.get(url, {
    params: {
      tn: 'resultjson_com',
      ipn: 'rj',
      ct: '201326592',
      fp: 'result',
      queryWord: name,
      cl: 2,
      lm: -1,
      ie: 'utf-8',
      oe: 'utf-8',
      st: -1,
      ic: 0,
      word: name,
      face: 0,
      istype: '2nc=1',
      pn: page * size,
      rn: size,
      width,
      height
    },
  });
}
