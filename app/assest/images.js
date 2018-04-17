/**
 * @flow
 * 图片资源
 * @type {{tab: {home_uncheck: *, home_selected: *, mine_uncheck: *, mine_selected: *}}}
 */
const Images = {

    tab:{
        home_uncheck:require('./tabImg/home_uncheck.png'),
        home_selected:require('./tabImg/home_selected.png'),
        mine_uncheck:require('./tabImg/mine_uncheck.png'),
        mine_selected:require('./tabImg/mine_selected.png'),
        class_uncheck:require('./tabImg/class_uncheck.png'),
        class_selected:require('./tabImg/class_selected.png'),
    },

    icon:{
        back:require('./icon/back.png'),
        start:require('./icon/Star.png'),
        play:require('./icon/play.png'),
        shou:require('./icon/shou.png'),
        new:require('./icon/new.png'),
        new_buy_star_bg:require('./icon/new_buy_star_bg.png'),
        headerBack:require('./icon/back-icon.android.png'),
        drop_down:require('./icon/drop_down.png'),
        my_evaluate_star_dark:require('./icon/my_evaluate_star_dark.png'),
        start1:require('./icon/start1.png'),
        start2:require('./icon/start2.png'),
        start3:require('./icon/start3.png'),
        praise:require('./icon/praise.png'),
        close:require('./icon/close.png'),
        header:require('./icon/header.png'),
        message:require('./icon/message.png'),
        zan:require('./icon/zan.png'),
        bg_agree_btn_pressed:require('./icon/bg_agree_btn_pressed.png'),
        chapter_review_send:require('./icon/chapter_review_send.png'),
        share:require('./icon/share.png'),
        comments:require('./icon/comments.png')
    },
    default:{
        error_img:require('./default/error_img.png'),
        open_more:require('./default/open_more.png')
    },
    video:{
        dan_close:require('./video/dan_close.png'),
        dan_open:require('./video/dan_open.png'),
        icon_control_full_screen:require('./video/icon_control_full_screen.png'),
        icon_control_pause:require('./video/icon_control_pause.png'),
        icon_control_play:require('./video/icon_control_play.png'),
        icon_control_shrink_screen:require('./video/icon_control_shrink_screen.png'),
        icon_control_slider:require('./video/icon_control_slider.png'),
        icon_video_pause:require('./video/icon_video_pause.png'),
        icon_video_play:require('./video/icon_video_play.png'),
        repeat:require('./video/repeat.png'),
        //share:require('./video/share.png'),
        slider:require('./video/share.png')
    }

};

export {
    Images
}