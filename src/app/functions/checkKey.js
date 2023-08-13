export async function checkKey(key){
    if(process.env.DBKEY === key){
        return true;
    } else {
        return false;
    }
}