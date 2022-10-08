<script lang="ts">
'use strict'
import { Helpers } from 'shared'
import { putUserScore } from 'shared/src/apiRepository'
import { MINESWEEPER } from 'shared/src/gameConstant'
import swal from 'sweetalert'

class Cell {
  constructor(row, column) {
    this.hasBomb = false
    this.position = {
      row: row,
      column: column,
    }
    this.bomCount = 0
    this.isOpen = false
    this.hasFlag = false
    this.bombing = false
    this.isFinished = false
    this.neighborhood = []
  }
  update(dataObj) {
    for (var variable in dataObj) {
      this[variable] = dataObj[variable]
    }
  }
}

class Table {
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
  createBomb(position) {
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
          bomCount: bomCount,
        })
      }
    }
  }
  //bomb
  changeTableStateToBomb() {
    var bombState = {
      bombing: true,
      isOpen: true,
    }
    this.chageEachCellState(bombState)
    this.isGameOver = true
    this.isFinished = true
    swal('Oh no!', `You lose in ${this.try} moves`, 'warning')
  }
  changeCellState(clickedCell) {
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
  isBombCell(clickedCell) {
    if (clickedCell.hasBomb) {
      return true
    } else {
      this.try++
      console.log(this.try)
      return false
    }
  }
  checkNeighborhood(clickedCell) {
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
  getNeighborhood(position) {
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
  getbomCount(neighborhood) {
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
  applayOpenState(clickedCell) {
    this.cells[clickedCell.position.row][clickedCell.position.column].update({
      isOpen: true,
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
          buttons: true,
          dangerMode: false,
        }).then(async (willSave) => {
          if (willSave) {
            let totalScore = {
              gameId: MINESWEEPER,
              score: points,
            }
            let response = await putUserScore(totalScore, Helpers.getUserId())
            console.log(response)
            swal('Poof! Your record is saved!', {
              icon: 'success',
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
          dangerMode: false,
        })
      }

      return true
    } else {
      return false
    }
  }
  buildFlag(clickedCell) {
    var cell = this.cells[clickedCell.position.row][clickedCell.position.column]
    if (cell.hasFlag) {
      cell.update({
        hasFlag: false,
      })
    } else {
      cell.update({
        hasFlag: true,
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
      isFinished: false,
    }
    this.chageEachCellState(initialState)
    this.isFinished = false
    this.isGameOver = false
  }
  chageEachCellState(stateObj) {
    for (var i = 0; i < this.rowLength; i++) {
      for (var j = 0; j < this.columnLength; j++) {
        this.cells[i][j].update(stateObj)
      }
    }
  }
}

var table = new Table()

export default {
  data: function () {
    return {
      table: table,
      count: 0,
      row: table.row,
      tableCell: table.cells,
    }
  },
  methods: {
    click: function (data) {
      if (this.table.isFinished) {
        swal('Oh no!', 'You lose', 'warning')
        return
      }
      this.count++
      if (this.count === 1) {
        this.table.createBomb(data.position)
      }
      this.table.changeCellState(data)
    },
    buildFlag: function (data) {
      if (this.table.isFinished) {
        return
      }
      event.preventDefault()
      this.table.buildFlag(data)
    },
    restart: function () {
      this.table.clear()
      this.count = 0
    },
  },
}
</script>
<template>
  <div id="field">
    <p class="message p-10">Minesweeper's</p>
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
              count4: item.bomCount === 4 && item.isOpen,
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
    <button v-on:click="restart" class="btn-restart" v-bind:class="{ finished: table.isFinished }">RESTART</button>
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>
