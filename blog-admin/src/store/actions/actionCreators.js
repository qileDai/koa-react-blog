/*
 * @Author: Booble 
 * @Date: 2021-05-Tu 09:38:47 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-05-Tu 09:38:47 
 */
// /src/store/actionCreators.js
import { CHANGINPUT, ADDBBIMN, DELEMTITEM, UPDATEINFO } from "./actionTypes";
export const changInput = (value) => ({
    type: CHANGINPUT,
    value: value
})
export const addbindCheng = () => ({
    type: ADDBBIMN,
})
export const deleteItemCheng = (index) => ({
    type: DELEMTITEM,
    value:index
})
export const updateinfo = (value) => ({
  type: UPDATEINFO,
  value: value,
});
