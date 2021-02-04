const { verify } = require("jsonwebtoken");

module.exports=(options,app)=>{

    return async function(ctx,next){
        const authoriation = ctx.get('Authoriation');
        if(authoriation){
            try {
                const user = await verifyToken(authoriation,app.config.jwtSecret)
                ctx.session.user = user
                await next()
            } catch (error) {
                ctx.status = 401;
                ctx.body = 'TOKEN验证失败'
            }
        }else{
            ctx.status = 401
            ctx.body = '没有TOKEN'
        }
    }
}