/**
 * 时光网api
 * @type {string}
 */
const BaseApi = {
    TimeMovie: 'https://api-m.mtime.cn',
    MovieDetailsBase:'https://ticket-api-m.mtime.cn',
    BookBase1:'http://api.zhuishushenqi.com',
    BookBase2:'http://api05iye5.zhuishushenqi.com',
    BookBase3:'http://chapterup.zhuishushenqi.com/chapter/',
    BookBase4:'http://statics.zhuishushenqi.com',
};
const TimeApi = {
    HotCitiesByCinema:'/Showtime/HotCitiesByCinema.api',
    HotPlayMovies:'/PageSubArea/HotPlayMovies.api', //正在售票 locationId=?
    LocationMovies:'/Showtime/LocationMovies.api', //正在热映locationId=?
    MovieComingNew:'/Movie/MovieComingNew.api',//即将上映locationId=?
    MovieDetail:'/movie/detail.api',//影片详情 locationId=?&movieId=?
    MovieCreditsWithTypes:'/Movie/MovieCreditsWithTypes.api', //演员列表 movieId=?
    HotComment:'/movie/hotComment.api',//影片评论 movieId=?
    Videos:'/Movie/Video.api',//预告片花絮 pageIndex=?&movieId=?
    ImageAll:'/Movie/ImageAll.api'//剧照 movieId=?
};

const BookApi={

    statistics:'/cats/lv2/statistics',  // 获取所有分类
    gender:'/ranking/gender', //获取排行榜类型
    rankId:'/ranking/:rankId', // 获取排行榜小说
    lv2:'/cats/lv2', // 获取分类下小类别
    categories:'/book/by-categories',//根据分类获取小说列表
    booId:'/book/', //获取小说信息
    btoc:'/btoc', // 获取小说正版源
    atoc:'/atoc/',//  获取小说正版源于盗版源(混合)
    mix_atoc:'/mix-atoc/', // 获取小说章节(根据小说id)
    short_evaluation:'/post/short-review?book=',
    recommend:'/recommend',
    by_book:'/post/by-book', //讨论
    short_review:'/post/short-review', //短评
    review:'/post/review/by-book',
    price:'/price-info',



};

export {
    BaseApi,TimeApi,BookApi
}

//http://http//chapterup.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com/chapter/5817f1161bb2ca566b0a5974?cv=1523353555628