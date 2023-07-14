// components/HomePage.js
import React, {useEffect, useState} from 'react';
import Navbar from '../components/navbar';
import './dashboard.css';
import {getProducts} from "../api";

function DashboardPage() {
    const [dataList, setDataList] = useState([]);
    const fileRef = React.createRef();
    const url = 'http://localhost:5001'
    const getData = () => {
        getProducts().then(res => {
            if (res&&res.data) {
                setDataList(res.data);
            }
        })
    }

    const upload = (e) => {

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        fetch('http://localhost:5001/api/uploadData', {
            method: 'POST',
            body: formData
        }).then(res=>{
            console.log(res)
            if (res.status===200){
                getData()
            }else{
              res.json().then(_res=>{
                  alert(_res.message)
              })
            }
        })
    }

    useEffect(() => {
        let userInfo = localStorage.getItem('userInfo');
        try {
            userInfo = typeof userInfo === 'string' && JSON.parse(userInfo);
            if (!userInfo.email) {
                window.location.href = '/';
            } else {
                getData()
            }
        } catch (e) {
            localStorage.removeItem('userInfo');
        }

        fileRef.current && fileRef.current.addEventListener('change', upload)
        return () => {
            fileRef.current && fileRef.current.removeEventListener('change', upload)
        }
    }, [])

    const ListItem = ({data, key}) => {
        const item = data
        return (
            <tr key={key}>
                <td>
                    <a href={url + item.skuNumberPDF} target="_blank" rel="noopener noreferrer">
                        {item.skuNumber}
                    </a>
                </td>
                <td>
                    <a href={url + item.productionOrderPDF} target="_blank" rel="noopener noreferrer">
                        {item.productionOrder}
                    </a>
                </td>
                <td>
                    <a href={url + item.productionSpecSheetPDF} target="_blank" rel="noopener noreferrer">
                        {item.productionSpecSheet}
                    </a>
                </td>
                <td>{item.status}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
        );
    };


    return (
        <div>
            <Navbar/>
            <div className={'container'}>
                <div className={'operation-header'}>
                    <form id="upload-form" action="upload.php" method="POST" encType="multipart/form-data">
                        <label htmlFor="file-upload" id="custom-upload-label" className={'hide'}>选择文件：</label>
                        <input ref={fileRef} type="file" id="file-upload" className={'hide'}
                               name="file-upload"></input>
                        <button onClick={() => {
                            document.querySelector('#file-upload').click();
                        }} type="button" id="custom-upload-button" className={'button'}>Upload data
                        </button>
                        <input type="submit" value="上传" className={'hide'}></input>
                    </form>
                </div>
                <div className={'data-list'}>
                    <table className={'list-table'}>
                        <thead>
                        <tr>
                            <th>SKU Number</th>
                            <th>Production Order</th>
                            <th>Production Spec Sheet</th>
                            <th>Status</th>
                            <th>Uploaded At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataList.map((item, index) => {
                            return <ListItem key={index} data={item}/>
                        })}
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    );
}

export default DashboardPage;

