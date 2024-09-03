// import Image from "next/image";
import { Inter } from "next/font/google";
import '@nutui/nutui-react/dist/style.css'
const inter = Inter({ subsets: ["latin"] });
import { SearchBar } from '@nutui/nutui-react'
import { VirtualList } from '@nutui/nutui-react'
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
export default function Home() {
  const [list, setList] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const isLoading = useRef(false)
  const getData = async () => {
    let res = await axios.get('https://itunes.apple.com/hk/rss/topfreeapplications/limit=10/json')
    setList(res.data.feed.entry)
  }
  const itemRender = (data) => {
    return <div >
      <img src={data['im:image'][1].label}/>
      <p style={{textOverflow:'hidden'}}>{data['im:name'].label}</p>
      <p>游戏</p>
      </div>
  }

  useEffect(() => {
    getData()
  }, [pageNo])
  return (
    <div
      // className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
     <SearchBar shape="round" maxLength={5} />
    <div>
      recommend
      <VirtualList
      list={list}
      itemRender={itemRender}
      itemHeight={124}
      // containerHeight={341}
      width="100%"
      // onScroll={onScroll}
      direction="horizontal"
    />
    </div>
    
    </div>
  );
}
