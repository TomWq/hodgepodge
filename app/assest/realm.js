import Realm from 'realm';

class Book extends Realm.Object{}
Book.schema={
  name:'Book',
  properties:{
      bookItem:'data',
  }
};

class BookList extends Realm.Object{}
BookList.schema={
    name:'BookList',
    properties:{
        name:'string',
        item:{type:'list',objectType:'Book'}
    }
};

const realm = new Realm({schema:[Book,BookList]})

export {
    realm
}