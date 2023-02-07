<script lang="ts" setup>
import { Helpers, GameConstant, ApiRepository } from 'shared'
import { ref } from 'vue'
import swal from 'sweetalert'
import type { JsonGames } from 'shared'

class Cell {
  public hasBomb: boolean
  public position: { row: any; column: any }
  public bomCount: number
  public isOpen: boolean
  public hasFlag: boolean
  public bombing: boolean
  public isFinished: boolean
  public neighborhood: any[]

  constructor(row: number, column: number) {
    this.hasBomb = false
    this.position = {
      row: row,
      column: column
    }
    this.bomCount = 0
    this.isOpen = false
    this.hasFlag = false
    this.bombing = false
    this.isFinished = false
    this.neighborhood = []
  }
  update(dataObj: any) {
    if (dataObj.bomCount) this.bomCount = dataObj.bomCount
    if (dataObj.isOpen) this.isOpen = dataObj.isOpen
    if (dataObj.hasFlag) this.hasFlag = dataObj.hasFlag
    if (dataObj.bombing) this.bombing = dataObj.bombing
    if (dataObj.isFinished) this.isFinished = dataObj.isFinished
    if (dataObj.neighborhood) this.neighborhood = dataObj.neighborhood
    if (dataObj.position) this.position = dataObj.position
  }
}

class Table {
  public row: any[]
  public try: number
  public rowLength: number
  public columnLength: number
  public cellLength: number
  public cells: any[]
  public bombLength: number
  public isFinished: boolean
  public isGameOver: boolean

  constructor() {
    this.row = []
    this.try = 0

    this.rowLength = 9
    this.columnLength = 9
    this.cellLength = this.rowLength * this.columnLength
    this.cells = []
    this.bombLength = 10
    this.isFinished = false
    this.isGameOver = false
    this.init()
  }
  init() {
    for (var i = 0; i < this.rowLength; i++) {
      this.cells[i] = []
      this.row = this.cells[i]
      for (var j = 0; j < this.columnLength; j++) {
        var cell = new Cell(i, j)
        this.cells[i].push(cell)
      }
    }
    this.try = 0
    for (var i = 0; i < this.rowLength; i++) {
      for (var j = 0; j < this.columnLength; j++) {
        this.cells[i][j].neighborhood = this.getNeighborhood(this.cells[i][j].position)
      }
    }
  }
  createBomb(position: any) {
    var bombIndexes = []
    for (var i = 0; i < this.bombLength; i++) {
      var randomRow = position.row
      var randomColumn = position.column
      while (position.row === randomRow && position.column === randomColumn) {
        randomRow = Math.floor(Math.random() * this.rowLength)
        randomColumn = Math.floor(Math.random() * this.columnLength)
      }
      var bombIndex = [randomRow, randomColumn]
      bombIndexes.push(bombIndex)
    }

    for (var i = 0; i < this.bombLength; i++) {
      this.cells[bombIndexes[i][0]][bombIndexes[i][1]].hasBomb = true
    }
    for (var i = 0; i < this.rowLength; i++) {
      for (var j = 0; j < this.columnLength; j++) {
        var bomCount = this.getbomCount(this.cells[i][j].neighborhood)
        this.cells[i][j].update({
          bomCount: bomCount
        })
      }
    }
  }
  //bomb
  changeTableStateToBomb() {
    var bombState = {
      bombing: true,
      isOpen: true
    }
    this.chageEachCellState(bombState)
    this.isGameOver = true
    this.isFinished = true
    swal('Oh no!', `You lose in ${this.try} moves`, 'warning')
  }
  changeCellState(clickedCell: any) {
    this.applayOpenState(clickedCell)
    if (this.isBombCell(clickedCell)) {
      this.changeTableStateToBomb()
      return
    }
    this.checkNeighborhood(clickedCell)
    this.isFinished = this.isFinish()
    if (this.isFinished) {
      this.chageEachCellState({ isFinished: true })
    }
  }
  isBombCell(clickedCell: any) {
    if (clickedCell.hasBomb) {
      return true
    } else {
      this.try++
      return false
    }
  }
  checkNeighborhood(clickedCell: any) {
    if (clickedCell.bomCount === 0) {
      for (var i = 0; i < clickedCell.neighborhood.length; i++) {
        if (!clickedCell.neighborhood[i].isOpen) {
          this.applayOpenState(clickedCell.neighborhood[i])
          if (clickedCell.neighborhood[i].bomCount === 0) {
            this.checkNeighborhood(clickedCell.neighborhood[i])
          }
        }
      }
    }
  }
  getNeighborhood(position: any) {
    var neighborhood = []
    for (var i = position.row - 1; i < position.row + 2; i++) {
      for (var j = position.column - 1; j < position.column + 2; j++) {
        if (position.row === i && position.column === j) {
        } else {
          if (i > -1 && i < this.rowLength && j > -1 && j < this.columnLength) {
            neighborhood.push(this.cells[i][j])
          }
        }
      }
    }
    return neighborhood
  }
  getbomCount(neighborhood: any) {
    var count = 0
    for (var i = 0; i < neighborhood.length; i++) {
      if (neighborhood[i]) {
        if (neighborhood[i].hasBomb) {
          count++
        }
      }
    }
    return count
  }
  applayOpenState(clickedCell: any) {
    this.cells[clickedCell.position.row][clickedCell.position.column].update({
      isOpen: true
    })
  }
  isFinish() {
    var count = 0
    for (var i = 0; i < this.rowLength; i++) {
      for (var j = 0; j < this.columnLength; j++) {
        if (this.cells[i][j].isOpen && !this.cells[i][j].hasBomb) {
          count++
        } else if (!this.cells[i][j].isOpen && this.cells[i][j].hasBomb) {
          count++
        }
      }
    }
    if (count === this.cellLength) {
      const points = this.try
      if (Helpers.isLogged()) {
        swal({
          title: 'Good job!',
          text: `You won in ${this.try} tries! Do you want save your record?`,
          icon: 'warning',
          buttons: [true],
          dangerMode: false
        }).then(async (willSave) => {
          if (willSave) {
            const userId = Helpers.getUserId()
            if (!userId)
              // TODO segnalare errore
              return
            const totalScore = {
              userId: userId,
              gameId: GameConstant.MINESWEEPER,
              score: points
            } as JsonGames.IGameResult
            let response = await ApiRepository.putUserScore(totalScore, userId)
            swal('Poof! Your record is saved!', {
              icon: 'success'
            })
          } else {
            swal('Your record is NOT saved!')
          }
        })
      } else {
        swal({
          title: 'Good job!',
          text: `You won in ${this.try} tries!`,
          icon: 'warning',
          dangerMode: false
        })
      }

      return true
    } else {
      return false
    }
  }
  buildFlag(clickedCell: any) {
    var cell = this.cells[clickedCell.position.row][clickedCell.position.column]
    if (cell.hasFlag) {
      cell.update({
        hasFlag: false
      })
    } else {
      cell.update({
        hasFlag: true
      })
    }
  }

  clear() {
    var initialState = {
      hasFlag: false,
      isOpen: false,
      hasBomb: false,
      bomCount: null,
      bombing: false,
      isFinished: false
    }
    this.chageEachCellState(initialState)
    this.isFinished = false
    this.isGameOver = false
  }
  chageEachCellState(stateObj: any) {
    for (var i = 0; i < this.rowLength; i++) {
      for (var j = 0; j < this.columnLength; j++) {
        this.cells[i][j].update(stateObj)
      }
    }
  }
}

let table = ref(new Table())
let count = ref(0)
let row = ref(table.value.row)
let tableCell = ref(table.value.cells)

const click = (data: any) => {
  if (table.value.isFinished) {
    swal('Oh no!', 'You lose', 'warning')
    return
  }
  count.value++
  if (count.value === 1) {
    table.value.createBomb(data.position)
  }
  table.value.changeCellState(data)
}
const buildFlag = (data: any) => {
  if (table.value.isFinished) {
    return
  }
  event?.preventDefault()
  table.value.buildFlag(data)
}

const restart = () => {
  table.value.clear()
  count.value = 0
}
</script>
<template>
  <div class="h-screen">
  <div class="flex justify-center m-10">
      <p
        class="bg-stone-100 px-4 py-2 text-black font-bold text-4xl rounded-lg shadow-[inset_0_3px_0_rgba(255,255,255,.25)]"
        >Minesweeper</p
      >
  </div>
  <!-- <div class="flex justify-center"> -->
  <!-- <button @click="restart" -->
  <!--   class="py-3 px-5 m-5 font-black bg-lyellow rounded-full"  -->
  <!--   v-bind:class="{ finished: table.isFinished }">RESTART</button> -->
  <!-- </div> -->
  <div id="field" class="animate-in fade-in zoom-in duration-500">
    <table class="flex justify-center p-2">
      <tbody>
        <tr v-for="row in tableCell" v-bind:key="row">
          <td
            class="cell"
            v-for="item in row"
            v-bind:key="item"
            v-on:click="click(item)"
            v-on:contextmenu="buildFlag(item)"
            v-bind:class="{
              bombIng: item.bombing,
              count: item.bomCount,
              normal: !item.bomCount,
              bomb: item.hasBomb && item.isOpen,
              isOpen: item.isOpen,
              isFinished: item.isFinished,
              hasFlag: item.hasFlag,
              count2: item.bomCount === 2 && item.isOpen,
              count3: item.bomCount === 3 && item.isOpen,
              count4: item.bomCount === 4 && item.isOpen
            }"
          >
            <p v-if="item.isOpen && item.bomCount !== 0">{{ item.hasFlag ? '' : item.bomCount }}</p>
            <svg
              v-if="item.hasFlag"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              version="1.1"
            >
              <view viewBox="0 0 24 24" />
              <polygon points="6,0 20,9 6,18" fill="rgb(66, 185, 131)" />
              <polygon points="6,2 8,2 8,24 6,24" fill="rgb(44, 62, 80)" />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>
