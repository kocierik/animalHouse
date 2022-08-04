import React, { ChangeEvent, ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { List } from '../Community';

interface Props {
  gameInfo: List;
  onChange: (id : string ) => void
}

const ItemDropdown = ({
  gameInfo,
  onChange,
}: Props) => {

   const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) =>{
     onChange(e.target.value)
   }


  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <div className="pl-4 flex items-center">
            <div className="bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
              <input type="checkbox"  onChange={onChangeCheckBox} value={gameInfo.id}  className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
              <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                <svg
                  className="icon icon-tabler icon-tabler-check"
                  xmlns="http://www.w3.org/2000/svg"
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </div>
            </div>
            <p className="text-sm leading-normal ml-2 text-gray-800">{gameInfo.name}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemDropdown
