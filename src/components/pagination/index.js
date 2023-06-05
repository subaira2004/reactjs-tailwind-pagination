import React, { useState, useEffect, useRef } from 'react';
import _ from "lodash";


export default function Pagination(props) {
  let _ShowPageCount = 10;
  if (window.innerWidth <= 640) {
    _ShowPageCount = 5;
  }

  const inputRef = useRef(null);

  const [pageSize, setPageSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pages, setPages] = useState([]);
  const [curPageNum, setCurPageNum] = useState(12);
  const [showPageCount, setShowPageCount] = useState(_ShowPageCount);
  const [totalPages, setTotalPages] = useState(0);
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 640) {
      setShowPageCount(5)
    }
    else {
      setShowPageCount(10)
    }
  });

  function goToPage() {
    let pageNum = parseInt(inputRef.current.value);
    let isGoToPage = props.goToPage(pageNum);
    if (isGoToPage) {
      setCurPageNum(pageNum);
      //initPagination();

    }
  }

  function initPagination() {
    let _totalPages = parseInt(props.totalRecords / pageSize) +
      ((props.totalRecords % pageSize) > 0 ? 1 : 0);
    setTotalPages(_totalPages);
    let tmpPageList = [];

    if (_totalPages > 0) {

      if (_totalPages < showPageCount) {
        tmpPageList = [...Array(_totalPages).keys()];
        tmpPageList = tmpPageList.map(i => i + 1);
      }

      else if (showPageCount == 10) {
        tmpPageList = [...Array(10).keys()];
        if (curPageNum <= 5 && curPageNum + 4 <= _totalPages) {
          tmpPageList = tmpPageList.map(i => i + 1);
        }
        else if (curPageNum + 5 > _totalPages) {
          tmpPageList = tmpPageList.map(i => {
            return _totalPages - (10 - (i + 1))
          });
        }
        else if (parseInt(curPageNum / 5) > 0 && curPageNum + 4 <= _totalPages) {
          tmpPageList = tmpPageList.map(i => {
            if (i < 4) {
              return (curPageNum + i) - 5
            }
            else {
              return curPageNum + (i - 5);
            }
          });
        }

      }
      else if (showPageCount == 5) {
        tmpPageList = [...Array(5).keys()];
        if (curPageNum <= 2 && curPageNum + 2 <= _totalPages) {
          tmpPageList = tmpPageList.map(i => i + 1);
        }
        else if (curPageNum + 2 > _totalPages) {
          tmpPageList = tmpPageList.map(i => {
            return _totalPages - (5 - (i + 1))
          });
        }
        else if (parseInt(curPageNum / 2) > 0 && curPageNum + 2 <= _totalPages) {
          tmpPageList = tmpPageList.map(i => {
            if (i < 2) {
              return (curPageNum + i) - 2
            }
            else {
              return curPageNum + (i - 2);
            }
          });
        }
      }
      else {
        tmpPageList = [curPageNum];
      }
    }
    setPages(tmpPageList)
  }

  useEffect(() => {
    //setCurPageNum(1);
    setTotalRecords(props.totalRecords)
    initPagination();
  }, [showPageCount, curPageNum])


  return (



    <div className=''>
      <p> pages to show :{showPageCount}</p>
      <p>curren Page : {curPageNum}</p>
      <h1>total Records {totalRecords} so total Pages : {totalPages}.</h1>
      <h2>Start editing to see some magic happen!</h2>
      <br />
      {
        pages && pages.length > 0 &&
        <div className='flex w-full justify-center'>
            <ul className="flex justify-between w-[300px] md:w-[500px] rounded border-[#ccc] p-2">
              {
                pages.map(s => (
                  <li>{s}</li>
                ))
              }
            </ul>
        </div>
      }
      <input ref={inputRef} type='text'></input>
      <button onClick={goToPage}>go to PAge</button>
    </div>
  );
}