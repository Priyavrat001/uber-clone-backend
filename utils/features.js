const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "stric",
    httpOnly: true,
    secure: process.env.NODE_ENV
}

const TryCatch = (func)=> async(req, res, next)=>{
    try {
        await func(req, res, next);
    } catch (error) {
        next(error)
    }
}

export {
    TryCatch,
    cookieOptions
}