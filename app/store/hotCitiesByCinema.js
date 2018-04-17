/**
 * @flow
 */
import {observable,action,runInAction} from 'mobx';
import {BaseApi,TimeApi} from "../assest/api";
import {HTTPUtil} from "../utils/httpUtil1";

class hotCitiesByCinemaStore {

    @observable city = [];

    @observable loading:boolean = true;

    @action fetchCityData=async()=>{

        let url = BaseApi.TimeMovie +TimeApi.HotCitiesByCinema;

        try{
            const data = await HTTPUtil.get(url);
            runInAction(()=>{

                this.loading = false;
                let data1 =[];

                /**
                 * json数据的改造 [key:'',data:[]]
                 * @type {Array.<T>}
                 */

                let city = data.p.sort((a,b)=>{
                    return a.pinyinFull.localeCompare(b.pinyinFull)
                });

               'ABCDEFGHIKLMNOPQRSTUVWXYZ#'.split('').forEach((firstLetter,i)=>{
                    let obj = {key:firstLetter,data:[]}
                    city.forEach((item,i)=>{
                        if (item.pinyinFull.slice(0,1)===firstLetter){
                            obj.data.push(item)
                        }
                    });
                   data1.push(obj)
                });

                this.city = data1;
                console.log(data1)
            })
        }catch (e){
            console.log(e)
        }
    };
}

const HotCitiesByCinemaStore = new hotCitiesByCinemaStore();

export {
    HotCitiesByCinemaStore
} ;



