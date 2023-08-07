import React from 'react'

const InputWindow = ({ setInput }) => {

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className='flex flex-col md:w-2/12'>
      <h1 className="text-stone-500 font-bold text-xl">
        Input
      </h1>
      <div className="text-white font-mono md:h-56 2xl:h-72 h-28 rounded-md font-normal text-sm">
        <textarea 
          aria-label="Input Window"
          className='w-full rounded-md h-56 p-1 bg-[#1e1e1e]'
          style={{ resize: 'none', height: '100%'}}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default InputWindow