import {decodeObjUrl} from "../utils/decodeObjUrl";


test('正确解码百度图片objUrl', () => {
    expect(decodeObjUrl('ippr_z2C$qAzdH3FAzdH3Fox8_z&e3Bftgwt42_z&e3BvgAzdH3Fsw62jAzdH3FaamO2tKp2y8u26t6trt2b3n8iva7akdw_z&e3B3r2')).toBe(3);
});
