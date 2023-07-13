// components/HomePage.js
import React, {useEffect} from 'react';
import Navbar from '../components/navbar';
import './home.css';

function HomePage() {

    useEffect(() => {/*
        const userInfo = localStorage.getItem('userInfo');
        try {
            typeof userInfo === 'string' && JSON.parse(userInfo);
            if (userInfo.email) {
                window.location.href = '/';
            }
        } catch (e) {
            localStorage.removeItem('userInfo');
        }
    */})
  return (
    <div>
      <Navbar />
      <h1 className="title" >Welcome to the plant management system</h1>
        {/*<div className="button-container">
            <form id="upload-form" action="upload.php" method="POST" encType="multipart/form-data">
                <label htmlFor="file-upload" id="custom-upload-label" className={'hide'} >选择文件：</label>
                <input ref={fileRef} type="file" id="file-upload" className={'hide'} name="file-upload"></input>
                    <button onClick={()=>{
                        document.querySelector('#file-upload').click();
                    }} type="button" id="custom-upload-button" className={'button'}>Upload data</button>
                    <input type="submit" value="上传" className={'hide'}></input>
            </form>
            <div className={'button'}>
                View data
            </div>
        </div>*/}
    </div>
  );
}

export default HomePage;

