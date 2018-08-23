<template>
    <div class="daily">
        <div class="daily-menu">
            <div class="daily-menu-item"
                :class="{on : type ==='recommend'}"
                @click="handleToRecommend"
            >每日推荐</div>
            <div class="daily-menu-item"
                :class="{on:type ==='daily'}"
                @click="showThemes = !showThemes"
            >主题日报</div>
            <ul v-show="showThemes">
                <li v-for="item in themes" :key="item.id">
                    <a :class="{on:item.id === themeId && type === 'daily'}"
                        @click="handleToTheme(item.id)"
                    >{{item.name}}</a>
                </li>
            </ul>
        </div>
        <div class="daily-list" ref='list' @scroll="handleScroll">
            <template v-if="type==='recommend'">
                <div v-for="obj in recommendList">
                    <div class="daily-date">
                        {{formatDay(obj.date)}}
                    </div>
                    <Item
                        v-for="item in obj.stories"
                        :key="item.id"
                        :data="item"
                        @click.native="handleClick(item.id)"
                    ></Item>
                    </div>
                
            </template>
            <template v-if="type === 'daily'">
                <Item
                    v-for="item in list"
                    :key="item.id"
                    :data="item"
                    @click.native="handleClick(item.id)"
                ></Item>
            </template>
        </div>
        <daily-article :id="articleId"></daily-article>
    </div>
</template>
<script>
import $ from './libs/util'
import Item from './components/item.vue'
import dailyArticle from './components/daily-article.vue'
export default {
    data　() {
        return{
            themes:[],//主题数组
            list:[],//是为了显示中间列表
            recommendList:[],//每日推荐的列表数组
            showThemes:false,
            type:'recommend',
            themeId:0,//主题id
            dailyTime:$.getTodayTime(),
            isLoading:false,
            articleId:0
        }
    },
    components:{
        Item,
        dailyArticle
    },
    methods:{
        handleToRecommend () {//点击每日推荐后执行，将类型改为推荐，再清空推荐列表，获取今日推荐列表
            this.type = 'recommend';
            this.recommendList = [];
            this.dailyTime = $.getTodayTime();
            this.getRecommendList();
        },
        getRecommendList(){//获取今日推荐列表,放入到recommendList数组中，在html里会根据它循环遍历出来
            this.isLoading = true;
            const prevDay = $.prevDay(this.dailyTime+86400000);
            $.ajax.get('news/before/'+prevDay).then(res => {
                this.recommendList.push(res);
                this.isLoading = false;
            })
        },
        getThemes () {//用力来初始化主题日报额主题数组 themes[]
            $.ajax.get('themes').then(res => {
                this.themes = res.others;
            })
        },
        handleToTheme (id) {//点击主题日报的子元素时，获取当前主题的文章列表,参数为点击主题的主题id根据这个id我们才能获取到这个主题的文章列表
            //改变菜单分类
            this.type = 'daily';
            //设置当前点击主题日报子元素的id
            this.themeId = id;
            //清空中间栏的内容
            this.list = [];
            $.ajax.get('theme/'+id).then(res => {//点击之后，会将返回的数据转交给当前实例的list数组，为了以后在中间栏中显示
                this.list =res.stories;
            })
        },
        formatDay (date) {
                let month = date.substr(4, 2);
                let day = date.substr(6, 2);
                if (month.substr(0, 1) === '0') month = month.substr(1, 1);
                if (day.substr(0, 1) === '0') day = day.substr(1, 1);
                return `${month} 月 ${day} 日`;//es6模板字符串的写法
            },
        handleScroll () {//当列表栏滚动时，出现再次加载，此函数只在每日推荐的文章列表中
            const $list = this.$refs.list;
            if(this.type === 'daily' || this.isLoading){
                return;
            }
            if($list.scrollTop+document.body.clientHeight>=$list.scrollHeight){
                this.dailyTime-=86400000;
                this.getRecommendList();
            }
        },
        handleClick (id) {
            this.articleId = id;
        }
    },
    mounted() {
        this.getThemes();
        this.getRecommendList();
    },
}
    
</script>
<style>

</style>
