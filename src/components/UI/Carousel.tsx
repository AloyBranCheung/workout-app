import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"
import { Navigation, Pagination } from "swiper/modules"

interface CarouselProps {
  items: { id: string | number; value: React.ReactNode }[]
  onSlideChange?: (swiper: SwiperCore | null) => void
  navigation?: boolean
  pagination?: boolean
}

export default function Carousel({
  items,
  navigation,
  pagination,
  onSlideChange,
}: CarouselProps) {
  const [swiperApi, setSwiperApi] = useState<SwiperCore | null>(null)

  const swiperSlideWrap = items.map((item) => (
    <SwiperSlide key={item.id}>{item.value}</SwiperSlide>
  ))

  return (
    <Swiper
      onSwiper={(swiper) => {
        setSwiperApi(swiper)
      }}
      onSlideChange={() => {
        if (onSlideChange) onSlideChange(swiperApi)
      }}
      navigation={navigation}
      modules={[Navigation, Pagination]}
      pagination={{ clickable: true, enabled: pagination }}
    >
      {swiperSlideWrap}
    </Swiper>
  )
}

Carousel.defaultProps = {
  navigation: true,
  pagination: true,
  onSlideChange: undefined,
}
