'use client'
import Carousel from '@/src/components/Carousel'
import React from 'react'

function page() {
  const items = [
    {
      title: "natural image 1",
      url: "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg"
    },
    {
      title: "natural image 2",
      url: "https://www.ibexcreative.com/app/uploads/enviroguard-bird-control-1200x800.jpg"
    },
    {
      title: "natural image 3",
      url: "https://cdn.pixabay.com/photo/2017/06/05/18/35/flower-meadow-2374841_1280.jpg"
    },
    {
      title: "natural image 4",
      url: "https://i.pinimg.com/736x/d6/16/c6/d616c67b17d0c3af022c480d7e356549.jpg"
    },
    {
      title: "natural image 5",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv2R5bh1OGFo5CbTSsQoqeRXccAox3aaiX1NyUQxIdPojfMFOLi_YaAqJU&s=10"
    },
    {
      title: "natural image 6",
      url: "https://img.magnific.com/hinh-chup-mien-phi/anh-can-canh-mot-con-buom-xinh-dep-dau-tren-bong-hoa-co-canh-mau-cam_181624-13884.jpg?semt=ais_hybrid&w=740&q=80"
    }
  ]
  return (
    <div>
      {/* <p>Home page</p> */}
      {/* <div className='realtive w-full'>
        <div className="flex flex-nowrap">
          {items.map(item => (
            <div className="w-1/3" key={item.title}>
              <img src={item.url} alt={item.title} className='w-full aspect-video' />
            </div>
          ))}
        </div>
      </div> */}
      <Carousel items={items} slideToShow={3} gap={10}
        className='w-1/3 p-2 bg-gray-200 rounded-2xl mx-2'
        renderItems={
          (item) => <img src={item.url} alt={item.title} className='w-full aspect-[2/3] rounded-lg' />
        }
        // showArrow={false}
        responesive={[
          { screen: 'tablet', slidesToShow: 2 },
          { screen: 'mobile', slidesToShow: 1 }
        ]}
      />
    </div>
  )
}

export default page
