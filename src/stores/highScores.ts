import { defineStore } from 'pinia'
import type { GameSettings } from './settings'

interface HighScore {
  name: string
  score: number
  difficulty: GameSettings['difficulty']
  date: string
}

interface HighScoresState {
  scores: HighScore[]
}

export const useHighScoresStore = defineStore('highScores', {
  state: (): HighScoresState => ({
    scores: []
  }),

  getters: {
    // Get top 10 scores for each difficulty
    getTopScores: (state) => (difficulty: GameSettings['difficulty']) => {
      return state.scores
        .filter(score => score.difficulty === difficulty)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
    },

    // Get all scores sorted by date
    getAllScores: (state) => {
      return [...state.scores].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }
  },

  actions: {
    addScore(score: number, name: string, difficulty: GameSettings['difficulty']) {
      const newScore: HighScore = {
        name,
        score,
        difficulty,
        date: new Date().toISOString()
      }
      this.scores.push(newScore)
      this.saveScores()
    },

    loadScores() {
      const savedScores = localStorage.getItem('snake-game-high-scores')
      if (savedScores) {
        this.scores = JSON.parse(savedScores)
      }
    },

    saveScores() {
      localStorage.setItem('snake-game-high-scores', JSON.stringify(this.scores))
    }
  }
}) 