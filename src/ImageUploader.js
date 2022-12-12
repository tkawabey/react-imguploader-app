import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageLogo from "./image.svg";
import "./ImageUpload.css";
import storage from "./firebase";
//import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ImageUploader = () => {
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false); 



    const OnFileUpdloadToFirebase = (e) => {
        //console.log(e);
        //console.log(e.target.value);
        //console.log(e.target.files);
        //console.log(e.target.files[0].name);

        const fileNm = e.target.files[0].name;


        const storageRef = ref(storage, 'images/' + fileNm );
/*
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
*/
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        
         // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setLoading( true );
        switch (snapshot.state) {
            case 'paused':
            console.log('Upload is paused');
            break;
            case 'running':
            console.log('Upload is running');
            break;
        }
        }, 
        (error) => {
        // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
            // ロード完了
            setLoading( false );
            setUploaded( true );
        }
        );
    };

    return (
    <>
    {loading ? <h2>ローディング中です</h2> : (
        <>
        {uploaded ?　<h2>完了</h2> : 



    <div className="outerBox">
        <div className="title">
            <h2>画像アップローダー</h2>
            <p>JpegかPngの画像ファイル</p>
        </div>
        <div className="imageUplodeBox">
            <div className="imageLogoAndText">
                <img src={ImageLogo} alt="imagelogo" />
                <p>ここにドラッグ＆ドロップしてね</p>
            </div>
           <input className="imageUploadInput" multiple name="imageURL" accept=".png, .jpeg, .jpg" type="file" onChange={OnFileUpdloadToFirebase}/>
        </div>
        <p>または</p>
        <Button variant="contained">
            ファイルを選択
            <input className="imageUploadInput"  accept=".png, .jpeg, .jpg"  type="file"  onChange={OnFileUpdloadToFirebase} />
        </Button>
    </div> }
        </>
    )}
    </>
    );
};

export default ImageUploader;