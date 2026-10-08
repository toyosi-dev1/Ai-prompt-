const includesQuery = (query, fields) => fields.join(' ').toLowerCase().includes(query)

export const searchAll = (rawQuery, prompts, templates, limit = 4) => {
  const query = rawQuery.trim().toLowerCase()

  const promptResults = prompts
    .filter((prompt) => includesQuery(query, [prompt.title, prompt.text, prompt.style ?? '']))
    .slice(0, limit)
    .map((prompt) => ({ key: `prompt-${prompt.id}`, kind: 'prompt', title: prompt.title, detail: `${prompt.style ?? 'Saved'}, ${prompt.aspectRatio ?? ''}`.replace(/, $/, '') }))

  const templateResults = templates
    .filter((template) => includesQuery(query, [template.title, template.description, template.category, template.form.style]))
    .slice(0, limit)
    .map((template) => ({ key: `template-${template.id}`, kind: 'template', title: template.title, detail: template.category }))

  return [...promptResults, ...templateResults]
}
