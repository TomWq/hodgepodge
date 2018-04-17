/**
 * @flow
 */

import {observable,action,runInAction,toJS} from 'mobx';
import {BaseApi,BookApi} from "../assest";
import {HTTPUtil} from "../utils/httpUtil1";
class bookClassListStore{

    @observable data=[];

    @observable loading = true;

    @observable type='hot';

    @observable number=0;

    @observable classSmallData = [];

    @observable isClassType = true;

    @observable total = '';

    @observable loadingMore = true;

    @observable id:'';

    @observable bookDetail = {};

    @observable bookDetailLoading = true;

    @observable comment = [];

    @observable evaluation_data = [];

    @observable evaluation_total= '';

    @observable recommend_data =[];

    @observable bookComments = [];

    @observable bookCommentsLoading = true;

    @observable bookCommentsToday = '';

    @observable bookCommentsTotal = '';

    @observable bookShortComments = [];

    @observable bookShortCommentsSum = '';

    @observable bookReviewsComments = [];

    @observable bookReviewsTotal='';

    @observable originalPriceText = '';

    @observable original_id = '';

    @observable chapter_data = [];

    @observable chapter = '';

    @action fetchData=(gender:string,type:string,major,minor:string)=> {

        this.loading = true;
        this.data = [];
        let url = BaseApi.BookBase1 + BookApi.categories;
        let params = {
            gender: gender, type: type, major: major, minor: minor, start: this.number, limit: 20
        };

        HTTPUtil.get(url, params).then((data)=>{
            this.loading = false;
            this.data = data.books;
            this.total = data.total;
            RealmBook.removeAllData('BookData');
            RealmBook.create('BookData',data.books);
        }).catch((e)=>{
            console.log(e);
            let localData = RealmBook.loadAll('BookData');
            this.data = localData;
            this.loading = false;
        })
    };

    //判断数据是否过时
    @action checkDate=(longTime)=>{
        let nowDate = new Date();
        let targetDate = new Date().setTime(longTime);
        if (nowDate.getMonth()!==targetDate.getMonth()) return false;
        if (nowDate.getDay()!==targetDate.getDay()) return false;
        if (nowDate.getHours()-targetDate.getHours()>1) return false;
        return true;
    };


    @action fetchMoreData = async(gender:string,type:string,major,minor:string,start:number)=>{

        this.loadingMore = true;

        let url = BaseApi.BookBase1+BookApi.categories;

        let params = {
            gender:gender,type:type,major:major,minor:minor,start:start,limit:20
        };
        try{
            const data = await HTTPUtil.get(url,params);
            runInAction(()=>{
                this.loadingMore = false;
                this.data = this.data.concat(data.books);
            });

        }catch (e){
            console.log(e)
        }
    };

    @action fetchClassSmall=async(gender,major)=>{

        let url = BaseApi.BookBase1+BookApi.lv2;
        this.classSmallData = [];
        HTTPUtil.get(url).then((data)=>{
            this.dealArray(data,gender,major);
        }).catch((e)=>{
            console.log(e);
            this.classSmallData = RealmBook.loadAll('BookTopData')
        });

    };


    @action fetchBookDetail=async(id)=>{

        this.bookDetailLoading = true;
        this.comment = [];
        this.bookDetail = {};
        this.evaluation_data = [];
        this.evaluation_total = '';
        this.recommend_data = [];
        this.originalPriceText = '';

        let url = BaseApi.BookBase1+BookApi.booId+id;
        let comment_url = BaseApi.BookBase1+'/books/'+id+'/editor-comments?n=1';
        let evaluation_url =BaseApi.BookBase1+BookApi.short_evaluation+id;
        let recommend_url = BaseApi.BookBase1+'/book/'+id+BookApi.recommend;
        let pricr_url = BaseApi.BookBase1+'/book/'+id+BookApi.price;
        let original_url = BaseApi.BookBase1+BookApi.btoc;
        const params = {
            limit:3,
            total:true,
            sortType:'hottest'
        };

        const params1={
            view:'summary',
            book:id
        };

        const recommend_params = {packageName:'com.ushaqi.zhuishushenqi'};

        try{
            const data = await HTTPUtil.get(url);
            const comment = await HTTPUtil.get(comment_url);
            const evaluation_data = await HTTPUtil.get(evaluation_url,params);
            const recommend_data = await HTTPUtil.get(recommend_url,recommend_params);
            const pricr_data = await HTTPUtil.get(pricr_url);
            const original_data = await HTTPUtil.get(original_url,params1);
            runInAction(()=>{
                this.bookDetailLoading = false;
                this.bookDetail = data;
                this.comment = comment.docs;
                //console.log(this.comment.slice(0));
                this.evaluation_data = evaluation_data.docs;
                this.evaluation_total = evaluation_data.total;
                this.recommend_data = recommend_data.books;
                this.originalPriceText = pricr_data.doc.originalPriceText;
                this.original_id = original_data[0]._id;
                this.chapterFetchData(original_data[0]._id);
            })
        }catch (e){
            console.log(e)
        }
    };

    @action fetchBookComments=async(id)=>{

            this.bookCommentsLoading = true;
            let url = BaseApi.BookBase1+BookApi.by_book;
            let short_url = BaseApi.BookBase1+BookApi.short_review;
            let review_url =BaseApi.BookBase1+BookApi.review;
            const params = {
                book:id,
                sort:'comment-count',
                type:'normal,vote',
                start:0,
                limit:20,
            };
            const short_params={
                book:id,
                limit:20,
                start:0,
                sortType:'hottest',
                total:true
            };
            const review_params = {
                book:id,
                sort:'comment-count',
                start:0,
                limit:20,
            };

            const data =await HTTPUtil.get(url,params);
            const short_comment_data = await HTTPUtil.get(short_url,short_params);
            const review_data = await HTTPUtil.get(review_url,review_params);
            runInAction(()=>{

                this.bookComments = data.posts;
                this.bookShortCommentsSum= short_comment_data.total;
                this.bookCommentsTotal = data.total;
                this.bookCommentsToday = data.today;
                this.bookReviewsTotal = review_data.total;
                this.bookShortComments = short_comment_data.docs;
                this.bookReviewsComments = review_data.reviews;
                this.bookCommentsLoading= false;
                //console.log(review_data,data.posts,short_comment_data.docs,review_data.reviews)
            })
    };

    @action chapterFetchData=async(id)=>{

        this.chapter_data = [];
        console.log(id)

        let url = BaseApi.BookBase1+BookApi.atoc+id;

        const params = {
            view:'chapters'
        };
        const chapter_data = await HTTPUtil.get(url,params);
        runInAction(()=>{
            if (chapter_data){
                this.chapter_data = chapter_data.chapters;
            }
        })
    };

    @action chapterFetch=async(link)=>{

        let chapter_url = BaseApi.BookBase3 +link;
        const chapter = await HTTPUtil.get(chapter_url);
        runInAction(()=>{
            this.chapter = chapter.chapter.cpContent;
            console.log(chapter.chapter.cpContent)
        })

    };

    @action dealArray=(obj,gender,major)=>{

        let data = [];
        let data1 = [];
        let data2 = [];

        RealmBook.removeAllData('BookTopData');

        for (let i in obj){
            if (i !=='ok'){
                data.push(obj[i])
            }
        }
        'male,female,picture,press'.split(',').forEach((typeTitle,i)=>{
            let obj = {key:typeTitle,data:[]};
            data.forEach((itemType,index)=>{
                if (i ===index){
                    obj.data.push(itemType)
                }
            });
            data1.push(obj)
        });

        data1.forEach((item,i)=>{
            if (item.key === gender){
                item.data.forEach((item1, i)=>{
                    item1.forEach((item2,i)=>{
                        if(item2.major === major){
                            if (item2.mins.length !==0){
                                item2.mins.forEach((item3,i)=>{
                                    let obj1 = {title:item3}
                                    data2.push(obj1)
                                });
                                this.classSmallData = data2;
                                RealmBook.createTopView('BookTopData',item2.mins);
                                this.isClassType = true;
                            }else {
                                this.isClassType = false;
                            }
                        }
                    })
                })
            }
        })
    };


    @action assignment=(array)=>{
        this.book_simple_array = array
    }
}


const BookClassListStore = new bookClassListStore();

export {
    BookClassListStore
}