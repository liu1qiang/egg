module.exports = appInfo => {
    const config = exports = {};
    config.keys = appInfo.name + '_1523879140687_7825';
    config.middleware = [];
    //单源
    // config.mysql = {
    //     client: {
    //         host: 'your host',
    //         port: 3306,
    //         user: 'root',
    //         password: 'your pwd',
    //         database: 'your db'
    //     },
    //     app: true,
    //     agent: false,
    // };
    //多源
    config.mysql = {
        clients: {
            db1: {
                host: '192.168.1.234',
                password: 'd2eam',
                database: 'mysql'
            },
            db2: {
                host: '192.168.1.8',
                password: 'qweqwe',
                database: 'mysql'
            }
        },
        //每个db共用的配置
        default: {
            port: 3306,
            user: "root"
        },
        app: true,
        agent: false,
    };
    config.cluster = {
        listen: {
            port: 6688,
            hostname: "127.0.0.1"
        }
    };
    config.security = {
        xframe: {
            enable: false
        },
        csrf: false
    };
    config.view = {
        defaultViewEngine: '.ejs',
        mapping: {
            '.ejs': 'ejs'
        }
    }
    return config;
};
