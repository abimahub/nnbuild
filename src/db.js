import Dexie from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'

export const db = new Dexie('nn-photos')
db.version(1).stores({
    photos: "id", // Primary key, don't index photos
})

async function addPhoto(id, imgSrc){
    try {
        // Add the new photo with id as key for todo array in localStorage
        // to avoid having a second pk for one todo item
        const i = await db.photos.add({
         id: id,
         imgSrc: imgSrc,  
        });
        console.log(`Photo ${imgSrc.length} bytes successfully added. Got id ${i}`);
    } catch (error) {
        console.log(`Failed to add photo: ${error}`)
        throw new Error("Failed to add photo from database");
    }
    return (
    <>
        <p>
            {imgSrc.length} &nbsp; | &nbsp; {id} 
        </p>   
    </>
    )
}

function GetPhotoSrc(id){
    const img = useLiveQuery(
        ()=>db.photos.where('id').equals(id).toArray()
    )
    console.table(img)
    if(Array.isArray(img)) {
        return img[0].imgSrc;
}
};

async function deletePhoto(id) {
    console.log('deletePhoto', id)
    try {
        await db.photos.where('id').equals(id).delete();
        console.log(`Photo ${id} successfully removed.`);
    } catch (error) {
      console.log(`Failed to delete photo`);
      throw new Error("failed to delete photo from database");
}
}

async function getPhoto(id) {
    try{
        const photo = await db.photos.get(id);
        return photo;
    } catch (error) {
        console.error("Error fetching photo:", error);
        throw new Error("Failed to fetch photo from database");
    }
}
export {addPhoto, GetPhotoSrc, deletePhoto, getPhoto};