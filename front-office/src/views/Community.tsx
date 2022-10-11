import React, { useCallback, useState } from 'react'
import DropDown from './common/DropDown'
import Rawtable from './common/communityComponents/Rawtable'
import { ApiRepository } from 'shared'
import useEffect from 'react'
import { Community } from 'shared'

const CommunityPage = () => {
  const [usersData, setUsersData] = useState<Community.IGameValues[]>([])

  const handlePromise = async () => {
    if ((await ApiRepository.getUserScore()).esit) {
      const val = (await ApiRepository.getUserScore()).data! as Community.IGameValues[] // CONTROLLA
      setUsersData(val!)
      console.log(val!)
    }
  }

  React.useEffect(() => {
    handlePromise()
  }, [])

  const games = ['minesweeper', '2048', 'hangMan', 'memoryGame', 'quizGame', 'ticTacToe']

  return (
    <div className="h-full" data-aos="fade-up" data-aos-duration="1500">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex mt-8  justify-between" style={{ flexFlow: 'wrap' }}>
            <h2 className="text-2xl font-semibold mb-5 leading-tight">Game leaderboard</h2>
            <DropDown list={games} />
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
                      Game
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map((games) => 
                    games.scores.map((user) => {
                      return (
                      user.score.map((value) => {
                        return <Rawtable
                          name={user.username}
                          key={value}
                          points={value}
                          data={user.username}
                          game={games.gameName}
                        />  
                      })
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityPage
