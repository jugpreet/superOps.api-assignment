import React, { useState, useEffect } from "react";
import { data } from "./Data.js";
import "./CheckBoxItem.css";
import { images } from './images'


const CheckBoxItem = () => {
const dataTemp =JSON.parse(localStorage.getItem("data"))
  const [checkBoxItem, setCheckBoxitem] = useState(dataTemp);
  const [change, setchange] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  const [edittedItem, setEdittedElement] = useState("");
  
useEffect(() => {
  localStorage.setItem("data",JSON.stringify(data))
}, [])

  const handleDeleteItem = (id) => {
    let temp = [];
    const searchElement = (id, arr) => {
      arr?.forEach((data, index) => {
        if (data?.id === id) {
          arr.splice(index, 1);
        }
        if (data?.property?.length) {
          searchElement(id, data?.property);
        }
      });
      return arr;
    };
    temp = searchElement(id, checkBoxItem);
    setchange(!change);
    localStorage.setItem("data",JSON.stringify(temp))
    setCheckBoxitem(temp);
  };

  const handleEditItem = (id) => {
    setEdit(!edit);
    setId(id);
    let temp = [];
    const searchElement = (id, arr) => {
      arr?.forEach((data, index) => {
        if (data?.id === id) {
          data["name"] = edittedItem?edittedItem:data?.name;
        }
        if (data?.property?.length) {
          searchElement(id, data?.property);
        }
      });
      return arr;
    };
    temp = searchElement(id, checkBoxItem);
    setchange(!change);
    setEdittedElement("");
    localStorage.setItem("data",JSON.stringify(temp))
    setCheckBoxitem(temp);
  };

  const handleChangeEdit = (e) => {
    setEdittedElement(e.target.value);
  };

  const checkMate = (id) => {
    const searchElement = (arr) => {
      arr?.forEach((data, index) => {
        if (data?.id === id) {
          let res = [];
          if (data?.property?.length > 0) {
            res = data?.property?.filter((data) => {
              return !data.checked;
            });
          }
          if (res.length === 0) {
            data["checked"] = true;
          } else {
            data["checked"] = false;
          }
        }
        if (data?.property?.length) {
          searchElement(data?.property);
        }
      });
      setCheckBoxitem(arr);
    };
    searchElement(checkBoxItem);
  };

  let parentID = 0;
  const handleCheckedItem = (arr, id) => {
    arr?.forEach((data, index) => {
      if (data?.id === id) {
        data["checked"] = !data.checked;
        parentID = data?.parent;
        if (data.property.length > 0 && data?.checked===true) {
          data?.property?.forEach((data) => {
            data["checked"] = true;
          });
        }
        else if(data.property.length > 0 && data?.checked===false){
            data?.property?.forEach((data) => {
                data["checked"] = false;
              });
        }
      }
      if (data?.property?.length) {
        handleCheckedItem(data?.property, id);
      }
    });

    setCheckBoxitem(arr);
    setchange(!change);
    checkMate(parentID);
  };


  const renderItems = (arr) => {
    return (
      <ul className='maxlist'>
        {arr?.map((data, index) => {
          return (
              
            <li className='miniList' key={data?.id}>
               <div className="list-item">
              <input
                type="checkbox"
                data-testid="cbShowHide"
                id={data?.name}
                name={data?.name}
                value={data?.name}
                checked={data?.checked}
                onChange={() => handleCheckedItem(checkBoxItem, data?.id)}
              />
              <label  htmlFor={data?.name}>{data?.name}</label>
             
          <div className='imagediv'>
              {edit && id === data?.id && (
                <input
                  type="text"
                  data-testid="cbShowHideedit"
                  onChange={(e) => handleChangeEdit(e)}
                />
              )}
              <img src={images.edit}  alt='edit' data-testid="editbutton" className='images' onClick={() =>  handleEditItem(data?.id)}/>
              <img src={images.delete} alt='delete' className='images' onClick={() => handleDeleteItem(data?.id)}/>
              </div>
              </div>
              {data?.property?.length > 0 && renderItems(data?.property)}
           
            </li>
          );
        })}
      </ul>
    );
  };
  const searchItem = (e) => {
    let tempArr = [];
    const searchItemTemp = (arr) => {
      arr?.forEach((item, index) => {
        if (item?.name?.toLowerCase().includes(e.target.value?.toLowerCase())) {
          tempArr.push(item);
        }
        if (item?.property?.length) {
          searchItemTemp(item?.property);
        }
      });
      return tempArr;
    };
    const temp = searchItemTemp(data);

    e.target.value ? setCheckBoxitem(temp) : setCheckBoxitem(data);
  };
  useEffect(() => {
    renderItems(checkBoxItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change]);
  return (
    <div className='MainContainer'>
      <input data-testid="box1" className='SearchTAB'type="text" onChange={(e) => searchItem(e)} />
      <div> {renderItems(checkBoxItem)}</div>
    </div>
  );
};
export default CheckBoxItem;
