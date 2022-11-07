<script lang="ts" setup>
import { Api, Helpers, GameConstant, ApiRepository, JsonGames } from 'shared'
import swal from 'sweetalert'
import { ref, onBeforeMount } from 'vue'

interface ApiResponse {
  response_code: number,
  results: ApiQuestion[]
}

interface ApiQuestion {
    category:          string;
    type:              string;
    difficulty:        string;
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
}

interface QuizQuestion {
  id: number
  question: string
  answers: string[]
  correct: number
  reveled: boolean
}

const _COUNT = 5
const _URL = "https://opentdb.com/api.php?amount=5&category=27&type=multiple&difficulty=medium"

const questions = ref<QuizQuestion[]>()
const progress = ref<number>(0)
const correct = ref<number>(0)

const fetchQuestions = async () => {
    questions.value = []
    const resp = await Api.get<ApiResponse>(_URL)
    if (resp.esit && resp.data)  {
      questions.value = resp.data.results.map(mapQuestion) 
    } else {
      // TODO
    }
  }

const mapQuestion = (q : ApiQuestion, id: number) : QuizQuestion => {
  const x = Math.random() % 4 
  const answers = q.incorrect_answers.splice(x, 0, q.correct_answer)
  return {
    id: id,
    question: q.question,
    answers: answers,
    correct: x,
    reveled: false
  }
}

const showResults = () => {
  if (Helpers.isLogged()) {
    swal({
      title: 'Good job!',
      text: `You have response correctly to ${correct.value} answers! Do you want save your record?`,
      icon: 'warning',
      buttons: [true],
      dangerMode: false,
    }).then(async (willSave) => {
      if (willSave) {
        let totalScore: JsonGames.IGameResult = {
          gameId: GameConstant.QUIZGAME,
          score: correct.value,
        }
        const userId = Helpers.getUserId()
        if (!userId) return
        let response = await ApiRepository.putUserScore(totalScore, userId)
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
      text: `You have response correctly to ${correct.value} answers!`,
      icon: 'warning',
      dangerMode: false,
    })
  }
}

const answered = (id: number, guess: number) => {
  if (!questions.value) return

  questions.value[id].reveled = true

  if (guess === questions.value[id].correct)
    correct.value ++
}

const goToNextQuestion = () => {
  progress.value++
  if (progress.value >= _COUNT) {
    showResults()
  }
}

onBeforeMount(async () => {await fetchQuestions()})
</script>

<template class="animate-in fade-in zoom-in duration-500 antialiased text-gray-700 bg-gray-100">
  <div class="flex w-full h-screen justify-center items-center">
    <div class="w-full max-w-xl p-3 justify-center items-center">
      <div>
        <h1 class="font-bold text-5xl text-center text-black">Quiz</h1>
        <div class="bg-white p-10 rounded-lg shadow-lg w-full mt-1" >

          <!-- Questions -->
          <div v-if="progress < _COUNT && questions && questions[progress]">
            <p class="text-2xl font-bold"> {{questions[progress].question}}</p>
            <label
              v-for="[answer, index] in questions[progress].answers"
              :key="index"
              :for="index"
              ref="items"
              :class="'block cursor-pointer mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg ' +
                questions[progress].reveled 
                ? (questions[progress].correct === Number(index)? 'bg-green' : 'bg-red')
                : 'bg-white'">

              <input
                :id="index"
                type="radio"
                class="hidden"
                :value="index"
                @change="answered(questions[progress].id, Number(index))"
              />

              <span>{{ answer }}</span>
            </label>
            <div class="mt-6 flow-root">
              <button
                @click="goToNextQuestion"
                v-show="progress < _COUNT - 1"
                class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
              >
                Next &gt;
              </button>
              <button
                @click="showResults"
                v-show="progress < _COUNT - 1"
                class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
              >
                Finish
              </button>
            </div>
          </div>

          <!-- END -->
          <div v-else>
            <h2 class="text-bold text-3xl">Results</h2>
            <div class="flex justify-start space-x-4 mt-6">
              <p>
                Correct Answers:
                <span class="text-2xl text-green-700 font-bold">{{ correct }}</span>
              </p>
              <p>
                Wrong Answers:
                <span class="text-2xl text-red-700 font-bold">{{ _COUNT - correct }}</span>
              </p>
            </div>
            <div class="mt-6 flow-root">
              <button
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
