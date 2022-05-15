import swal from 'sweetalert';
<script>
'use strict'

//セルの状態を管理
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

//テーブルの状態管理
class Table {
  constructor() {
    //行
    this.row = []
    this.rowLength = 9
    // 列
    this.columnLength = 9
    this.cellLength = this.rowLength * this.columnLength
    this.cells = []
    //あたり
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
    for (var i = 0; i < this.rowLength; i++) {
      for (var j = 0; j < this.columnLength; j++) {
        this.cells[i][j].neighborhood = this.getNeighborhood(this.cells[i][j].position)
      }
    }
  }
  createBomb(position) {
    //ボムの位置を決める
    var bombIndexes = []
    for (var i = 0; i < this.bombLength; i++) {
      var randomRow = position.row
      var randomColumn = position.column
      //最初にクリックしたますと同じだったらやり直し
      while (position.row === randomRow && position.column === randomColumn) {
        randomRow = Math.floor(Math.random() * this.rowLength)
        randomColumn = Math.floor(Math.random() * this.columnLength)
      }
      var bombIndex = [randomRow, randomColumn]
      bombIndexes.push(bombIndex)
    }

    //ボム配置
    for (var i = 0; i < this.bombLength; i++) {
      this.cells[bombIndexes[i][0]][bombIndexes[i][1]].hasBomb = true
    }
    //そのますの周りのボム数を調べる
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
    //ボムだったら終わり
    this.isGameOver = true
    this.isFinished = true
    swal('Oh no!', 'You lose', 'warning')
  }
  //近隣のセルのボム状況を反映
  changeCellState(clickedCell) {
    //開く状態に変える
    this.applayOpenState(clickedCell)
    //ボムかどうか判定
    if (this.isBombCell(clickedCell)) {
      this.changeTableStateToBomb()
      return
    }
    //周りのセルの状態を反映
    this.checkNeighborhood(clickedCell)
    //あがり判定
    this.isFinished = this.isFinish()
    if (this.isFinished) {
      this.chageEachCellState({ isFinished: true })
    }
  }
  //ボムかどうか判定
  isBombCell(clickedCell) {
    if (clickedCell.hasBomb) {
      return true
    } else {
      return false
    }
  }
  //周りのボムを調べて反映
  checkNeighborhood(clickedCell) {
    //なかった場合に近隣を自動で開く
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
  //まわりのセルを返却
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
  //周りのセルのボムの数を数えて返却
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
  //開く
  applayOpenState(clickedCell) {
    this.cells[clickedCell.position.row][clickedCell.position.column].update({
      isOpen: true,
    })
  }
  //あがり判定
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
      swal('Good job!', 'You win!', 'success')
      return true
    } else {
      return false
    }
  }
  //フラグだて
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

  //最初の状態に戻す
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
  //全てのセルの状態を変える
  chageEachCellState(stateObj) {
    for (var i = 0; i < this.rowLength; i++) {
      for (var j = 0; j < this.columnLength; j++) {
        this.cells[i][j].update(stateObj)
      }
    }
  }
}

var table = new Table()
//状態を管理

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
    //右クリックでフラグだて
    buildFlag: function (data) {
      if (this.table.isFinished) {
        return
      }
      event.preventDefault()
      this.table.buildFlag(data)
    },
    //やり直し
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
        <tr v-for="row in tableCell">
          <td
            class="cell"
            v-for="item in row"
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
$color_bg_light: #fff;
$color_bg_flag: #0092db;

$color_text_number_2: #2973b7;
$color_text_number_3: #e96900;
$color_text_number_4: #ae81ff;

// colors
$dark: #2c3e50;
$medium: #34495e;
$light: #7f8c8d;
$green: #42b983;
$border: #dddddd;
$codebg: #f8f8f8;
$red: #ff6666;
@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  90% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@mixin bombAnimation {
  animation-name: pop;
  animation-duration: 0.5s;
}

#field {
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;
  flex: 1 0 30%;
  text-align: center;
  justify-content: center;
  .cell {
    width: 40px;
    height: 40px;
    text-align: center;
    transition: all 0.3s ease;
    border: solid 1px $border;
    background-color: $color_bg_light;
    color: $green;
    cursor: pointer;
    p {
      margin: 0;
    }
    &.isOpen {
      @include bombAnimation;
      background-color: $border;
    }
    &.count {
      &.count2 {
        color: $color_text_number_2;
      }
      &.count3 {
        color: $color_text_number_3;
      }
      &.count4 {
        color: $color_text_number_4;
      }
    }
    &.hasFlag {
      background-color: $border;
    }
    &:hover {
      background-color: $codebg;
    }
    &.bombIng {
      @include bombAnimation;
      background-color: $color_text_number_3;
    }
    &.bomb {
      background-color: $dark;
    }
    &.isFinished {
      transition: all 1s ease;
      transform: rotate(360deg);
    }
  }
  .btn-restart {
    display: flex;
    justify-content: center;
    color: #fff;
    background-color: $green;
    padding: 4px 8px 5px;
    border-radius: 4px;
    border: none;
    margin: 5px;
    cursor: pointer;
    &:hover {
      @include bombAnimation;
    }
    &.finished {
      display: block;
    }
  }
  .message {
    display: block;
    text-align: center;
    top: 0;
    font-size: 40px;
    line-height: 40px;
    color: #2c3e50;
    font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 500;
    &.isFinished {
      display: block;
    }
  }
}
</style>
