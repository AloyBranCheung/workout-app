import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"

interface CarouselProps {
  items: { id: string | number; value: React.ReactNode }[]
}

export default function Carousel({ items }: CarouselProps) {
  const swiperSlideWrap = items.map((item) => (
    <SwiperSlide key={item.id}>{item.value}</SwiperSlide>
  ))

  return <Swiper modules={[Navigation, Pagination]}>{swiperSlideWrap}</Swiper>
}
