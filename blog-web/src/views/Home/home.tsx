import React from 'react'
import CreateBlogs from './create_blogs'
import ShowBlogs from './showBlogs'

export default function Home() {
  return (
    
<div className="w-full bg-slate-500 p-5 max-h-[90vh] overflow-auto s">
  <CreateBlogs />
  
  <ShowBlogs />
</div>


 
  )
}
