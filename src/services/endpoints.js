import api from './api'

const MEMES = 'get_memes'
const PHOTOS = ''

const endpoints = {
    getMemes: async function(){
        try{
            const response = await api.get("memes", MEMES )
            return response.data.data
        } catch(err){
            console.log('error', err)
        }
    },
    getLocalMemes: async function(){
        try{
            const response = await api.get("localhost", MEMES )
            return response.data
        } catch(err){
            console.log('error', err)
        }
    },
    getPhotos: async function(){
        try{
            const response = await api.get("photos", PHOTOS )

            return response.data.map(img => {
                return {
                    ...img,
                    url: img.urls.regular
                }
            })
        } catch(err){
            console.log('error', err)
        }
    }
}

export default endpoints