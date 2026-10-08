import { aspectProfiles, compositionProfiles, lightingProfiles, styleProfiles } from '../utils/profiles'

export const promptTypes = ['Image', 'Video', 'Text']
export const visualStyles = Object.keys(styleProfiles)
export const aspectRatios = Object.keys(aspectProfiles)
export const lightingOptions = Object.keys(lightingProfiles)
export const compositionOptions = Object.keys(compositionProfiles)

export const defaultSettings = {
  promptType: 'Image',
  style: 'Editorial',
  aspectRatio: '4:5',
  lighting: 'Studio',
  composition: 'Editorial Composition',
}

export const exampleIdeas = [
  'A premium wireless earbud campaign featuring a stylish young woman in a dark subway station.',
  'A luxury perfume campaign with an amber glass bottle resting on wet black stone.',
  'A cold-pressed citrus soda can covered in condensation on a sunlit terrace table.',
  'A slow Sunday breakfast on a sun-washed terrace for an outdoor furniture brand.',
]
