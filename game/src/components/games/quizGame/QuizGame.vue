<script lang="ts" setup>
import { Questions } from './utility'
import type { Question } from './utility'
import { Api, Helpers } from 'shared'
import swal from 'sweetalert'
import { ref, onBeforeMount } from 'vue'
import { GameConstant, ApiRepository } from 'shared'

      let fetchDone = ref( false)
      let idx = ref( 0)
      let selectedAnswer = ref( '')
      let correctAnswers = ref( 0)
      let wrongAnswers = ref( 0)
      let count = ref( 5)
      let difficulty = ref('medium')
      let questions = ref( Questions)
      let gameState = ref(null)
      let items = ref([])

    const  getQuestion = async () => {
      // get questions for quiz
      let response = await Api.get<any>(
        'https://opentdb.com/api.php?amount=' + count.value + '&category=27&type=multiple&difficulty=' + difficulty.value
      )
      if (response.esit) {
        //adjust every question
        for (let i = 0; i < count.value; i++) {
          let q = response.data.results[i]

          questions.value[i].question = q.question // set questions
          switch (Math.floor(Math.random() * 4)) {
            case 0:
              questions.value[i].answers[0] = q.correct_answer
              questions.value[i].answers[1] = q.incorrect_answers.shift()
              questions.value[i].answers[2] = q.incorrect_answers.shift()
              questions.value[i].answers[3] = q.incorrect_answers.shift()
              questions.value[i].correctAnswer = 0
              break
            case 1:
              questions.value[i].answers[0] = q.incorrect_answers.shift()
              questions.value[i].answers[1] = q.correct_answer
              questions.value[i].answers[2] = q.incorrect_answers.shift()
              questions.value[i].answers[3] = q.incorrect_answers.shift()
              questions.value[i].correctAnswer = 1
              break
            case 2:
              questions.value[i].answers[0] = q.incorrect_answers.shift()
              questions.value[i].answers[1] = q.incorrect_answers.shift()
              questions.value[i].answers[2] = q.correct_answer
              questions.value[i].answers[3] = q.incorrect_answers.shift()
              questions.value[i].correctAnswer = 2
              break
            case 3:
              questions.value[i].answers[0] = q.incorrect_answers.shift()
              questions.value[i].answers[1] = q.incorrect_answers.shift()
              questions.value[i].answers[2] = q.incorrect_answers.shift()
              questions.value[i].answers[3] = q.correct_answer
              questions.value[i].correctAnswer = 3
              break
          }
        }
        fetchDone.value = true
        showQuiz()
      }
    }

    const swap = (first: any, second: any) => {
      const tmp = first
      first = second
      second = tmp
    } 

    const answered = (e: any) => {
      selectedAnswer.value = e.target.value
      items.value[questions.value[idx.value].correctAnswer].style.backgroundColor = 'lightgreen'
      if (selectedAnswer.value == questions.value[idx.value].correctAnswer) {
        correctAnswers.value++
      } else {
        wrongAnswers.value++
      }
    }

    const nextQuestion = () => {
      items.value[questions.value[idx.value].correctAnswer].style.backgroundColor = ''
      idx.value++
      selectedAnswer.value = ''
      document.querySelectorAll('input').forEach((el) => (el.checked = false))
    }

    const showResults = () => {
      items.value[questions.value[idx.value].correctAnswer].style.backgroundColor = ''
      // const msg = `Correct Answers: ${correctAnswers.value}  \n\n  Wrong Answers: ${wrongAnswers.value} `
      const points = correctAnswers.value
      if (Helpers.isLogged()) {
        swal({
          title: 'Good job!',
          text: `You have response correctly to ${correctAnswers.value} answers! Do you want save your record?`,
          icon: 'warning',
          buttons: [true],
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
          text: `You have response correctly to ${correctAnswers.value} answers!`,
          icon: 'warning',
          dangerMode: false,
        })
      }
      resetQuiz()
      getQuestion()
    }

    const resetQuiz = () => {
      idx.value = 0
      selectedAnswer.value = ''
      correctAnswers.value = 0
      wrongAnswers.value = 0
      questions.value = Questions
      //fetchAPIData.value = false
      getQuestion()
    }
    const showQuiz = () => {
      gameState.value.style.visibility = 'visible'
    }
  
  onBeforeMount(() => {
    getQuestion()
  }
  )

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
              :for=index
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
