/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import DropDown from './common/DropDown'
import Footer from './common/Footer'
import Navbar from './common/Navbar'
import Rawtable from './common/communityComponents/Rawtable'

  const users: User[] = [
    {
      id: 1,
      name: 'Erik',
      points: 13733,
      data: '19 sept 2022',
      game: { id:"6" , name:'ticTacToe'}
    },
    {
      id: 2,
      name: 'man',
      points: 13703,
      data: '19 sept 2022',
      game: { id:"6" , name:'ticTacToe'}
    },
    {
      id: 3,
      name: 'io',
      points: 133,
      data: '19 sept 2022',
      game: { id:"6" , name:'ticTacToe'}
    },
    {
      id: 4,
      name: 'si',
      points: 11333,
      data: '19 sept 2022',
      game: { id:"1" , name:'minesweeper'}
    }
  ]

export interface List {
 id: string
 name: string
}

export type Game  = List;
interface User{
  id: number
  name: string
  points: number
  data: string
  game: Game
}

 const games :Game[] = [{id: "1", name: "minesweeper"}, {id: "2", name: "2048"}, {id: "3", name: "hangMan"}, {id:"4", name:'memoryGame'},{id:"5", name:'quizGame'}, {id:"6", name:'ticTacToe'}]
const Community = () => {
  
  const [filteredIds, setFilterdIds]= useState<string[]>(["1","2","3","4","5","6"]);


  const onDropDownSelectItem = (filteredId: string) => {
    
    console.log(filteredId)
    const isIdPresent = filteredIds?.includes(filteredId)

    if(isIdPresent){
      let values = filteredIds.filter( id => id === filteredId)
      setFilterdIds(values)
    }else{
      const newFilteredIds = [...filteredIds, filteredId];
      setFilterdIds(newFilteredIds);
    }

  }


  

  return (
    <div className="h-full">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex mt-8  justify-between" style={{ flexFlow: 'wrap' }}>
            <h2 className="text-2xl font-semibold mb-5 leading-tight">Game leaderboard</h2>
            <DropDown list={games} onSelectItem={onDropDownSelectItem} />
          </div>
          <div className="-mx-4 mt-10 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className=" min-w-full shadow-md rounded-lg overflow-hidden inline-block">
              <table className="min-w-full leading-normal text-center 	">
                <thead>
                  <tr style={{ textAlignLast: 'center' }}>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="py-3 pr-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Game
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                     if(filteredIds.includes(user.game.id))
                        return <Rawtable  name={user.name} points={user.points} data={user.data} game={user.game} />
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Community
