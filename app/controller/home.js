const Controller = require('egg').Controller;
class HomeController extends Controller {

    async index() {
        this.ctx.logger.error("测试错输")
        console.log(this.ctx.body);
        this.ctx.body = 'Hello world';
    };
    async index2() {
        console.log(this.ctx.query)
        var date = "2018-05-12 12:23:45"
        console.log(new Date(date))
        this.ctx.body = { "a": 123, "b": 456 }
    };
    async index3() {
        let honme_ctx = this.ctx;
        var result = {};
        result.a = await honme_ctx.service.home.index_service(honme_ctx.request.body.a);
        result.user = await honme_ctx.service.home.index_sqlByid(honme_ctx.request.body.a);
        result.add_res = await honme_ctx.service.home.index_sqlAdd('lisi2', 666);
        result.obju = {
            parama: result.a,
            paramab: result.user,
            paramc: result.add_res
        }
        honme_ctx.body = result
    };
    async index4() {
        var db = this.ctx.body.dbanme
        var db_obj = await this.ctx.service.home.index_getDBprocesslist(db);
        this.ctx.body = { "链接db": db, "当前链接数": db_obj.length }
    };
    async index5() {
        var array =
            [
                { "mess": "啦啦啦啦啦1", "count": 12, "amout": 16, date: "2018-07-12", data: { "name": "zhangsan1", "age": 12 } },
                { "mess": "啦啦啦啦啦2", "count": 13, "amout": 17, date: "2018-07-13", data: { "name": "zhangsan2", "age": 13 } },
                { "mess": "啦啦啦啦啦3", "count": 14, "amout": 18, date: "2018-07-14", data: { "name": "zhangsan3", "age": 14 } }
            ];
        await this.ctx.render('test.ejs', { resultList: array })
    }
}

module.exports = HomeController;