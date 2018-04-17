import Realm from 'realm';

const BookSchema={
    name:'BookData',
    properties:{
        _id:'string',
        cover:'string',
        title:'string',
        shortIntro:'string',
        retentionRatio:'int',
        latelyFollower:'int',
    }
};

const BookTopClass={
    name:'BookTopData',
    properties:{
        title:'string',
    }
};

const BookClass={
    name:'BookClass'  ,
    properties:{
       key:'string',
       data:{type:'list',objectType:'BookClassList'}
    }
};

const BookClassList={
    name:'BookClassList',
    properties:{
        name:'string',
        bookCount:'int'

    }
};

let realm = new Realm({schema:[BookSchema,BookTopClass,BookClass,BookClassList]});

class RealmBook {

    /**
     * 增
     * @param schema
     * @param data
     */
     static create(schema,data) {
        // console.log(data)
        realm.write(()=>{
            for (let i=0;i<data.length;i++){
                let item = data[i];
                let params = {_id:item._id,cover:item.cover,title:item.title,shortIntro:item.shortIntro,retentionRatio:item.retentionRatio,latelyFollower:item.latelyFollower};
                realm.create(schema,params);
            }
        })
    }

    static createTopView(schema,data){
         realm.write(()=>{
             for (let i=0;i<data.length;i++){
                 let item = data[i];
                 realm.create(schema,{title:item})
             }
         })
    }

    static createClassView(schema,data){
        console.log(data);
        realm.write(()=>{
            for (let i=0;i<data.length;i++){
                let item = data[i];
                let array =item.data;
                for (let i=0;i>array.length;i++){
                    console.log(array[i])
                }
                realm.create(schema,{key:item.key,data:item.data})
            }
        })
    }

    /**
     * 全部
     * @param schame
     * @returns {Realm.Results<any>}
     */
    static loadAll(schema) {
        return realm.objects(schema)
    }

    /**
     * 条件查询
     * @param schema
     * @param filtered
     * @returns {*}
     */
    static filtered(schema,filtered) {

        let objects = realm.objects(schema);
        let object = objects.filtered(filtered);
        if (object){
            return object
        }else {
            return 'data not find'
        }
    }

    /**
     * 删除所有
     * @param schema
     */
    static removeAllData(schema){
        realm.write(()=>{
            let objects = realm.objects(schema);
            realm.delete(objects);
        })
    }
}





global.RealmBook =RealmBook;
