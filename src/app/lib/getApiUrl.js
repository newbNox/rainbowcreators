export async function getApiUrl(path){
    if(process.env.NODE_ENV === 'development'){
        return `http://localhost:3000/api/${path}`;
    } else {
        return `https://rainbowcreators.live/api/${path}`;
    }
}