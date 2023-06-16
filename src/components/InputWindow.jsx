import React from 'react'

const InputWindow = ({ setInput }) => {

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className='flex flex-col'>
      <h1 className="text-stone-500 font-bold text-xl">
        Input
      </h1>
      <div className="overflow-y-scroll no-scrollbar text-white font-mono h-56 rounded-md font-normal text-sm">
        <textarea 
          aria-labelledby="Input Window"
          className='w-full rounded-md h-56 p-2 bg-[#1e1e1e]'
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default InputWindow