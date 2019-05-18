import JsonP from 'jsonp'
import axios from 'axios'
import Utils from './../utils/utils';
import { Modal } from 'antd'
export default class Axios {
    static requesList(_this,url,params,isMock){
        let data={params,isMock};
        this.ajax({url,data}).then(data=>{
            if(data.status=="10001"){
                _this.setState({
            //    加key值
                    dataSource:data.result.item_list.map((item,index)=>{
                        item.key=index;
                        return item;   
                }),
                // 设置分页
                pagination:Utils.pagination(data,(current)=>{
                    _this.param.page=current;
                   
                }),

            })
               }
        })
    }
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status == 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }
    static ajax(options){
        return new Promise((resolve,reject)=>{
            let loading;
            if(options.data && options.data.isloading!==false){
               
               loading=document.getElementById("ajaxLoading");
              loading.style.display="block";
            }
            axios({
                url:options.url,
                method:"get",
                baseURL:"https://easy-mock.com/mock/5cd4d66e4993c3317af3928e/mockapi",
                timeout:3000,
                params:(options.data && options.data.params) || ""
            }).then(response=>{ 
                if(options.data && options.data.isloading!==false){
                    // loading=document.getElementById("ajaxLoading");
                    loading.style.display="none";
                }
                if(response.status==200){
                   
                    let res=response.data;
                    if(res.status=='10001'){
                        resolve(res)
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.message
                        })
                    }
                }else{
                    reject(response.data)
                }
            })
        })
    }
}


// import JsonP from 'jsonp'
// import axios from 'axios'
// import { Modal } from 'antd'
// export default class Axios {
//     static jsonp(options) {
//         return new Promise((resolve, reject) => {
//             JsonP(options.url, {
//                 param: 'callback'
//             }, function (err, response) {
//                 if (response.status == 'success') {
//                     resolve(response);
//                 } else {
//                     reject(response.messsage);
//                 }
//             })
//         })
//     }

//     static ajax(options){
//         let loading;
//         if (options.data && options.data.isShowLoading !== false){
//             loading = document.getElementById('ajaxLoading');
//             loading.style.display = 'block';
//         }
//         let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
//         return new Promise((resolve,reject)=>{
//             axios({
//                 url:options.url,
//                 method:'get',
//                 baseURL:baseApi,
//                 timeout:5000,
//                 params: (options.data && options.data.params) || ''
//             }).then((response)=>{
//                 if (options.data && options.data.isShowLoading !== false) {
//                     loading = document.getElementById('ajaxLoading');
//                     loading.style.display = 'none';
//                 }
//                 if (response.status == '200'){
//                     let res = response.data;
//                     if (res.code == '0'){
//                         resolve(res);
//                     }else{
//                         Modal.info({
//                             title:"提示",
//                             content:res.msg
//                         })
//                     }
//                 }else{
//                     reject(response.data);
//                 }
//             })
//         });
//     }
// }