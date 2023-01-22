import React, { useCallback, useState, useEffect } from 'react'
import DropDown from './common/DropDown'
import Rawtable from './common/communityComponents/Rawtable'
import { ApiRepository, JsonGames } from 'shared'
import { Community } from 'shared'

const CommunityPage = () => {
  const [usersData, setUsersData] = useState<Community.IGameValues[]>([])
  const [games, setGames] = useState<string[]>([])
  const [filter, setFilter] = useState<string[]>([])

  const handlePromise = async () => {
    if ((await ApiRepository.getUserScore()).esit) {
      const val = (await ApiRepository.getUserScore()).data! as Community.IGameValues[]
      setUsersData(val!)
      console.log(val!)
    }
  }

  const getGames = async () => {
    const data = (await ApiRepository.getGames()).data
    if (data) {
      data.map(item => {
        setGames((game => [...game, item.name]))
        console.log(item)
      })
      console.log(data)
    }
  }

  useEffect(() => {
    getGames()
    handlePromise()
  }, [])

  return (
    <div className="h-full" data-aos="fade-up" data-aos-duration="500">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex mt-8  justify-between" style={{ flexFlow: 'wrap' }}>
            <h2 className="text-2xl font-semibold mb-5 leading-tight">Game leaderboard</h2>
            <DropDown list={games} filter={filter} setFilter={setFilter} />
          </div>

          {usersData.map((games, i) => {
            return (
              games.scores.map((user) => {
                return (
                  user.score.map((value) => {
                    return (
                      <div key={i} className="-mx-4 mt-10 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <h2 className="text-2xl font-semibold mb-5 leading-tight"> {games.gameName.charAt(0).toUpperCase() + games.gameName.slice(1)} </h2>
                        <div className=" min-w-full shadow-md rounded-lg overflow-hidden inline-block">
                          <table className="min-w-full leading-normal text-center">
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
                              <Rawtable
                                name={user.username}
                                key={value}
                                points={value}
                                data={user.username}
                                game={games.gameName}
                              />
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )
                  })
                )
              })
            )
          })
          }
        </div>
      </div>
    </div>
  )
}

export default CommunityPage
                    // return games.scores.map((user) => {
                    //   return user.score.map((value) => {
                    //     return (

                    //     )
                    //   })
                    // })