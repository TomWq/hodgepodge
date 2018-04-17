/**
 *
 * @type {{get: (function(string, any, string)), post: (function(string, any, string))}}
 */

const HTTPUtil = {

    get(url:string, params:any, headers:string){
        if(params){
            let paramsArray = [];
            Object.keys(params).forEach(key=>paramsArray.push(key+'='+params[key]));
            if(url.search(/\?/) == -1){
                url += '?'+paramsArray.join('&');
            }else {
                url += '&'+paramsArray.join('&');
            }
        }



        return new Promise((resolve:any, reject:any)=>{

            fetch(url,{
                method:'GET',
                headers: {  'Cache-Control': 'no-cache'}
            }).then((response)=>{
                if(response.ok){
                    return response.json();

                }else {
                    reject({status:response.status})
                }
            }).then((responseData)=>{
                resolve(responseData);
            }).catch((error)=>{
                reject({status:-1});
                console.log(error);
            });
        });
    },

    post(url:string, formData:any, headers:string){
        return new Promise((resolve:any, reject:any)=>{
            //console.log('postData',formData);
            fetch(url,{
                method:'POST',
                headers: headers,
                body:formData?formData:JSON.stringify(formData)
            }).then((response)=>{
                //console.log(response)
                if(response.ok){
                    return response.json();

                }else{
                    reject({status:response.status})
                }
            }).then((responseData)=>{
                //console.log(responseData)
                resolve(responseData);
            }).catch((error)=>{
                reject({status:-1});
                console.log(error);
            });
        });
    }

};


// HTTPUtil.get=(url, params, headers)=>{
//     if(params){
//         let paramsArray = [];
//         Object.keys(params).forEach(key=>paramsArray.push(key+'='+params[key]));
//         if(url.search(/\?/) == -1){
//             url += '?'+paramsArray.join('&');
//         }else {
//             url += '&'+paramsArray.join('&');
//         }
//     }
//     return new Promise((resolve, reject)=>{
//         fetch(url,{
//             method:'GET',
//              headers: {  'Cache-Control': 'no-cache'}
//         }).then((response)=>{
//             if(response.ok){
//                 return response.json();
//             }else {
//                 reject({status:response.status})
//             }
//         }).then((responseData)=>{
//             resolve(responseData);
//         }).catch((error)=>{
//             reject({status:-1});
//             console.log(error);
//         })
//     })
// };
// let JsonHeaders = {
//   'Content-Type': 'application/json',
// };
// let urlHeader = {
//   'Content-Type': 'application/x-www-form-urlencoded',
// };
//
// HTTPUtil.post=(url, formData,headers)=>{
//
//     return new Promise((resolve, reject)=>{
//       //console.log('postData',formData);
//       fetch(url,{
//             method:'POST',
//             headers: headers,
//             body:formData?formData:JSON.stringify(formData)
//         }).then((response)=>{
//           //console.log(response)
//             if(response.ok){
//                 return response.json();
//
//             }else{
//                 reject({status:response.status})
//             }
//         }).then((responseData)=>{
//            //console.log(responseData)
//             resolve(responseData);
//         }).catch((error)=>{
//             reject({status:-1});
//             console.log(error);
//         })
//     })
// };

export {
    HTTPUtil
} ;
