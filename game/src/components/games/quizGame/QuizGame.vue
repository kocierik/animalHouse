<script lang="ts">
import { Questions } from './utility'
import type { Question } from './utility'
import { Api, Helpers } from 'shared'
import swal from 'sweetalert'
import { GameConstant, ApiRepository } from 'shared'

export default {
  data() {
    return {
      fetchDone: false as boolean,
      idx: 0 as number,
      selectedAnswer: '' as string,
      correctAnswers: 0 as number,
      wrongAnswers: 0 as number,
      count: 5 as number,
      difficulty: 'medium' as string,
      questions: Questions as Question[],
    }
  },
  methods: {
    async getQuestion() {
      // get questions for quiz
      let response = await Api.get(
        'https://opentdb.com/api.php?amount=' + this.count + '&category=27&type=multiple&difficulty=' + this.difficulty
      )
      if (response.esit) {
        //adjust every question
        for (let i = 0; i < this.count; i++) {
          let q = response.data.results[i]

          this.questions[i].question = q.question // set questions
          switch (Math.floor(Math.random() * 4)) {
          case 0:
            this.questions[i].answers[0] = q.correct_answer
            this.questions[i].answers[1] = q.incorrect_answers.shift()
            this.questions[i].answers[2] = q.incorrect_answers.shift()
            this.questions[i].answers[3] = q.incorrect_answers.shift()
            this.questions[i].correctAnswer = 0
            break
          case 1:
            this.questions[i].answers[0] = q.incorrect_answers.shift()
            this.questions[i].answers[1] = q.correct_answer
            this.questions[i].answers[2] = q.incorrect_answers.shift()
            this.questions[i].answers[3] = q.incorrect_answers.shift()
            this.questions[i].correctAnswer = 1
            break
          case 2:
            this.questions[i].answers[0] = q.incorrect_answers.shift()
            this.questions[i].answers[1] = q.incorrect_answers.shift()
            this.questions[i].answers[2] = q.correct_answer
            this.questions[i].answers[3] = q.incorrect_answers.shift()
            this.questions[i].correctAnswer = 2
            break
          case 3:
            this.questions[i].answers[0] = q.incorrect_answers.shift()
            this.questions[i].answers[1] = q.incorrect_answers.shift()
            this.questions[i].answers[2] = q.incorrect_answers.shift()
            this.questions[i].answers[3] = q.correct_answer
            this.questions[i].correctAnswer = 3
            break
          }
        }
        this.fetchDone = true
        this.showQuiz()
      }
    },
    swap(first, second) {
      const tmp = first
      first = second
      second = tmp
    },
    answered(e) {
      this.selectedAnswer = e.target.value
      this.$refs.items[this.questions[this.idx].correctAnswer].style.backgroundColor = 'lightgreen'
      if (this.selectedAnswer == this.questions[this.idx].correctAnswer) {
        this.correctAnswers++
      } else {
        this.wrongAnswers++
      }
    },
    nextQuestion() {
      this.$refs.items[this.questions[this.idx].correctAnswer].style.backgroundColor = ''
      this.idx++
      this.selectedAnswer = ''
      document.querySelectorAll('input').forEach((el) => (el.checked = false))
    },
    showResults() {
      this.$refs.items[this.questions[this.idx].correctAnswer].style.backgroundColor = ''
      // const msg = `Correct Answers: ${this.correctAnswers}  \n\n  Wrong Answers: ${this.wrongAnswers} `
      const points = this.correctAnswers
      if (Helpers.isLogged()) {
        swal({
          title: 'Good job!',
          text: `You have response correctly to ${this.correctAnswers} answers! Do you want save your record?`,
          icon: 'warning',
          buttons: true,
          dangerMode: false,
        }).then(async (willSave) => {
          if (willSave) {
            let totalScore = {
              gameId: GameConstant.QUIZGAME,
              score: points,
            }
            let response = await ApiRepository.putUserScore(totalScore, Helpers.getUserId())
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
          text: `You have response correctly to ${this.correctAnswers} answers!`,
          icon: 'warning',
          dangerMode: false,
        })
      }
      this.resetQuiz()
      this.getQuestion()
    },
    resetQuiz() {
      this.idx = 0
      this.selectedAnswer = ''
      this.correctAnswers = 0
      this.wrongAnswers = 0
      this.questions = Questions
      this.fetchAPIData = false
      this.getQuestion()
    },
    showQuiz() {
      this.$refs.gameState.style.visibility = 'visible'
    },
  },
  beforeMount() {
    this.getQuestion()
  },
}
</script>

<template class="animate-in fade-in zoom-in duration-500 antialiased text-gray-700 bg-gray-100">
  <div class="flex w-full h-screen justify-center items-center">
    <div class="w-full max-w-xl p-3 justify-center items-center">
      <div>
        <h1 class="font-bold text-5xl text-center text-indigo-700">Simple Quiz</h1>
        <div class="bg-white p-10 rounded-lg shadow-lg w-full mt-1" ref="gameState" :style="{ visibility: 'hidden' }">
          <div v-if="idx < count">
            <p class="text-2xl font-bold" v-html="questions[idx]['question']"></p>
            <label
              v-for="(answer, index) in questions[idx].answers"
              :key="index"
              :for="index"
              ref="items"
              class="block cursor-pointer mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg"
              :class="{ 'bg-red-200': selectedAnswer == index }"
            >
              <input
                :id="index"
                type="radio"
                class="hidden"
                :value="index"
                @change="answered($event)"
                :disabled="selectedAnswer != ''"
              />
              <span v-html="answer"></span>
            </label>
            <div class="mt-6 flow-root">
              <button
                @click="nextQuestion"
                v-show="selectedAnswer != '' && idx < count - 1"
                class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
              >
                Next &gt;
              </button>
              <button
                @click="showResults"
                v-show="selectedAnswer != '' && idx == count - 1"
                class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
              >
                Finish
              </button>
            </div>
          </div>
          <div v-else>
            <h2 class="text-bold text-3xl">Results</h2>
            <div class="flex justify-start space-x-4 mt-6">
              <p>
                Correct Answers:
                <span class="text-2xl text-green-700 font-bold">{{ correctAnswers }}</span>
              </p>
              <p>
                Wrong Answers:
                <span class="text-2xl text-red-700 font-bold">{{ wrongAnswers }}</span>
              </p>
            </div>
            <div class="mt-6 flow-root">
              <button
                @click="resetQuiz"
                class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
              >
                Play again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
