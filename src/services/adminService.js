import axios from '../axios';
import * as queryString from 'query-string';

const adminService = {

    /**
     * Đăng nhập hệ thống
     * {
     *  "username": "string",
     *  "password": "string"
     * }
     */
    login(loginBody) {
        return axios.post(`/admin/login`, loginBody)
    },

    /**
     * Lấy danh sách users hệ thống
     * tlid: mã admin đăng nhập hệ thống
     */
    getFoUsers(tlid) {
        const queryParams = {
            tlid: tlid ? tlid : null
        };
        return axios.get(`/admin/foUsers?`+ queryString.stringify(queryParams));
    },

     /**
     * Thêm/Sửa user
     * {
     *  "tlid": "number",
     *  "userid": "string"
     *  "username": "string"
     *  "usertype": "string"
     *  "fullname": "string"
     *  "password": "string"
     *  "mobile": "string"
     *  "email": "string"
     *  "status": "string"
     *  "action": "string" ADD or EDIT
     * }
     */
    addOrEditUser(userBody) {
        return axios.post(`/admin/foUsers`, userBody)
    },

    /**
     * Xóa user
     * {
     *  "tlid": "number",
     *  "userid": "string"
     *  "username": "string"
     *  "usertype": "string"
     *  "fullname": "string"
     *  "password": "string"
     *  "mobile": "string"
     *  "email": "string"
     *  "status": "string"
     *  "action": "string" DELETE
     * }
     */
    deleteUser(userBody) {
        return axios.post(`/admin/foUsers`, userBody)
    },

     /**
     * Lấy danh sách sản phẩm 
     * tlid: mã admin đăng nhập hệ thống
     */
    getFoProducts(tlid) {
        const queryParams = {
            tlid: tlid ? tlid : null
        };
        return axios.get(`/admin/foprtypes?`+ queryString.stringify(queryParams));
    },

    /**
     * Thêm/Sửa sản phẩm
     * {
     *  "tlid": "number",
     *  "prid": "string" *
     *  "prname": "string" *
     *  "prtype": "string" *
     *  "status": "string" *
     *  "description": "string"
     *  "fromDate": "string" *
     *  "toDate": "string" *
     *  "action": "string" ADD or EDIT
     * }
     */
    addOrEditProduct(productBody) {
        return axios.post(`/admin/foprtypes`, productBody)
    },

    /**
     * Xóa sản phẩm
     * {
     *  "tlid": "number",
     *  "prid": "string" *
     *  "prname": "string" *
     *  "prtype": "string" *
     *  "status": "string" *
     *  "description": "string"
     *  "fromDate": "string" *
     *  "toDate": "string" *
     *  "action": "string" DELETE
     * }
     */
    deleteProduct(productBody) {
        return axios.post(`/admin/foprtypes`, productBody)
    },

    /**
     * Lấy allCode hệ thống theo cdtype & cdname
     */
    getAllCode(cdtype, cdname) {
        const queryParams = {
            cdtype: cdtype,
            cdname: cdname
        };
        return axios.get(`/admin/allCode?`+ queryString.stringify(queryParams));
    },

    /**
     * Lấy cây menu theo gói (khi phân quyền chức năng)
     * tlid: "number" mã user
     * prid: "string" mã gói
     */
    getListMenuRightByPrid(tlid, prid) {
        const queryParams = {
            tlid: tlid,
            prid: prid
        };
        return axios.get(`/admin/listmenurigths?`+ queryString.stringify(queryParams));
    },
    
    /**
     * Lưu cây menu phân quyền chức năng
     * {
     *  "tlid": "number", 
     *  "prid": "string"
     *  "right_list": "string" menu dạng: cmdid#cmdallow$
     * }
     */
    assignRights(menuBody) {
        return axios.post(`/admin/assignRigths`, menuBody)
    },
    
    /**
     * Lấy danh sách quản lý gán nhóm
     * tlid: "number" mã user
     */
    getListFouserGroups(tlid) {
        const queryParams = {
            tlid: tlid
        };
        return axios.get(`/admin/listfousergroups?`+ queryString.stringify(queryParams));
    },

    /**
     * Gán gói dịch vụ cho khách hàng
     * {
     *  "tlid": "number",
     *  "prid": "string" 
     *  "userid": "string" 
     *  "custtype": "string" 
     *  "frdate": "string" 
     *  "todate": "string" 
     * }
     */
    addUserToGroup(assignBody) {
        return axios.post(`/admin/adduser2group`, assignBody)
    },

     /**
     * Xóa gán gói dịch vụ cho khách hàng
     * {
     *  "tlid": "number",
     *  "id": "string"  
     * }
     */
    unassignUserToGroup(unassignBody) {
        return axios.post(`/admin/removeuser2group`, unassignBody)
    },
    
};

export default adminService;