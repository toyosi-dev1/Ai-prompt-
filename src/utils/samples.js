import { createPromptRecord, generatePrompt } from './promptGenerator'

const sampleSettings = [
  {
    idea: 'A luxury perfume campaign with an amber glass bottle resting on wet black stone',
    promptType: 'Image',
    style: 'Luxury',
    aspectRatio: '4:5',
    lighting: 'Dramatic',
    composition: 'Product Hero',
  },
  {
    idea: 'A premium wireless earbud campaign featuring a stylish young woman in a dark subway station',
    promptType: 'Image',
    style: 'Editorial',
    aspectRatio: '4:5',
    lighting: 'Studio',
    composition: 'Editorial Composition',
  },
  {
    idea: 'A cold-pressed citrus soda can covered in condensation on a sunlit terrace table',
    promptType: 'Image',
    style: 'Product Photography',
    aspectRatio: '1:1',
    lighting: 'Golden Hour',
    composition: 'Close-up',
  },
  {
    idea: 'A tailored wool coat campaign shot in an empty concrete atrium',
    promptType: 'Image',
    style: 'Fashion Commercial',
    aspectRatio: '9:16',
    lighting: 'Natural',
    composition: 'Full Body',
  },
]

const DAY = 86400000

export const buildSamplePrompts = () =>
  sampleSettings.map((settings, index) =>
    createPromptRecord({
      id: `sample-${index + 1}`,
      text: generatePrompt({ ...settings, variant: 0 }),
      settings,
      savedAt: new Date(Date.now() - index * 2 * DAY).toISOString(),
    }),
  )
