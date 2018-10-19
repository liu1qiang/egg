module.exports = options => {
    return async function getdbconname(ctx, next) {
        var db_client = ctx.app.config.mysql.clients
        var dbs = [];
        for (var key in db_client) {
            dbs.push(key);
        }
        var db = dbs[parseInt(Math.random() * dbs.length)];
        var db_obj = await ctx.service.home.index_getDBprocesslist(db);
        if (db_obj.length > 50) {
            console.log("当前db连接数已达最大")
            return getdbconname(ctx, next);
        } else {
            ctx.body = { "dbanme": db }
            await next();
        }

    }
}