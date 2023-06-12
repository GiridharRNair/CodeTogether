import React from 'react'

const InputWindow = ({ setInput }) => {

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className='flex flex-col'>
      <h1 className="text-stone-500 font-bold text-xl mb-2">
        Input
      </h1>
      <div className="overflow-y-scroll no-scrollbar text-green-500 h-56 rounded-md font-normal text-sm mb-1">
        <textarea 
          className='w-full rounded-md h-56 bg-[#1e293b]'
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default InputWindow