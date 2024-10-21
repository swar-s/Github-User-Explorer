import React from 'react'

const Repo = ({repos}) => {
  return (
    <>
        {repos.map((user,idx)=>(
            <div key={idx} className='bg-gray-900 leading-7 p-3'>
                <a href={user?.html_url} target='_blank' className='text-teal-400 break-words font-semibold hover:text-gray-500'>
                    {user?.full_name}
                </a>
                <div className='text-sm'>
                    <h2>
                        {"🟢 " + user?.language}
                    </h2>
                </div>
            </div>
        ))}
    </>
  )
}

export default Repo