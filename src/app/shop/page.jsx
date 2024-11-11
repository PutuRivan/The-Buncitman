import Product from '@/components/Card/Product'
import React from 'react'

const shop = () => {
  return (
    <>
      <section className='flex flex-col gap-10 p-10'>
        <div>
          <h1 className='text-Heading-1 font-bold'>Products</h1>
          <p className='text-Heading-3 font-semibold'>Discover our premium coffee beans and bottled delights.</p>
        </div>
        <div className='grid grid-cols-4 gap-10 mx-10'>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
        </div>
      </section>
    </>
  )
}

export default shop