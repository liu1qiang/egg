module.exports = app => {
    const { router, controller } = app;
    const get_dbcon_name = app.middleware.getdbconname();
    router.get('/', get_dbcon_name,controller.home.index);
    router.get("/index2",controller.home.index2);
    router.post("/index3",controller.home.index3);
    router.post("/index4",get_dbcon_name,controller.home.index4);
    router.get("/index5",controller.home.index5)
  };