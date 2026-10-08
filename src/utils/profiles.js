export const styleProfiles = {
  Editorial: {
    lead: ['premium editorial', 'magazine-grade editorial', 'refined editorial'],
    setting: ['a sophisticated, understated environment with considered architectural lines', 'an elevated real-world location with layered depth'],
    atmosphere: ['a restrained, confident mood', 'quiet, magazine-ready sophistication'],
    detail: 'fabric texture, skin tone, and deliberate negative space',
    voice: 'composed and intelligent',
    motion: 'a slow, deliberate dolly push',
    environment: 'Sophisticated real-world location',
    swatches: ['#2a2521', '#6f6256', '#cdbfae', '#a8672c'],
  },
  Cinematic: {
    lead: ['cinematic widescreen', 'film-still quality'],
    setting: ['a richly dressed location with atmospheric haze and practical light sources', 'a moody, lived-in setting with layered foreground and background'],
    atmosphere: ['a tense, story-driven mood', 'a graded, filmic atmosphere with deep color separation'],
    detail: 'anamorphic depth, subtle grain, and cohesive color grading',
    voice: 'evocative and narrative-driven',
    motion: 'a smooth tracking move with subtle parallax',
    environment: 'Atmospheric, story-driven set',
    swatches: ['#0f1a20', '#1f4552', '#c78a3d', '#6b2f24'],
  },
  Luxury: {
    lead: ['refined luxury', 'high-end luxury'],
    setting: ['a sophisticated environment of dark stone, polished metal, and soft reflections', 'an opulent but restrained interior with rich material finishes'],
    atmosphere: ['an exclusive, quietly opulent mood', 'a rich, unhurried premium atmosphere'],
    detail: 'rich material detail, precise reflections, and a flawless surface finish',
    voice: 'assured and understated',
    motion: 'a slow, floating glide across the subject',
    environment: 'Opulent, restrained interior',
    swatches: ['#14110d', '#3a2f22', '#b08d57', '#e7dcc7'],
  },
  Minimal: {
    lead: ['minimalist', 'clean, minimalist'],
    setting: ['a seamless, uncluttered space with a single tonal backdrop', 'an open, quiet environment with generous negative space'],
    atmosphere: ['a calm, ordered mood', 'a pared-back, deliberate atmosphere'],
    detail: 'precise alignment, tonal restraint, and generous negative space',
    voice: 'spare and exact',
    motion: 'a locked-off frame with slow subject movement',
    environment: 'Seamless, uncluttered backdrop',
    swatches: ['#e8e4dc', '#c9c3b8', '#8d877d', '#24211d'],
  },
  Photorealistic: {
    lead: ['photorealistic', 'ultra-realistic'],
    setting: ['a believable real-world location with natural imperfections', 'a true-to-life environment with accurate scale and texture'],
    atmosphere: ['an authentic, lifelike mood', 'a grounded atmosphere that reads as captured, not rendered'],
    detail: 'accurate skin and material texture, true-to-life reflections, and natural depth of field',
    voice: 'plain-spoken and credible',
    motion: 'a handheld-feeling push-in with natural stabilization',
    environment: 'True-to-life location',
    swatches: ['#3d4a3a', '#8f7b5e', '#c9b79c', '#5b6770'],
  },
  'Product Photography': {
    lead: ['studio-grade product', 'commercial product'],
    setting: ['a clean studio set with a graduated backdrop and a polished surface', 'a controlled tabletop environment with subtle surface reflections'],
    atmosphere: ['a precise, high-end commercial finish', 'a crisp, catalog-ready finish'],
    detail: 'edge definition, accurate materials, and clean specular highlights',
    voice: 'clear and benefit-led',
    motion: 'a slow product turntable rotation',
    environment: 'Controlled studio set',
    swatches: ['#1b1c1e', '#4a4d52', '#a9adb3', '#e9e6e0'],
  },
  'Fashion Commercial': {
    lead: ['high-impact fashion commercial', 'polished fashion campaign'],
    setting: ['a bold, styled set with confident color blocking', 'an urban location styled for a seasonal campaign'],
    atmosphere: ['a confident, energetic mood', 'a stylish, contemporary attitude'],
    detail: 'garment drape, styling details, and a strong silhouette',
    voice: 'confident and trend-aware',
    motion: 'a dynamic whip pan into a poised hero frame',
    environment: 'Styled campaign set',
    swatches: ['#1c1917', '#9c3b2e', '#e0b24a', '#efe6d8'],
  },
  Futuristic: {
    lead: ['futuristic', 'forward-looking'],
    setting: ['a sleek, technology-forward environment with illuminated surfaces and clean geometry', 'a high-tech space with reflective materials and precise light accents'],
    atmosphere: ['a cool, advanced mood', 'an innovative, precisely engineered atmosphere'],
    detail: 'luminous edge accents, glossy materials, and crisp geometric detail',
    voice: 'visionary and precise',
    motion: 'a precise orbit with subtle light flares',
    environment: 'Technology-forward space',
    swatches: ['#0b1014', '#25414d', '#5fa8a0', '#d8e6e3'],
  },
  Experimental: {
    lead: ['experimental art-directed', 'boundary-pushing editorial'],
    setting: ['an unexpected, art-directed environment with surreal shifts in scale', 'a graphic, abstract set built from unusual textures and shapes'],
    atmosphere: ['a daring, unconventional mood', 'an inventive atmosphere that rewards a second look'],
    detail: 'unexpected materials, bold graphic shapes, and deliberate visual tension',
    voice: 'playful and unconventional',
    motion: 'an unconventional camera move with abrupt rhythm changes',
    environment: 'Art-directed abstract set',
    swatches: ['#251f1a', '#c0562f', '#d9c15a', '#3d6b5e'],
  },
}

export const lightingProfiles = {
  Natural: {
    phrases: ['natural window light with soft directional falloff and true-to-life color', 'unforced daylight with gentle shadows and honest skin tones'],
    tone: 'warm and candid',
    meta: 'Natural / soft directional',
  },
  Studio: {
    phrases: ['controlled studio lighting with clean highlights and gentle shadow roll-off', 'a precise multi-light studio setup with a soft key and subtle rim definition'],
    tone: 'polished and controlled',
    meta: 'Studio / controlled contrast',
  },
  Dramatic: {
    phrases: ['dramatic directional lighting with controlled shadows and refined highlights', 'sculpted, high-drama lighting with deep shadows and a crisp key'],
    tone: 'intense and cinematic',
    meta: 'Dramatic / sculpted shadows',
  },
  Soft: {
    phrases: ['soft, diffused light that wraps the subject in gentle gradients', 'a large soft source producing smooth transitions and delicate highlights'],
    tone: 'gentle and intimate',
    meta: 'Soft / diffused wrap',
  },
  'Golden Hour': {
    phrases: ['warm golden-hour light with long shadows and a glowing rim', 'low, honey-toned sunlight with soft flare and warm highlights'],
    tone: 'warm and nostalgic',
    meta: 'Golden hour / warm low sun',
  },
  'Low Key': {
    phrases: ['low-key lighting with deep blacks and a single sculpting highlight', 'moody low-key light that lets the subject emerge from darkness'],
    tone: 'restrained and moody',
    meta: 'Low key / deep shadow',
  },
  'High Contrast': {
    phrases: ['high-contrast lighting with bold shadows and punchy specular highlights', 'hard, graphic light that creates strong tonal separation'],
    tone: 'bold and punchy',
    meta: 'High contrast / hard light',
  },
}

export const compositionProfiles = {
  'Close-up': {
    sentences: ['Use a tight close-up that isolates the key detail and keeps the background soft.', 'Frame the subject in an intimate close-up with shallow depth of field.'],
    shot: 'a tight close-up',
    structure: 'Open with one precise, tightly focused hook line.',
    meta: 'Close-up / shallow depth',
  },
  'Medium Shot': {
    sentences: ['Frame the subject in a balanced medium shot, waist up, with enough of the environment to add context.', 'Use a medium shot that keeps the subject expressive while the setting stays legible.'],
    shot: 'a balanced medium shot',
    structure: 'Pair a short headline with two sentences of supporting detail.',
    meta: 'Medium shot / waist-up',
  },
  'Full Body': {
    sentences: ['Show the full figure head to toe with a stable stance and a clear silhouette against the environment.', 'Use a full-body frame that gives the figure presence while keeping the surroundings in view.'],
    shot: 'a full-length frame',
    structure: 'Walk through a complete arc: hook, detail, and closing line.',
    meta: 'Full body / complete silhouette',
  },
  'Product Hero': {
    sentences: ['Compose the product as the dominant focal point using a carefully balanced hero composition.', 'Center the product as the hero, with clean negative space and a clear visual hierarchy around it.'],
    shot: 'a hero product frame',
    structure: 'Lead with the product name and one decisive benefit.',
    meta: 'Product hero / dominant focal point',
  },
  'Wide Shot': {
    sentences: ['Use a wide establishing frame that lets the environment carry the scale while the subject stays clearly readable.', 'Pull back to a wide shot with strong leading lines and the subject placed on a third.'],
    shot: 'a wide establishing shot',
    structure: 'Set the scene first, then bring in the product or message.',
    meta: 'Wide shot / environmental scale',
  },
  'Editorial Composition': {
    sentences: ['Arrange the frame with an editorial composition: asymmetrical balance, deliberate negative space, and a confident focal point.', 'Use an editorial composition with off-center placement, layered depth, and room for the eye to travel.'],
    shot: 'an asymmetrical editorial frame',
    structure: 'Use an editorial structure: headline, standfirst, and one pull-quote line.',
    meta: 'Editorial composition',
  },
}

export const aspectProfiles = {
  '1:1': { label: 'Square 1:1', format: '1:1 square', placement: 'square feed', frame: [48, 48], glyph: [14, 14] },
  '4:5': { label: 'Portrait 4:5', format: '4:5 portrait', placement: 'portrait feed', frame: [44, 55], glyph: [12, 15] },
  '16:9': { label: 'Landscape 16:9', format: '16:9 landscape', placement: 'widescreen', frame: [64, 36], glyph: [18, 10] },
  '9:16': { label: 'Vertical 9:16', format: '9:16 vertical', placement: 'full-screen vertical', frame: [32, 56], glyph: [10, 18] },
}

export const focusDetails = [
  [/perfume|fragrance|cologne|bottle/i, 'realistic glass, liquid, reflections, and subtle texture'],
  [/earbud|headphone|phone|laptop|speaker|gadget|device|tech/i, 'precise hardware detail, clean edges, and subtle surface reflections'],
  [/coffee|soda|drink|beverage|juice|tea|beer|wine|cocktail/i, 'condensation, fresh texture, and appetizing highlights'],
  [/food|bread|loaf|burger|pizza|dessert|snack|chocolate|breakfast/i, 'appetizing texture, rising steam, and fresh ingredients'],
  [/watch|jewel|ring|shoe|sneaker|bag|leather/i, 'material grain, fine stitching, and a crafted finish'],
]
