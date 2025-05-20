import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSettingsStore } from './settings'

// Types
type Position = {
  x: number
  y: number
}

type Direction = 'up' | 'down' | 'left' | 'right'
type Cell = 0 | 1 | 2 // 0: empty, 1: snake, 2: food

export const useGameStore = defineStore('game', {
  state: () => ({
    GRID_SIZE: 20,
    snake: [{ x: 10, y: 10 }] as Position[],
    food: { x: 15, y: 10 } as Position,
    direction: 'right' as Direction,
    score: 0,
    isGameOver: false,
    isPaused: false
  }),

  getters: {
    gridState(): Cell[][] {
      const grid = Array(this.GRID_SIZE).fill(0).map(() => Array(this.GRID_SIZE).fill(0))
      
      // Place snake
      this.snake.forEach(pos => {
        if (pos.x >= 0 && pos.x < this.GRID_SIZE && pos.y >= 0 && pos.y < this.GRID_SIZE) {
          grid[pos.y][pos.x] = 1
        }
      })
      
      // Place food
      grid[this.food.y][this.food.x] = 2
      
      return grid
    },

    gameSpeed(): number {
      const settingsStore = useSettingsStore()
      const baseSpeed = 150 // Base speed in milliseconds
      return Math.floor(baseSpeed / settingsStore.getDifficultyMultiplier)
    }
  },

  actions: {
    setDirection(newDirection: Direction) {
      const opposites = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left'
      }
      
      // Prevent moving in opposite direction
      if (newDirection === opposites[this.direction]) {
        return
      }
      
      this.direction = newDirection
    },

    moveSnake() {
      if (this.isPaused || this.isGameOver) return false

      const head = { ...this.snake[0] }
      
      // Calculate new head position
      switch (this.direction) {
        case 'up':
          head.y--
          break
        case 'down':
          head.y++
          break
        case 'left':
          head.x--
          break
        case 'right':
          head.x++
          break
      }
      
      // Check for collisions
      if (this.checkCollision(head)) {
        this.isGameOver = true
        return false
      }
      
      // Add new head
      this.snake.unshift(head)
      
      // Check if food was eaten
      if (head.x === this.food.x && head.y === this.food.y) {
        const settingsStore = useSettingsStore()
        this.score += Math.floor(10 * settingsStore.getDifficultyMultiplier)
        this.generateFood()
        return true
      } else {
        // Remove tail if no food was eaten
        this.snake.pop()
        return false
      }
    },

    checkCollision(position: Position): boolean {
      // Check wall collision
      if (
        position.x < 0 ||
        position.x >= this.GRID_SIZE ||
        position.y < 0 ||
        position.y >= this.GRID_SIZE
      ) {
        return true
      }
      
      // Check self collision with all segments except the tail
      // We start from index 1 to skip the current head position
      return this.snake.slice(1, -1).some(segment => 
        segment.x === position.x && segment.y === position.y
      )
    },

    generateFood() {
      let newFood: Position
      do {
        newFood = {
          x: Math.floor(Math.random() * this.GRID_SIZE),
          y: Math.floor(Math.random() * this.GRID_SIZE)
        }
      } while (this.snake.some(segment => 
        segment.x === newFood.x && segment.y === newFood.y
      ))
      
      this.food = newFood
    },

    togglePause() {
      this.isPaused = !this.isPaused
    },

    resetGame() {
      this.snake = [{ x: 10, y: 10 }]
      this.direction = 'right'
      this.score = 0
      this.isGameOver = false
      this.isPaused = false
      this.generateFood()
    }
  }
}) 