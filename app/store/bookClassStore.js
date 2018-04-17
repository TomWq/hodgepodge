import {observable,action,runInAction} from 'mobx';
import {BaseApi,BookApi} from "../assest";
import {HTTPUtil} from "../utils/httpUtil1";

class bookClassStore {

    @observable data =[];

    @observable loading = true;

    @action fetchData=async()=>{

        let url = BaseApi.BookBase1 + BookApi.statistics;

        HTTPUtil.get(url).then((data)=>{
            this.loading = false;
            this.data = dealArray(data).slice(0);
        }).catch((error)=>{
            console.log(error);
           // this.loading = false;
           // this.data = RealmBook.loadAll('BookClass')
        });
    }

}

function dealArray(array) {

    //   { key: "A", data: [{ title: "阿童木" }, { title: "阿玛尼" }, { title: "爱多多" }] },

    let data = [];

    let data1 = [];

    for (let i in array){
        if (i!=='ok'){data.push(array[i])}

    }

    '男生,女生,漫画,出版'.split(',').forEach((typeTitle,index)=>{
        let obj = {key:typeTitle,data:[]};
        data.forEach((item1, i)=>{
            if(i===index){
                item1.forEach((item2,)=>{
                    'male,female,picture,press'.split(',').forEach((item,i1)=>{
                        if (i1 ===index){
                            item2.type = item
                        }
                    });
                });
                obj.data.push(item1)
            }
        });
        data1.push(obj);
    });
    //RealmBook.removeAllData('BookClass');
    //RealmBook.createClassView('BookClass',data1);
    return data1;

}


const BookClassStore = new bookClassStore();

export {
    BookClassStore
}