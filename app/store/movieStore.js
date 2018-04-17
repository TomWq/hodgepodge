/**
 * @flow
 */
import {observable,action,runInAction,toJS} from 'mobx';
import {BaseApi,TimeApi} from "../assest/api";
import {HTTPUtil} from "../utils/httpUtil1";
const BaseUrl = BaseApi.TimeMovie;
const MovieDetailsBase = BaseApi.MovieDetailsBase;

class movieStore {

    //正在预售
    @observable ticketMovieData = [];
    //正在热映
    @observable hotMovieData = [];
    //即将上映
    @observable immediatelyMovieData = [];
    //电影详情
    @observable movieDetailData=[];

    @observable ticketLoading = true;
    @observable hotLoading = true;
    @observable immediatelyLoading = true;
    @observable movieDetailLoading = true;

    @observable openMore = false;

    @observable loadMore = false;

    @observable actorDate = [];

    /**
     * 正在预售数据请求
     * @param locationId 城市
     * @returns {Promise.<void>}
     */
    @action fetchTicketMovieData=async(locationId:number)=>{

        let url = BaseUrl + TimeApi.HotPlayMovies;

        try{
            const data = await HTTPUtil.get(url,{locationId:locationId});
            runInAction(()=>{
                this.ticketLoading = false;
                this.ticketMovieData = data.movies;
            })

        }catch (e){
            console.log(e)
        }
    };
    /**
     * 正在热映数据请求
     * @param locationId 城市
     * @returns {Promise.<void>}
     */
    @action fetchHotMovieData=async(locationId:number)=>{

        let url = BaseUrl + TimeApi.LocationMovies;

        try{
            const data = await HTTPUtil.get(url,{locationId:locationId});
            runInAction(()=>{
                this.hotLoading = false;
                this.hotMovieData = data.ms

            })
        }catch (e){
            console.log(e)
        }

    };
    /**
     * 即将上映数据请求
     * @param locationId 城市
     * @returns {Promise.<void>}
     */
    @action fetchImmediatelyMovieData=async(locationId:number)=>{

        let url = BaseUrl + TimeApi.MovieComingNew;

        try{
            const data = await HTTPUtil.get(url,{locationId:locationId});
            runInAction(()=>{
                this.immediatelyLoading = false;
                this.immediatelyMovieData = data.attention;

            })
        }catch (e){
            console.log(e)
        }

    };
    /**
     * 影片详情
     * @param locationId 城市
     * @param movieId 影片id
     * @returns {Promise.<void>}
     */
    @action fetchMovieDetailData=async(locationId:number,movieId:number)=>{

        let url = MovieDetailsBase+TimeApi.MovieDetail;
        this.movieDetailLoading = true;
        try{
            console.log(url)
            const data = await HTTPUtil.get(url,{locationId:locationId,movieId:movieId});
            runInAction(()=>{
                this.movieDetailLoading = false;
                this.movieDetailData = data.data

                //console.log(data)
                //console.log(toJS(this.movieDetailData))
            })


        }catch (e){
            console.log(e)
        }
    };

    /**
     * 显示更多
     */
    @action showMoreContent=()=>{
        this.openMore = !this.openMore;
    }

    /**
     * 演员信息
     * @returns {Promise.<void>}
     */
    @action fetchActorData=async(movieId:number)=>{

        let url = BaseUrl+TimeApi.MovieCreditsWithTypes;

        try{
            const data = await HTTPUtil.get(url,{movieId:movieId});
            runInAction(()=>{
                this.actorDate = data;
            })
        }catch (e){
            console.log(e)
        }

    }
}

const MovieStore = new movieStore();

export {
    MovieStore
} ;



