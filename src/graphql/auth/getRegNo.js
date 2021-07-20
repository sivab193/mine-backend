const jwt=require('jsonwebtoken')

const getRegNo=(req)=>{
    const header = req.headers.authorization
    if(!header){
        throw new Error("invalid auth")
    }
    const token = header.replace('Bearer ','')
    try{
        const decoded = jwt.verify(token,"ct_admin")
        // console.log(decoded);
        return decoded.username
    }
    
    catch(e){
        throw new Error("invalid access token")
    }
}

export default getRegNo