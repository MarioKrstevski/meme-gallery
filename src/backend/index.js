import db from "../database/db";

function backend(endpoint){
    
    if( endpoint === 'get_memes'){
        console.log('im here', endpoint)
        return {
            data: db.memes,
            success: true
        }
    }
}

export default backend