const Service = require("egg").Service

class homeService extends Service {
    async index_service(num) {
        return 10 * num
    };
    async index_sqlByid(id) {
        return 132;
        var sql = "select * from test_user_lq where id = ?"
        var user = await this.app.mysql.query(sql, [id])
        return user
    };
    async index_sqlAdd(nick, age) {
        return { id: 12 }
        var sql = "insert into test_user_lq(`nick`,`age`) values(?,?)"
        var add_res = await this.app.mysql.query(sql, [nick, age]);
        return add_res
    };
    async index_getDBprocesslist(db_name) {
        var client = await this.app.mysql.get(db_name);
        var sql = "show full processlist"
        var user = await client.query(sql)
        return user
    };

}
module.exports = homeService;