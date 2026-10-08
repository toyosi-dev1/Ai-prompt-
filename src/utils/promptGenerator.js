import { aspectProfiles, compositionProfiles, focusDetails, lightingProfiles, styleProfiles } from './profiles'

const hashText = (text) => {
  let hash = 2166136261
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

const createRandom = (seed) => {
  let state = seed | 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let value = Math.imul(state ^ (state >>> 15), 1 | state)
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

const withIndefiniteArticle = (phrase) => `${/^[aeiou]/i.test(phrase) ? 'an' : 'a'} ${phrase}`
const lowerFirst = (text) => (/^[A-Z]{2}/.test(text) ? text : text.charAt(0).toLowerCase() + text.slice(1))
const upperFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1)
const articleLeaders = /^(a|an|the|our|my|your|their|his|her|its|this|that|these|those|some|several|two|three|four|\d+)\b/i

const normalizeIdea = (idea) => idea.trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '')

const asSubject = (idea) => {
  const text = normalizeIdea(idea)
  if (!text) return ''
  if (articleLeaders.test(text)) return lowerFirst(text)
  const [firstWord] = text.split(' ')
  if (/[^s]s$/i.test(firstWord)) return lowerFirst(text)
  return withIndefiniteArticle(lowerFirst(text))
}

const detailFor = (idea, styleDetail) => {
  const match = focusDetails.find(([pattern]) => pattern.test(idea))
  return match ? `${match[1]}, along with ${styleDetail}` : styleDetail
}

const settingSentence = ({ style, choose }) =>
  choose([
    `Set the scene in ${choose(style.setting)}, with ${choose(style.atmosphere)}.`,
    `Place the subject in ${choose(style.setting)} and let ${choose(style.atmosphere)} guide the styling.`,
  ])

const lightingSentence = ({ lighting, choose }) => {
  const phrase = choose(lighting.phrases)
  return choose([`Use ${phrase}.`, `Light the scene with ${phrase}.`, `Illuminate the subject with ${phrase}.`])
}

const buildImage = (context) => {
  const { subject, style, composition, aspect, detail, choose } = context
  return [
    `${choose(['Create', 'Produce', 'Craft'])} ${withIndefiniteArticle(choose(style.lead))} ${choose(['photograph', 'campaign image', 'hero visual'])} for ${subject}.`,
    settingSentence(context),
    lightingSentence(context),
    choose(composition.sentences),
    choose([
      `Emphasize ${detail}, keeping every surface ${choose(['crisp', 'clean', 'considered'])}.`,
      `Pay close attention to ${detail}.`,
      `Prioritize ${detail} throughout.`,
    ]),
    choose(['Maintain the clarity and finish of high-end commercial photography.', 'Render with the sharpness and polish of a professional photo shoot.']),
    choose([`${aspect.label} composition.`, `Frame for ${aspect.label.toLowerCase()} delivery.`, `Final framing: ${aspect.label.toLowerCase()}.`]),
  ]
}

const buildVideo = (context) => {
  const { subject, style, composition, aspect, detail, choose } = context
  return [
    `${choose(['Direct', 'Produce', 'Shoot'])} ${withIndefiniteArticle(choose(style.lead))} ${choose(['brand film', 'commercial spot', 'cinematic sequence'])} for ${subject}.`,
    settingSentence(context),
    lightingSentence(context),
    `Open on ${composition.shot} with ${style.motion}, then ${choose(['settle on a clear focal point', 'resolve on a confident hero frame'])}.`,
    `Keep the pacing ${choose(['unhurried', 'measured', 'precise'])} and prioritize ${detail}.`,
    `Frame for ${aspect.label.toLowerCase()} playback, roughly ${choose([6, 8, 10])} seconds at a smooth ${choose([24, 30])} fps cadence.`,
  ]
}

const buildText = ({ subject, style, lighting, composition, aspect, choose }) => [
  `Write ${choose(['polished campaign copy', 'a headline with supporting body copy', 'a short brand narrative'])} for ${subject}.`,
  `Speak in ${withIndefiniteArticle(style.voice)} voice and keep the tone ${lighting.tone}.`,
  composition.structure,
  `${choose(['Favor', 'Lean on'])} concrete, sensory language over generic claims.`,
  `Shape the length for a ${aspect.placement} placement and close on a clear, memorable line.`,
]

const builders = { Image: buildImage, Video: buildVideo, Text: buildText }

export const generatePrompt = ({ idea, promptType = 'Image', style, aspectRatio, lighting, composition, variant = 0 }) => {
  const styleProfile = styleProfiles[style] ?? styleProfiles.Editorial
  const random = createRandom(hashText([idea, promptType, style, aspectRatio, lighting, composition].join('|')) + variant * 7919)
  const context = {
    subject: asSubject(idea),
    style: styleProfile,
    lighting: lightingProfiles[lighting] ?? lightingProfiles.Studio,
    composition: compositionProfiles[composition] ?? compositionProfiles['Editorial Composition'],
    aspect: aspectProfiles[aspectRatio] ?? aspectProfiles['4:5'],
    detail: detailFor(idea, styleProfile.detail),
    choose: (items) => items[Math.floor(random() * items.length)],
  }
  return (builders[promptType] ?? buildImage)(context).join(' ')
}

const technicalDirection = {
  Image: 'High-resolution render with fine surface detail',
  Video: 'Smooth motion, 24 to 30 fps, clean color grade',
  Text: 'Concise copy deck with a headline and body',
}

const summarize = (text, limit = 72) => {
  const clean = upperFirst(normalizeIdea(text))
  return clean.length > limit ? `${clean.slice(0, limit).trimEnd()}…` : clean
}

export const describePrompt = ({ idea, promptType = 'Image', style, aspectRatio, lighting, composition }) => {
  const styleProfile = styleProfiles[style] ?? styleProfiles.Editorial
  const lightingProfile = lightingProfiles[lighting] ?? lightingProfiles.Studio
  const compositionProfile = compositionProfiles[composition] ?? compositionProfiles['Editorial Composition']
  const aspect = aspectProfiles[aspectRatio] ?? aspectProfiles['4:5']
  const isText = promptType === 'Text'

  return [
    { label: 'Subject', value: summarize(idea) },
    { label: isText ? 'Voice' : 'Environment', value: isText ? upperFirst(styleProfile.voice) : styleProfile.environment },
    { label: isText ? 'Structure' : 'Composition', value: compositionProfile.meta },
    { label: isText ? 'Tone' : 'Lighting', value: isText ? upperFirst(lightingProfile.tone) : lightingProfile.meta },
    { label: 'Style', value: style },
    { label: 'Technical direction', value: technicalDirection[promptType] ?? technicalDirection.Image },
    { label: 'Format', value: aspect.format },
  ]
}

const titleBreakers = new Set(['featuring', 'with', 'in', 'on', 'at', 'for', 'set', 'showing', 'shot', 'resting', 'walking'])

export const buildTitle = (idea) => {
  const words = normalizeIdea(idea).split(' ').filter(Boolean)
  const breakAt = words.findIndex((word, index) => index >= 2 && titleBreakers.has(word.toLowerCase()))
  const limit = breakAt === -1 ? 7 : Math.min(breakAt, 7)
  return upperFirst(words.slice(0, limit).join(' ')) || 'Untitled prompt'
}

export const makeId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`

export const createPromptRecord = ({ id = makeId(), text, settings, savedAt = new Date().toISOString() }) => ({
  id,
  title: buildTitle(settings.idea),
  text,
  ...settings,
  savedAt,
})

export const countWords = (text) => text.trim().split(/\s+/).length
